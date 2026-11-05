
import { students } from "./modules/data.js";
import { filterStudents } from "./modules/filters.js";
import {
    renderStatistics,
    renderStudents
} from "./modules/ui.js";

const searchInput = document.getElementById("searchInput");
const groupFilter = document.getElementById("groupFilter");
const minScoreInput = document.getElementById("minScore");
const resetButton = document.getElementById("resetBtn");

function updateDashboard() {
    const filteredStudents = filterStudents(
        students,
        searchInput.value.trim(),
        groupFilter.value,
        minScoreInput.value
    );

    renderStatistics(filteredStudents);
    renderStudents(filteredStudents);
}

searchInput.addEventListener("input", updateDashboard);
groupFilter.addEventListener("change", updateDashboard);
minScoreInput.addEventListener("input", updateDashboard);

resetButton.addEventListener("click", () => {
    searchInput.value = "";
    groupFilter.value = "all";
    minScoreInput.value = "";

    updateDashboard();
});

updateDashboard();
