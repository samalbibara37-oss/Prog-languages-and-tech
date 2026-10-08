const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");
const clearBtn = document.querySelector("#clearBtn");
const message = document.querySelector("#message");

// Добавление новой задачи
addBtn.addEventListener("click", addTask);

// Добавление задачи клавишей Enter
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Функция добавления задачи
function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        message.textContent = "Введите текст задачи!";
        message.style.color = "red";
        return;
    }

    const li = document.createElement("li");
    li.classList.add("task");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.textContent = text;
    span.classList.add("task-text");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Удалить";
    deleteBtn.classList.add("delete-btn");

    // Отметка задачи как выполненной
    checkbox.addEventListener("change", function() {
        li.classList.toggle("completed");

        if (checkbox.checked) {
            message.textContent = "Задача выполнена!";
            message.style.color = "green";
        } else {
            message.textContent = "Задача снова активна.";
            message.style.color = "orange";
        }
    });

    // Удаление отдельной задачи
    deleteBtn.addEventListener("click", function() {
        li.remove();
        message.textContent = "Задача удалена.";
        message.style.color = "red";
    });

    li.append(checkbox);
    li.append(span);
    li.append(deleteBtn);

    taskList.append(li);

    taskInput.value = "";

    message.textContent = "Задача добавлена!";
    message.style.color = "green";
}

// Очистка всех выполненных задач
clearBtn.addEventListener("click", function() {
    const completedTasks = document.querySelectorAll(".completed");

    completedTasks.forEach(function(task) {
        task.remove();
    });

    message.textContent = "Выполненные задачи очищены.";
    message.style.color = "green";
});