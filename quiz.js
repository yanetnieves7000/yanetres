console.log("Hello, World!");
// 1. Data Structure for Questions
const quizData = [
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        correct: "JavaScript"
    },
    {
        question: "What does CSS stand for?",
        options: ["Central Style Sheets", "Cascading Style Sheets", "Cascading System Sheets", "Cars SUVs Sailboats"],
        correct: "Cascading Style Sheets"
    },
    {
        question: "What year was JavaScript launched?",
        options: ["1996", "1995", "1994", "None of these"],
        correct: "1995"
    }
];

// 2. DOM Elements
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");

// 3. State Variables
let currentQuestionIndex = 0;
let score = 0;

// 4. Initialize Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizBox.classList.remove("hide");
    resultBox.classList.add("hide");
    nextBtn.classList.add("hide");
    showQuestion();
}

// 5. Display Current Question & Options
function showQuestion() {
    resetState();
    let currentQuestion = quizData[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;

    // Dynamically generate option buttons
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", selectAnswer);
        optionsContainer.appendChild(button);
    });
}

// Clear old buttons
function resetState() {
    nextBtn.classList.add("hide");
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

// 6. Handle Answer Selection
function selectAnswer(e) {
    const selectedButton = e.target;
    const correctAnswer = quizData[currentQuestionIndex].correct;

    // Evaluate response and change visual state
    if (selectedButton.innerText === correctAnswer) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
        // Visual indicator: show user which one was correct anyway
        Array.from(optionsContainer.children).forEach(button => {
            if (button.innerText === correctAnswer) {
                button.classList.add("correct");
            }
        });
    }

    // Disable all choice buttons once selected
    Array.from(optionsContainer.children).forEach(button => {
        button.disabled = true;
    });

    nextBtn.classList.remove("hide");
}

// 7. Progress or End Quiz
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// 8. Render Results
function showResults() {
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    scoreText.innerText = `You scored ${score} out of ${quizData.length}!`;
}

// Event Listeners
nextBtn.addEventListener("click", handleNextButton);
restartBtn.addEventListener("click", startQuiz);

// Kick off the application on window load
startQuiz();
