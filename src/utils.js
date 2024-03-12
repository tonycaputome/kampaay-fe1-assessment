// setup a proxy
const KampayApp = {
  asc: true,
  btnSelector: "sortBtn",
  trigger_event_key: "order_change",
  query_search: "query_search"
};

// create an handler
const handler = {
  set(target, prop, value) {
    console.log(`changed ${prop} from ${target[prop]} to ${value}`);
    target[prop] = value;
    document.dispatchEvent(
      new CustomEvent(KampayApp.trigger_event_key, { detail: { prop, value } })
    );
    return true;
  }
};

// attach
const proxy = new Proxy(KampayApp, handler);

export function sortBy(arr, asc = KampayApp.asc, query = "") {
  return arr
    .sort((a, b) =>
      asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    )
    .sort((a, b) => (asc ? a.price - b.price : b.price - a.price))
    .filter();
}

export function bindEvents() {
  const app = document.querySelector("#app");

  app.addEventListener("click", ({ target }) => {
    const checktrigger =
      target && target.getAttribute("id") === KampayApp.btnSelector;
    if (checktrigger) {
      proxy.asc = !proxy.asc;
    }
  });

  app.addEventListener("input", ({ target }) => {
    if (target && target.getAttribute("name") === "query") {
      document.dispatchEvent(
        new CustomEvent(KampayApp.query_search, {
          detail: { query: target.value }
        })
      );
    }
  });
}

export function init(arr, cb) {
  bindEvents();

  document.addEventListener(KampayApp.trigger_event_key, ({ detail }) => {
    const { value } = detail;
    sortBy(arr, value);
    cb();
  });

  document.addEventListener(KampayApp.query_search, ({ detail }) => {
    const { query } = detail;
    const filtered = arr.filter(
      (drink) => !drink.name.toLowerCase().includes(query.toLowerCase())
    );
    console.log(filtered);
    // sortBy(filtered)
    // cb()
  });
}

export function getCurrentOrder() {
  return proxy.asc ? "asc" : "desc";
}
