
const orders = [
    { id: 1001, customer: "Алина", product: "Ноутбук", price: 250000, status: "new" },
    { id: 1002, customer: "Данияр", product: "Наушники", price: 18000, status: "new" },
    { id: 1003, customer: "Аружан", product: "Клавиатура", price: 12000, status: "work" },
    { id: 1004, customer: "Мирас", product: "Монитор", price: 95000, status: "work" },
    { id: 1005, customer: "Диана", product: "Мышь", price: 7500, status: "ready" }
];

const statusNames = {
    new: "Новый",
    work: "В работе",
    ready: "Готовый"
};

let currentStatus = "new";

const ordersContainer = document.getElementById("orders");
const emptyMessage = document.getElementById("emptyMessage");
const tabs = document.querySelectorAll(".tab");

function updateCounters() {
    const countNew = orders.filter(
        order => order.status === "new"
    ).length;

    const countWork = orders.filter(
        order => order.status === "work"
    ).length;

    const countReady = orders.filter(
        order => order.status === "ready"
    ).length;

    document.getElementById("totalCount").textContent = orders.length;
    document.getElementById("newCount").textContent = countNew;
    document.getElementById("workCount").textContent = countWork;
    document.getElementById("readyCount").textContent = countReady;

    document.getElementById("badge-new").textContent = countNew;
    document.getElementById("badge-work").textContent = countWork;
    document.getElementById("badge-ready").textContent = countReady;

    // Дополнительная функция: процент готовности
    const completion = orders.length > 0
        ? Math.round((countReady / orders.length) * 100)
        : 0;

    const completionElement = document.getElementById("completionRate");

    if (completionElement) {
        completionElement.textContent = completion + "%";
    }
}

function renderOrders() {
    const filteredOrders = orders.filter(
        order => order.status === currentStatus
    );

    ordersContainer.innerHTML = "";

    emptyMessage.hidden = filteredOrders.length > 0;
    ordersContainer.hidden = filteredOrders.length === 0;

    filteredOrders.forEach(order => {
        const card = document.createElement("article");
        card.className = "order-card";

        card.innerHTML = `
            <div class="order-info">
                <h3>Заказ №${order.id}</h3>
                <p><strong>Клиент:</strong> ${order.customer}</p>
                <p><strong>Товар:</strong> ${order.product}</p>
                <p><strong>Сумма:</strong> ${order.price.toLocaleString("ru-RU")} ₸</p>
                <span class="status status-${order.status}">
                    ${statusNames[order.status]}
                </span>
            </div>

            <div class="order-actions">
                <label for="status-${order.id}">Изменить статус</label>
                <select id="status-${order.id}" data-id="${order.id}">
                    <option value="new">Новые</option>
                    <option value="work">В работе</option>
                    <option value="ready">Готовые</option>
                </select>
            </div>
        `;

        ordersContainer.appendChild(card);

        card.querySelector("select").value = order.status;
    });

    updateCounters();
}

// Переключение вкладок
tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        currentStatus = tab.dataset.status;

        tabs.forEach(item => {
            item.classList.toggle("active", item === tab);
        });

        renderOrders();
    });
});

// Изменение статуса заказа
ordersContainer.addEventListener("change", event => {
    if (!event.target.matches("select[data-id]")) {
        return;
    }

    const orderId = Number(event.target.dataset.id);
    const order = orders.find(item => item.id === orderId);

    if (order) {
        order.status = event.target.value;
        renderOrders();
    }
});

// Запуск приложения
renderOrders();
