const list = document.querySelector("#shoppingList");
const button = document.querySelector("#addBtn");
const input = document.querySelector("#itemInput");
const message = document.querySelector("#message");

// Добавление нового товара
button.addEventListener("click", () => {
    const itemName = input.value.trim();

    if (itemName === "") {
        message.textContent = "Введите название товара!";
        return;
    }

    const item = document.createElement("li");
    item.textContent = itemName;

    // Клик по товару отмечает его выполненным
    item.addEventListener("click", () => {
        item.classList.toggle("completed");
    });

    list.append(item);

    input.value = "";
    message.textContent = "Товар добавлен!";
});

// Добавление товара по клавише Enter
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        button.click();
    }
});

// Обработка уже существующих элементов списка
const existingItems = document.querySelectorAll("#shoppingList li");

existingItems.forEach((item) => {
    item.addEventListener("click", () => {
        item.classList.toggle("completed");
    });
});