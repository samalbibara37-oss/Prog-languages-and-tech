
export function calculateAverage(students) {
    if (students.length === 0) return 0;

    const total = students.reduce(
        (sum, student) => sum + student.score,
        0
    );

    return (total / students.length).toFixed(2);
}

export function findHighest(students) {
    if (students.length === 0) return 0;

    return Math.max(...students.map(student => student.score));
}

export function findLowest(students) {
    if (students.length === 0) return 0;

    return Math.min(...students.map(student => student.score));
}

export function countPassed(students) {
    return students.filter(student => student.score >= 50).length;
}

export function countStudents(students) {
    return students.length;
}
