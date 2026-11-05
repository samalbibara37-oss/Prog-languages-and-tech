
import {
    calculateAverage,
    findHighest,
    findLowest,
    countPassed,
    countStudents
} from "./stats.js";

export function renderStatistics(students) {
    document.getElementById("totalStudents").textContent =
        countStudents(students);

    document.getElementById("averageScore").textContent =
        calculateAverage(students);

    document.getElementById("highestScore").textContent =
        findHighest(students);

    document.getElementById("lowestScore").textContent =
        findLowest(students);

    document.getElementById("passedStudents").textContent =
        countPassed(students);
}

export function renderStudents(students) {
    const table = document.getElementById("studentsTable");
    const count = document.getElementById("studentCount");
    const emptyMessage = document.getElementById("emptyMessage");

    table.innerHTML = "";

    count.textContent = `Найдено студентов: ${students.length}`;

    emptyMessage.classList.toggle("hidden", students.length !== 0);

    students.forEach((student, index) => {
        const row = document.createElement("tr");

        const status = student.score >= 50 ? "Сдал" : "Не сдал";
        const statusClass = student.score >= 50 ? "passed" : "failed";

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.group}</td>
            <td>${student.score}</td>
            <td class="${statusClass}">${status}</td>
        `;

        table.appendChild(row);
    });
}
