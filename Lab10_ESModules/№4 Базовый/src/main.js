import {
    rectangleArea,
    rectanglePerimeter,
    circleArea,
    circlePerimeter
} from "./modules/geometry.js";

// Получаем элементы прямоугольника
const lengthInput = document.querySelector("#length");
const widthInput = document.querySelector("#width");
const rectangleResult = document.querySelector("#rectangleResult");

// Получаем элементы круга
const radiusInput = document.querySelector("#radius");
const circleResult = document.querySelector("#circleResult");

// Проверка чисел
function validNumber(value) {
    return value !== "" && Number.isFinite(Number(value)) && Number(value) > 0;
}

// Вычисление прямоугольника
document.querySelector("#rectangleBtn").addEventListener("click", () => {

    const length = lengthInput.value;
    const width = widthInput.value;

    if (!validNumber(length) || !validNumber(width)) {
        rectangleResult.textContent = "Введите корректные положительные числа!";
        return;
    }

    const area = rectangleArea(Number(length), Number(width));
    const perimeter = rectanglePerimeter(Number(length), Number(width));

    rectangleResult.textContent =
        `Площадь: ${area}; Периметр: ${perimeter}`;
});

// Вычисление круга
document.querySelector("#circleBtn").addEventListener("click", () => {

    const radius = radiusInput.value;

    if (!validNumber(radius)) {
        circleResult.textContent = "Введите корректный положительный радиус!";
        return;
    }

    const area = circleArea(Number(radius));
    const perimeter = circlePerimeter(Number(radius));

    circleResult.textContent =
        `Площадь: ${area.toFixed(2)}; Длина окружности: ${perimeter.toFixed(2)}`;
});