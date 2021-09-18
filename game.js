
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameRunning = false;
var level = 0;


$(document).keypress(function(){
    if(!gameRunning){
        nextSequence();
        gameRunning = true;
    }

});

function nextSequence(){
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    level++;
    $("#level-title").text("Level " + level);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").click(function(event){

    if(gameRunning){
        var userChosenColour = event.target.id;

        userClickedPattern.push(userChosenColour);
    
        $("#" + event.target.id).addClass("pressed");
        setTimeout(function(){
            $("#" + event.target.id).removeClass("pressed");
        }, 50);
        playSound(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    }

});

function playSound(color){
    var buttonSound = new Audio("sounds/"+color+".mp3");
    buttonSound.play();
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    }
    else{
        gameOver();
    }
}

function gameOver(){
    gameRunning = false;
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    level = 0;
    gamePattern = [];

}