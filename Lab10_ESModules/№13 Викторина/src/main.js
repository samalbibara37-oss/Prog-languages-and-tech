
import { questions } from "./modules/questions.js";

import {
    checkAnswer,
    calculateScore,
    getResultMessage
} from "./modules/quiz.js";

import {
    showQuestion,
    showFeedback,
    updateScore,
    showResult,
    restartUI
} from "./modules/ui.js";

let currentQuestion = 0;
let correctAnswers = 0;
let answered = false;

function loadQuestion() {
    answered = false;

    const question = questions[currentQuestion];

    showQuestion(
        question,
        currentQuestion,
        questions.length,
        handleAnswer
    );
}

function handleAnswer(selectedIndex, selectedButton) {
    if (answered) return;

    answered = true;

    const question = questions[currentQuestion];
    const isCorrect = checkAnswer(question, selectedIndex);

    if (isCorrect) {
        correctAnswers++;
    }

    updateScore(calculateScore(correctAnswers));

    showFeedback(
        isCorrect,
        selectedButton,
        question.correct
    );
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        const message = getResultMessage(
            correctAnswers,
            questions.length
        );

        showResult(
            correctAnswers,
            questions.length,
            message
        );
    }
}

function restartQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    answered = false;

    updateScore(0);
    restartUI();
    loadQuestion();
}

document.getElementById("nextBtn").addEventListener("click", nextQuestion);

document.getElementById("restartBtn").addEventListener("click", restartQuiz);

loadQuestion();
