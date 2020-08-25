//Variables tying to html elements
var startButton = document.getElementById("start-bttn");
var questionContainerElement = document.getElementById("question-container");
var correctAnswer = document.getElementById("correctAnswer");
var incorrectAnswer = document.getElementById("incorrectAnswer");

var questionElement = document.getElementById("question");
var answerButtonsElement = document.getElementById("answer-buttons");
var gameOver = document.getElementById("over");
var finalScore = document.getElementById("final-score");
var startSection = document.getElementById("start-section");

var userInitials = document.querySelector("#initials");
var submitButton = document.querySelector("#submit");

var seconds = 60,
  $seconds = document.querySelector("#countdown");
var countDownEnabled = false;

let shuffledQuestions;
var currentQuestionIndex = 0;

//Quiz questions array
const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Terminal Mini Language", correct: false },
      { text: "Higher Text  Markup Language", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyper Text Memory Language", correct: false },
    ],
  },
  {
    question:
      "What declaration MUST be included as the first item in an HTML document before the tag and is used to provide instructions to the web browser?",
    answers: [
      { text: "<embed>", correct: false },
      { text: "<caption>", correct: false },
      { text: "<code>", correct: false },
      { text: "<!DOCTYPE>", correct: true },
    ],
  },
  {
    question: "What is the proper way to declare a variable?",
    answers: [
      { text: "<p></p>", correct: false },
      { text: "var", correct: true },
      { text: "if", correct: false },
      { text: "declare", correct: false },
    ],
  },
  {
    question:
      "In JavaScript, what element is used to store and manipulate text usually in multiples?",
    answers: [
      { text: "Strings", correct: true },
      { text: "Functions", correct: false },
      { text: "Arrays", correct: false },
      { text: "Variables", correct: false },
    ],
  },
  {
    question:
      "What is the language or list of instructions that are executed by the computer (how JavaScript is built)?",
    answers: [
      { text: "JSON", correct: false },
      { text: "Syntax", correct: true },
      { text: "Scope", correct: false },
      { text: "Output", correct: false },
    ],
  },
];

const amountQuestions = questions.length - 1;

//Start Game
startButton.addEventListener("click", startGame);
function startGame() {
  countDownEnabled = true;
  countdown();
  startSection.classList.add("hide");
  questionContainerElement.classList.remove("hide");
  startButton.classList.add("hide");
  showQuestion(currentQuestionIndex);
}

//Shows questions
function showQuestion(index) {
  answerButtonsElement.innerHTML = "";
  questionElement.innerText = questions[index].question;
  questions[index].answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("bttn");
    if (answer.correct) {
      button.dataset.correct = "true";
    } else {
      button.dataset.correct = "false";
    }

    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

//Select answer for each question
function selectAnswer() {
  if (this.dataset.correct == "true") {
    //countDownEnabled = false;
    correctAnswer.classList.remove("hide");
    setTimeout(() => {
      correctAnswer.classList.add("hide");
    }, 1000);
    if (currentQuestionIndex < amountQuestions) {
      currentQuestionIndex++;
      showQuestion(currentQuestionIndex);
    } else {
      // console.log('game was ended');
      countDownEnabled = false;
      endGame();
    }
  } else {
    incorrectAnswer.classList.remove("hide");
    setTimeout(() => {
      incorrectAnswer.classList.add("hide");
    }, 1000);
    if (seconds > 10) {
      seconds -= 10;
    } else {
      seconds = 1;
    }
    if (currentQuestionIndex < amountQuestions) {
      currentQuestionIndex++;
      showQuestion(currentQuestionIndex);
    } else {
      // console.log('game was ended');
      countDownEnabled = false;
      endGame();
    }
  }
}

//Timer
function countdown() {
  $seconds.textContent = seconds + " second" + (seconds == 1 ? "" : "s");
  if (seconds > 0 && countDownEnabled) {
    seconds--;
    setTimeout(countdown, 1000);
  }
  //time runs out
  else {
    endGame();
  }
}

//End Game
function endGame() {
  finalScore.innerHTML = seconds;
  gameOver.classList.remove("hide");
  questionContainerElement.classList.add("hide");
}

//Stores score and initals when submit button is clicked
submitButton.addEventListener("click", function () {
  localStorage.setItem(
    "userScoreTemp",
    JSON.stringify(finalScore.innerHTML + " - " + userInitials.value)
  );
  window.location.href = "highscores.html";
});
