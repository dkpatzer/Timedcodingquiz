// Define quiz questions and answers
const questions = [
    {
        question: "What is the correct syntax for creating a new array in JavaScript?",
        options: ["[ ]", "{ }", "( )", "< >"],
        answer: "[ ]"
    },
    {
        question: "Which of the following is NOT a JavaScript data type?",
        options: ["number", "string", "boolean", "array"],
        answer: "array"
    },
    {
        question: "What is the result of the following expression: '5' + 3?",
        options: ["8", "53", "NaN", "Error"],
        answer: "53"
    },
    {
        question: "Which of the following is NOT a comparison operator in JavaScript?",
        options: ["==", "===", "<=", ">="],
        answer: "==="
    },
    {
        question: "Which built-in method in JavaScript is used to sort an array?",
        options: ["sort()", "order()", "arrange()", "organize()"],
        answer: "sort()"
    }
];

// Initialize global variables
let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;
let score = 0;

// Get DOM elements
const startButton = document.getElementById("start-button");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score-value");
const timerElement = document.getElementById("timer");
const saveButton = document.getElementById("save-button");
const highScoresButton = document.getElementById("high-scores");

// Add event listener for start button
startButton.addEventListener("click", startQuiz);

// Add event listener for options container
optionsContainer.addEventListener("click", checkAnswer);

// Add event listener for save button
saveButton.addEventListener("click", saveScore);

// Add event listener for high scores button
highScoresButton.addEventListener("click", viewHighScores);

// Function to start the quiz
function startQuiz() {
    // Hide start button
    startButton.classList.add("hide");
    // Show question container
    questionContainer.classList.remove("hide");
    // Hide score container
    scoreContainer.classList.add("hide");
    // Render the first question
    renderQuestion();
    // Start the timer
    timerInterval = setInterval(updateTimer, 1000);
}

// Function to render the current question
function renderQuestion() {
    // Get the current question object
    const currentQuestion = questions[currentQuestionIndex];
    // Set the question text
    questionElement.textContent = currentQuestion.question;
    // Clear options container
    optionsContainer.innerHTML = "";
    // Loop through the options and create list items
    currentQuestion.options.forEach((option) => {
        // Create a list item
        const liElement = document.createElement("li");
        // Set the option text
        liElement.textContent = option;
        // Append the list item to the options container
        optionsContainer.appendChild(liElement);
    });
}

// Function to check the selected answer
function checkAnswer(event) {
    // Get the selected answer text
    const selectedAnswer = event.target.textContent;
    // Get the current question object
    const currentQuestion = questions[currentQuestionIndex];
    // Check if selected answer is correct
    if (selectedAnswer === currentQuestion.answer) {
        // Increment the score by 10
        score += 10;
        // Update the score element
        scoreElement.textContent = score;
    } else {
        // Decrement time left by 10 seconds
        timeLeft
