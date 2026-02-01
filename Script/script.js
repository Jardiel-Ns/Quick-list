const input = document.querySelector(".add-items-input")
const form = document.querySelector(".add-items-form")
const list = document.querySelector(".item-list")
let items = loadItems();

function saveItems() {
  localStorage.setItem("quickListItems", JSON.stringify(items));
}

function loadItems() {
  const data = localStorage.getItem("quickListItems");
  return data ? JSON.parse(data) : [];
}

function renderItems() {
  list.innerHTML = "";

  items.forEach(item => {
    const li = document.createElement("li");
    li.classList.add("item");
    li.dataset.id = item.id;

    li.innerHTML = `
      <input type="checkbox" class="item-checkbox" ${item.checked ? "checked" : ""}>
      <span class="item-label">${item.text}</span>
      <img
        src="Assets/Icons/trash.svg"
        alt="Remover item"
        class="item-remove"
      >
    `;

    list.appendChild(li);
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const value = input.value.trim();

  if (value === "") {
    console.log("Campo vazio, chefe.");
    return;
  }

  items.push({
    id: Date.now(),
    text: value,
    checked: false
  });

  saveItems();
  renderItems();

  input.value = "";
});

list.addEventListener("click", (event) => {
  if (event.target.classList.contains("item-remove")) {
    const itemEl = event.target.closest(".item");
    const id = Number(itemEl.dataset.id);

    itemEl.classList.add("removing");

    itemEl.addEventListener("transitionend", () => {
      items = items.filter(item => item.id !== id);
      saveItems();
      renderItems();
    }, { once: true });
  }
});

renderItems();