// Площадь прямоугольника
export function rectangleArea(length, width) {
    return length * width;
}

// Периметр прямоугольника
export function rectanglePerimeter(length, width) {
    return 2 * (length + width);
}

// Площадь круга
export function circleArea(radius) {
    return Math.PI * radius * radius;
}

// Длина окружности
export function circlePerimeter(radius) {
    return 2 * Math.PI * radius;
}