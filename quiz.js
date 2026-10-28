console.log("Hello, World!");
// 1. Data Structure for Questions
const quizData = [
    {
        question: "Question 1 What is the sum of 130+125+191??",
        options: ["446", "445", "444", "447"],
        correct: "446"
    },
    {
        question: "Question 2:If we minus 712 from 1500, how much do we get?",
        options: ["788", "787", "786", "789"],
        correct: "788"
    },
    {
        question: "Question 3:50 times of 8 is equal to?",
        options: ["400", "399", "398", "None of these"],
        correct: "400"
    },
    {
        question: "Question 4: What is 25 divided by 5?",
        options: ["5", "4", "6", "None of these"],
        correct: "5"
    },
    {
        question: "Question 5: What is the square root of 64?",
        options: ["8", "7", "6", "None of these"],
        correct: "8"
    },  
    {
        question: "Question 6: What is 7 multiplied by 6?",
        options: ["42", "41", "43", "None of these"],
        correct: "42"
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
