const buttonColours = ["red", "blue", "green", "yellow"];
var gamePatterns = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var userClickCount = 0;

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);

  const randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  animateAndPlaySound(randomChosenColour);

  gamePatterns.push(randomChosenColour);
}

function startOver() {
  started = false;
  gamePatterns = [];
  level = 0;
  userClickCount = 0;
  userClickedPattern = [];
}

function gameOver() {
  $("#level-title").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  playSound("wrong");
  startOver();
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
}

function checkAnswer() {
  console.log("pattern: " + gamePatterns[userClickCount]);
  console.log("user: " + userClickedPattern[userClickCount]);
  if (gamePatterns[userClickCount] !== userClickedPattern[userClickCount]) {
    gameOver();
  } else {
    userClickCount++;
    if (gamePatterns.length === userClickedPattern.length) {
      userClickCount = 0;
      userClickedPattern = [];

      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
}

function playSound(name) {
  const sound = new Audio(`./sounds/${name}.mp3`);
  sound.play();
}

function animateAndPlaySound(color) {
  var element = $(`.${color}`);
  element.addClass("pressed");

  playSound(color);

  setTimeout(function () {
    element.removeClass("pressed");
  }, 100);
}

function handleButtonClick(evt) {
  userClickedPattern.push(evt.target.id);

  animateAndPlaySound(evt.target.id);

  checkAnswer();
}

$(".btn").on("click", handleButtonClick);
$("body").on("keypress", function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});
