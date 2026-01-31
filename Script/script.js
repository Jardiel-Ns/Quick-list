const input = document.querySelector(".add-items-input")
const form = document.querySelector(".add-items-form")
const list = document.querySelector(".item-list")

form.addEventListener("submit", function (event) {
  event.preventDefault(); 

  const value = input.value.trim();

  if (value === "") {
    console.log("Campo vazio, chefe.");
    return;
  }

  const itemHTML = `
    <li class="item">
      <input type="checkbox" class="item-checkbox">
      <span class="item-label">${value}</span>
      <img
        src="Assets/Icons/trash.svg"
        alt="Remover item"
        class="item-remove"
      >
    </li>
  `;

  list.innerHTML += itemHTML;
});

list.addEventListener("click", (event) => {
  if (event.target.classList.contains("item-remove")) {
    const item = event.target.closest(".item");

    item.classList.add("removing");

    item.addEventListener("transitionend", () => {
      item.remove();
    }, { once: true });
  }
});