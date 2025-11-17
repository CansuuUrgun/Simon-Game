var level = 0;
var isStarted = false;

var userClickedPattern = [];
var gamePattern = [];

var buttonColours = ["red", "green", "blue", "yellow"];

$(document).keypress(function(){
    if(!isStarted){
        $("#level-title").text("Level " + level);
        nextSequence();
        isStarted = true;
    }
})


$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence(){
    level++;
    var title = $("#level-title");
    title.text("Level "+ level);

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = buttonColours[randomNumber];
    var selectedButton = $("#"+randomColor);
    selectedButton.fadeOut(500).fadeIn(100);
    gamePattern.push(randomColor);
    playSound(randomColor);
}

function playSound(name){
    var audioColor = new Audio("./sounds/"+name+".mp3");
    audioColor.play();
}

function animatePress(currentColor){
    var currentButton = $("#"+currentColor);
    currentButton.addClass("pressed");
    
    setTimeout(function() {
        currentButton.removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function gameOver(){
    var gameOverAudio = new Audio("./sounds/wrong.mp3");
    gameOverAudio.play();
    var body = $("body");
    body.addClass("game-over");
    setTimeout(function(){
        body.removeClass("game-over");
    }, 200);

    document.getElementById("level-title").innerText = "Game Over, Press Any Key to Restart";
}

function startOver(){
    level = 0;
    gamePattern = [];
    isStarted = false;
}