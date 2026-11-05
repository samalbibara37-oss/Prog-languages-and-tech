
export function filterStudents(students, search, group, minScore) {
    return students.filter(student => {
        const matchesName = student.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesGroup =
            group === "all" || student.group === group;

        const matchesScore =
            minScore === "" || student.score >= Number(minScore);

        return matchesName && matchesGroup && matchesScore;
    });
}
