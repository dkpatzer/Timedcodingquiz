// Store the quiz questions and answers
const quizQuestions = [
  // Existing questions
  {
    question: "What is the correct syntax for referring to an external script called 'script.js'?",
    options: [
      "<script src='script.js'></script>",
      "<script href='script.js'></script>",
      "<script ref='script.js'></script>",
      "<script name='script.js'></script>"
    ],
    answer: "<script src='script.js'></script>"
  },
  {
    question: "Which built-in method removes the last element from an array and returns that element?",
    options: ["last()", "get()", "pop()", "remove()"],
    answer: "pop()"
  },
  {
    question: "How can you get the type of arguments passed to a function?",
    options: ["using typeof operator", "using getType function", "using getTypeOf method", "using type property"],
    answer: "using typeof operator"
  },
  {
    question: "What is the output of the following code?\nconsole.log(1 + '1');",
    options: ["11", "2", "undefined", "NaN"],
    answer: "11"
  },
  {
    question: "Which operator is used to concatenate multiple strings?",
    options: ["+", "&", ".", "~"],
    answer: "+"
  },
  // Additional questions
  {
    question: "What is the purpose of the 'splice' method in JavaScript?",
    options: [
      "To remove elements from an array and replace them with new elements",
      "To add elements to the beginning of an array",
      "To sort the elements of an array in descending order",
      "To check if an array contains a specific element"
    ],
    answer: "To remove elements from an array and replace them with new elements"
  },
  {
    question: "Which method is used to convert a string to an integer?",
    options: ["parseInt()", "toString()", "toFixed()", "toUpperCase()"],
    answer: "parseInt()"
  },
  {
    question: "What is the output of the following code?\nconsole.log(typeof null);",
    options: ["null", "object", "undefined", "number"],
    answer: "object"
  },
  {
    question: "What is the purpose of the 'slice' method in JavaScript?",
    options: [
      "To extract a section of an array and return a new array",
      "To convert a string to lowercase",
      "To find the index of a specified element in an array",
      "To remove whitespace from both ends of a string"
    ],
    answer: "To extract a section of an array and return a new array"
  },
  {
    question: "Which method is used to convert a string to uppercase?",
    options: ["toUpperCase()", "toLowerCase()", "toString()", "toFixed()"],
    answer: "toUpperCase()"
  },
  {
    question: "What does the 'JSON.stringify' method do?",
    options: [
      "Converts a JavaScript object to a JSON string",
      "Converts a JSON string to a JavaScript object",
      "Parses a JSON string and returns the parsed value",
      "Checks if a value is a valid JSON object"
    ],
    answer: "Converts a JavaScript object to a JSON string"
  },
  {
    question: "What is the purpose of the 'forEach' method in JavaScript?",
    options: [
      "To execute a provided function once for each array element",
      "To add elements to the end of an array",
      "To reverse the order of the elements in an array",
      "To check if an array contains a specific element"
    ],
    answer: "To execute a provided function once for each array element"
  },
  {
    question: "What is the output of the following code?\nconsole.log(10 > '9');",
    options: ["true", "false", "undefined", "NaN"],
    answer: "true"
  },
  {
    question: "Which method is used to remove whitespace from both ends of a string?",
    options: ["trim()", "concat()", "replace()", "slice()"],
    answer: "trim()"
  },
  {
    question: "What is the purpose of the 'map' method in JavaScript?",
    options: [
      "To create a new array with the results of calling a provided function on every element in the array",
      "To check if at least one element in the array satisfies a given condition",
      "To return the first element that satisfies a given condition",
      "To sort the elements of an array in ascending order"
    ],
    answer: "To create a new array with the results of calling a provided function on every element in the array"
  },
  {
    question: "What is the output of the following code?\nconsole.log(5 == '5');",
    options: ["true", "false", "undefined", "NaN"],
    answer: "true"
  }
];
// Create an Audio object for the click sound
const clickSound = new Audio("Sounds/219476__jarredgibb__button-05.wav");
const startSound = new Audio("Sounds/657945__matrixxx__scifi-inspect-sound-ui-or-in-game-notification-01.wav");;

// Get DOM elements
const startPage = document.getElementById("start-page");
const quizPage = document.getElementById("quiz-page");
const resultPage = document.getElementById("result-page");
const startButton = document.getElementById("start-button");
const submitButton = document.getElementById("submit-button");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const scoreElement = document.getElementById("score");
const resultContent = document.getElementById("result-content");
const initialsInput = document.getElementById("initials-input");
const saveButton = document.getElementById("save-button");
const timeElement = document.getElementById("time");
const correctAnswersElement = document.createElement("div"); // New element for displaying correct answers
const timerContainer = document.getElementById("timer-container"); // Timer container element

const highestScoreContainer = document.getElementById("highest-score-container"); // New container for highest score

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;

