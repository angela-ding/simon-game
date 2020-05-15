var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

$(".instructions").click()
//the next "level" of the game, adds a new random colour/button
function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 3) + 1;
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log("game pattern: " + gamePattern);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  var buttonSound = new Audio("sounds/" + randomChosenColour + ".mp3");
  buttonSound.play();
}

//to start and restart the game
$("body").keydown(function(event) {
  if (event.key === "Enter"){
    nextSequence();
  }
});

//checks the answer against the user input whenever the user clicks a button
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) { //if the last index was correct
    console.log("user pattern 1: " + userClickedPattern);
    if (currentLevel === gamePattern.length - 1) { //whether or not the pattern is complete by the user
      userClickedPattern = [];
      console.log("user pattern 2: " + userClickedPattern);
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else { //if the last index was not correct
    startOver();
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press the enter key to restart.");

  }
}

//resets everything so the game can start over
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

//user clicks button sounds and animation
$(".btn").click(function(event) {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

//plays the button sound whenever pressed
function playSound(name) {
  var buttonSound = new Audio("sounds/" + name + ".mp3");
  buttonSound.play();
}

//animates the button whenever pressed
function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}
