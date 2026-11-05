
export function checkAnswer(question, selectedAnswer) {
    return question.correct === selectedAnswer;
}

export function calculateScore(correctAnswers) {
    return correctAnswers;
}

export function getResultMessage(score, total) {
    const percentage = (score / total) * 100;

    if (percentage === 100) {
        return "Отличный результат! Все ответы правильные!";
    } else if (percentage >= 60) {
        return "Хороший результат! Продолжай развиваться!";
    } else {
        return "Попробуй ещё раз и улучши свои знания!";
    }
}
