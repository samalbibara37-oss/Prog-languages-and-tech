// Получаем элементы страницы через DOM
const number1 = document.querySelector("#number1");
const number2 = document.querySelector("#number2");
const result = document.querySelector("#result");

const addButton = document.querySelector("#add");
const subtractButton = document.querySelector("#subtract");
const multiplyButton = document.querySelector("#multiply");
const divideButton = document.querySelector("#divide");

// Пользовательская функция для получения чисел
function getNumbers() {
    const a = Number(number1.value);
    const b = Number(number2.value);

    if (number1.value === "" || number2.value === "") {
        result.textContent = "Введите оба числа";
        result.className = "error";
        return null;
    }

    return [a, b];
}

// Функция для вывода результата
function showResult(value) {
    result.textContent = "Результат: " + value;
    result.className = "success";
}

// Сложение
addButton.addEventListener("click", function () {
    const numbers = getNumbers();

    if (numbers !== null) {
        const [a, b] = numbers;
        showResult(a + b);
    }
});

// Вычитание
subtractButton.addEventListener("click", function () {
    const numbers = getNumbers();

    if (numbers !== null) {
        const [a, b] = numbers;
        showResult(a - b);
    }
});

// Умножение
multiplyButton.addEventListener("click", function () {
    const numbers = getNumbers();

    if (numbers !== null) {
        const [a, b] = numbers;
        showResult(a * b);
    }
});

// Деление
divideButton.addEventListener("click", function () {
    const numbers = getNumbers();

    if (numbers !== null) {
        const [a, b] = numbers;

        if (b === 0) {
            result.textContent = "На ноль делить нельзя!";
            result.className = "error";
        } else {
            showResult(a / b);
        }
    }
});

// Цикл для демонстрации работы цикла
const buttons = document.querySelectorAll("button");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].title = "Нажмите для выполнения операции";
}
