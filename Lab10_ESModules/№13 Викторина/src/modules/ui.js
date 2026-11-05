
export function showQuestion(question, index, total, onAnswer) {
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const numberElement = document.getElementById("questionNumber");
    const feedbackElement = document.getElementById("feedback");
    const nextButton = document.getElementById("nextBtn");

    questionElement.textContent = question.question;
    numberElement.textContent = `Вопрос ${index + 1} из ${total}`;

    answersElement.innerHTML = "";
    feedbackElement.textContent = "";
    nextButton.disabled = true;

    question.answers.forEach((answer, answerIndex) => {
        const button = document.createElement("button");

        button.textContent = answer;
        button.className = "answer-btn";

        button.addEventListener("click", () => {
            onAnswer(answerIndex, button);
        });

        answersElement.appendChild(button);
    });

    updateProgress(index, total);
}

export function updateProgress(index, total) {
    const progress = document.getElementById("progress");
    progress.style.width = `${((index + 1) / total) * 100}%`;
}

export function showFeedback(isCorrect, selectedButton, correctIndex) {
    const feedback = document.getElementById("feedback");
    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === correctIndex) {
            button.classList.add("correct");
        }
    });

    if (isCorrect) {
        feedback.textContent = "Правильно! Молодец!";
        feedback.style.color = "#28a745";
    } else {
        selectedButton.classList.add("wrong");
        feedback.textContent = "Неправильно! Правильный ответ выделен зелёным.";
        feedback.style.color = "#dc3545";
    }

    document.getElementById("nextBtn").disabled = false;
}

export function updateScore(score) {
    document.getElementById("score").textContent = `Баллы: ${score}`;
}

export function showResult(score, total, message) {
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");

    document.getElementById("finalScore").textContent =
        `Ваш результат: ${score} из ${total}. ${message}`;

    document.getElementById("progress").style.width = "100%";
}

export function restartUI() {
    document.getElementById("quiz").classList.remove("hidden");
    document.getElementById("result").classList.add("hidden");
}
