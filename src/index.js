import "./styles.css";
import { drinks } from "./drinkList";
import { init, getCurrentOrder } from "./utils";

const render = () => {
  document.getElementById("app").innerHTML = `
    <h1>Our drink list <button id="sortBtn">sort('${getCurrentOrder()}')</button></h1>
    <div>
      <header>
        <div class="col">Image</div>
        <div class="col">Name</div>
        <div class="col">Price</div>
      </header>
      ${drinks
        .map(
          (d) => `
        <div class="row">
          <div class="col"><img src="${d.image}" width="50"></div>
          <div class="col">${d.name}</div>
          <div class="col">${d.price}€</div>
        </div>
      `
        )
        .join("")}
        <input type="text" name="query" />
    </div>
  `;
};

render();
init(drinks, render);
