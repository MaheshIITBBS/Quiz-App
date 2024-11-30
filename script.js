const questions = [
  {
    question: "Which is the largest animal?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Lion", correct: false },
    ],
  },
  {
    question: "Which is the fastest land animal?",
    answers: [
      { text: "Cheetah", correct: true },
      { text: "Lion", correct: false },
      { text: "Horse", correct: false },
      { text: "Leopard", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Venus", correct: false },
      { text: "Mercury", correct: false },
    ],
  },
  {
    question: "Which is the smallest continent by land area?",
    answers: [
      { text: "Australia", correct: true },
      { text: "Europe", correct: false },
      { text: "Antarctica", correct: false },
      { text: "South America", correct: false },
    ],
  },
  {
    question: "Which is the highest mountain in the world?",
    answers: [
      { text: "Mount Everest", correct: true },
      { text: "K2", correct: false },
      { text: "Kangchenjunga", correct: false },
      { text: "Lhotse", correct: false },
    ],
  },
  {
    question: "Which is the largest ocean on Earth?",
    answers: [
      { text: "Pacific Ocean", correct: true },
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Southern Ocean", correct: false },
    ],
  },
  {
    question: "Which is the most populous country in the world?",
    answers: [
      { text: "China", correct: true },
      { text: "India", correct: false },
      { text: "United States", correct: false },
      { text: "Indonesia", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerbtn = document.getElementById("answers-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function resetState() {
  nextBtn.style.display = "none";
  while (answerbtn.firstChild) {
    answerbtn.removeChild(answerbtn.firstChild);
  }
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerbtn.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerbtn.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = "true";
  });
  nextBtn.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You Scored ${score} Out of ${questions.length}!`;
  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
