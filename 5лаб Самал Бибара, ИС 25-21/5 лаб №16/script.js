const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");
const counter = document.querySelector("#counter");

// Функция обновления счетчика
function updateCounter() {
    const tasks = taskList.querySelectorAll("li");

    let completed = 0;
    let uncompleted = 0;

    for (let i = 0; i < tasks.length; i++) {
        const checkbox = tasks[i].querySelector(".task-checkbox");

        if (checkbox.checked) {
            completed++;
        } else {
            uncompleted++;
        }
    }

    counter.textContent =
        "Выполнено: " + completed +
        " | Невыполнено: " + uncompleted;
}

// Функция добавления задачи
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Введите задачу!");
        return;
    }

    // Создаем новый элемент списка
    const li = document.createElement("li");

    // Создаем флажок
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";

    // Создаем текст задачи
    const span = document.createElement("span");
    span.textContent = taskText;
    span.className = "task-text";

    // Создаем кнопку удаления
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Удалить";
    deleteBtn.className = "delete-btn";

    // Добавляем элементы в задачу
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    // Добавляем задачу в список
    taskList.appendChild(li);

    // Очищаем поле ввода
    taskInput.value = "";

    // Событие отметки выполнения
    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            span.classList.add("completed");
        } else {
            span.classList.remove("completed");
        }

        updateCounter();
    });

    // Событие удаления
    deleteBtn.addEventListener("click", function() {
        li.remove();
        updateCounter();
    });

    // Обновляем счетчик
    updateCounter();
}

// Событие нажатия кнопки "Добавить"
addBtn.addEventListener("click", addTask);

// Событие нажатия Enter в поле ввода
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});