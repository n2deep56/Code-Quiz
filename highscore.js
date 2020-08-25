//display element
var userFirst = document.querySelector("#firstPlace");
var userSecond = document.querySelector("#secondPlace");
var userThird = document.querySelector("#thirdPlace");

//variables
var sortArray = [];

//grabs top score values from local storage
var scoreTemp = JSON.parse(localStorage.getItem("userScoreTemp"));
var score1 = localStorage.getItem("topScore1");
var score2 = localStorage.getItem("topScore2");
var score3 = localStorage.getItem("topScore3");

//sorts array desc and removes null & undefined entries
sortArray.push(score1, score2, score3, scoreTemp);
sortArray = sortArray.filter((entry) => {
  return entry !== null && entry !== "undefined";
});
sortArray.sort().reverse();

//sets storage and values in page elements
localStorage.setItem("topScore1", sortArray[0]);
userFirst.textContent = sortArray[0];
if (sortArray[1]) {
  localStorage.setItem("topScore2", sortArray[1]);
  userSecond.textContent = sortArray[1];
}
if (sortArray[2]) {
  localStorage.setItem("topScore3", sortArray[2]);
  userThird.textContent = sortArray[2];
}

//removes temp storage
localStorage.removeItem("userScoreTemp");
