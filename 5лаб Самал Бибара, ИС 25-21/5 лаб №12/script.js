const gradesInput = document.querySelector("#grades");
const calculateBtn = document.querySelector("#calculateBtn");
const result = document.querySelector("#result");

// Функция вычисления среднего балла
function calculateAverage(grades) {
    let sum = 0;

    // Цикл для подсчета суммы оценок
    for (let i = 0; i < grades.length; i++) {
        sum = sum + grades[i];
    }

    return sum / grades.length;
}

// Событие input
gradesInput.addEventListener("input", function() {
    result.textContent = "Оценки введены. Нажмите кнопку для расчета.";
    result.className = "";
});

// Событие click
calculateBtn.addEventListener("click", function() {
    const input = gradesInput.value.trim();

    // Проверяем, заполнено ли поле
    if (input === "") {
        result.textContent = "Пожалуйста, введите оценки.";
        result.className = "error";
        return;
    }

    // Преобразуем введенные оценки в массив чисел
    const grades = input.split(",").map(function(item) {
        return Number(item.trim());
    });

    let valid = true;

    // Проверяем каждую оценку
    for (let i = 0; i < grades.length; i++) {
        if (isNaN(grades[i]) || grades[i] < 1 || grades[i] > 5) {
            valid = false;
            break;
        }
    }

    // Выводим результат
    if (valid === false) {
        result.textContent = "Ошибка! Оценки должны быть числами от 1 до 5.";
        result.className = "error";
    } else {
        const average = calculateAverage(grades);

        result.textContent = "Средний балл: " + average.toFixed(2);
        result.className = "success";
    }
});