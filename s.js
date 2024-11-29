const quizData = [
  {
    question: "1. What does HTML stand for?",
    choices: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Home Tour Management Language",
    ],
    correct: 0,
  },
  {
    question: "2. What does CSS stand for?",
    choices: [
      "Cascading Style Sheets",
      "Creative Style Sheets",
      "Computer Style Sheets",
    ],
    correct: 0,
  },
  {
    question: "3. What does JS stand for?",
    choices: ["JavaScript", "JavaSource", "JustScript"],
    correct: 0,
  },
];

let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");

// Load a question
function loadQuestion() {
  if (!questionEl || !choicesEl) {
    console.error("DOM elements for the quiz are not properly initialized.");
    return;
  }

  const currentQuestion = quizData[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  choicesEl.innerHTML = "";

  currentQuestion.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.className = "choice-btn";
    button.onclick = () => selectAnswer(index, button);
    choicesEl.appendChild(button);
  });

  nextBtn.disabled = true; // Disable the Next button until an answer is selected
}

// Handle answer selection
function selectAnswer(selectedIndex, button) {
  const correctIndex = quizData[currentQuestionIndex].correct;

  // Highlight correct and incorrect answers
  Array.from(choicesEl.children).forEach((btn, index) => {
    btn.disabled = true; // Disable all buttons after a selection
    if (index === correctIndex) {
      btn.style.backgroundColor = "green";
    } else if (index === selectedIndex) {
      btn.style.backgroundColor = "red";
    }
  });

  if (selectedIndex === correctIndex) {
    score++;
  }

  nextBtn.disabled = false; // Enable the Next button
}

// Move to the next question
function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

// Display the result
function showResult() {
  document.getElementById("quiz").style.display = "none";
  resultEl.style.display = "block";
  scoreEl.textContent = `${score} / ${quizData.length}`;
}

// Save user score in localStorage
function saveUserScore() {
  const usernameInput = document.getElementById("username");
  const username = usernameInput ? usernameInput.value.trim() : "";

  if (!username) {
    alert("Please enter your name.");
    return;
  }

  const userScores = JSON.parse(localStorage.getItem("userScores")) || [];
  userScores.push({ username, score });
  localStorage.setItem("userScores", JSON.stringify(userScores));

  alert("Your score has been saved!");
  location.reload(); // Restart the quiz
}

// Display scores in admin panel
function displayUserScores() {
  const userScores = JSON.parse(localStorage.getItem("userScores")) || [];
  const tbody = document.querySelector("#user-scores tbody");

  if (!tbody) {
    console.error("Admin panel table not found.");
    return;
  }

  tbody.innerHTML = "";

  userScores.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${user.username}</td><td>${user.score}</td>`;
    tbody.appendChild(row);
  });
}

// Initialize the quiz on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  loadQuestion();
  nextBtn.addEventListener("click", nextQuestion);
});