// Function to start the timer
function startTimer() {
  displayTimer(); // Display initial time
  timerInterval = setInterval(() => {
    timeLeft--;
    displayTimer();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

// Function to start the quiz
function startQuiz() {
  startSound.play(); // Play the start sound
  startPage.classList.add("hide");
  quizPage.classList.remove("hide");
  startTimer();
  showQuestion();
}

// Function to display a question and its answer options
function showQuestion() {
  const question = quizQuestions[currentQuestionIndex];
  questionElement.textContent = question.question;
  optionsContainer.innerHTML = "";

  const shuffledOptions = shuffleArray(question.options); // Shuffle the options

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement("li");
    option.classList.add("option-list-item");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "option";
    input.id = `option-${i}`;
    input.value = shuffledOptions[i];
    const label = document.createElement("label");
    label.htmlFor = `option-${i}`;
    label.textContent = shuffledOptions[i];
    option.appendChild(input);
    option.appendChild(label);
    optionsContainer.appendChild(option);
  }
}

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
  const shuffledArray = array.slice(); // Create a copy of the original array

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
  }

  return shuffledArray;
}


// Function to handle the selected answer option
function selectOption(event) {
  const selectedOption = optionsContainer.querySelector('input[name="option"]:checked');
  const question = quizQuestions[currentQuestionIndex];
  const selectedAnswer = selectedOption.value.trim(); // Trim the selected answer
  const correctAnswer = question.answer.trim(); // Trim the correct answer
  const selectedOptionParent = selectedOption.closest('li');
  // Clear the selected state for all options
  const allOptions = optionsContainer.querySelectorAll('input[name="option"]');
  allOptions.forEach((option) => {
    option.checked = false;
  });

  // Set the selected state for the chosen option
  selectedOption.checked = true;

  if (selectedAnswer === correctAnswer) {
    score++;
    selectedOptionParent.classList.add('correct'); // Add 'correct' class to the parent <li>
  } else {
    timeLeft -= 10; // Deduct 10 seconds for incorrect answer
    if (timeLeft < 0) {
      timeLeft = 0; // Ensure timeLeft is not negative
    }
    selectedOptionParent.classList.add('incorrect'); // Add 'incorrect' class t
  }
  displayTimer(); // Update the displayed time

  clickSound.play(); // Play the click sound

  // Move to the next question if available
  if (currentQuestionIndex + 1 < quizQuestions.length) {
    currentQuestionIndex++;
    showQuestion(); // Display the next question
  } else {
    endQuiz(); // If there are no more questions, end the quiz
  }
}


// Function to display the correct answers
function displayCorrectAnswers() {
  correctAnswersElement.innerHTML = ""; // Clear the previous content

  for (let i = 0; i < quizQuestions.length; i++) {
    const question = quizQuestions[i];
    const answerElement = document.createElement("p");
    answerElement.textContent = `Question ${i + 1}: ${question.answer}`;
    correctAnswersElement.appendChild(answerElement);
  }

  resultContent.appendChild(correctAnswersElement);
}
 function displayTimer() {
  timeElement.textContent = timeLeft;
}
// Function to save the score and initials
function saveScore() {
  startSound.play();
  const initials = initialsInput.value.trim();

  if (initials === "") {
    // Display an error message or prevent saving
    return;
  }

  const scoreData = {
    initials: initials,
    score: score
  };

  // Retrieve existing scores from localStorage or initialize an empty array
  const existingScores = localStorage.getItem("scores");
  const scores = existingScores ? JSON.parse(existingScores) : [];

  // Add the new score to the scores array
  scores.push(scoreData);

  // Store the updated scores array in localStorage
  localStorage.setItem("scores", JSON.stringify(scores));

  resetQuiz();
}

// Function to display the highest score
function displayHighestScore() {
  const existingScores = localStorage.getItem("scores");
  const scores = existingScores ? JSON.parse(existingScores) : [];

  let highestScore = 0;
  let initials = "";

  scores.forEach(scoreData => {
    if (scoreData.score > highestScore) {
      highestScore = scoreData.score;
      initials = scoreData.initials;
    }
  });

  const highestScoreElement = document.getElementById("highest-score");
  highestScoreElement.textContent = `High Score: ${initials} - ${highestScore}`;
}

// Function to reset the quiz
function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 60;
  startPage.classList.remove("hide");
  resultPage.classList.add("hide");
  initialsInput.value = "";
}

// Function to end the quiz and display the result
function endQuiz() {
  clearInterval(timerInterval);
  quizPage.classList.add("hide");
  resultPage.classList.remove("hide");
  scoreElement.textContent = score;
  displayCorrectAnswers();
  timeLeft = 60; // Reset the timer to 60 seconds
  timeElement.textContent = timeLeft; // Display the reset time
  
  displayHighestScore(); // Call the function to display the highest score
}


// Event listeners
startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", selectOption);
saveButton.addEventListener("click", saveScore);











