var pattern = []
var userPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false
var level = 0;

function nextSequence() {
    pattern = [];
    userPattern = []; 
    while (pattern.length < 4) {
   var randomNumber = Math.floor(Math.random()*4);
   var randomColour = buttonColours[randomNumber];
    pattern.push(randomColour);
    }

    if (level >= 3) {
        while (pattern.length < 5) {
            var randomNumber = Math.floor(Math.random()*4);
            var randomColour = buttonColours[randomNumber];
            pattern.push(randomColour);
        }
    } if (level >= 5) {
        while (pattern.length < 6) {
            var randomNumber = Math.floor(Math.random()*4);
            var randomColour = buttonColours[randomNumber];
            pattern.push(randomColour);
        }
    } if (level >= 7) {
        while (pattern.length < 8) {
            var randomNumber = Math.floor(Math.random()*4);
            var randomColour = buttonColours[randomNumber];
            pattern.push(randomColour);
        }
    }

    for (let i = 0; i < pattern.length; i++) {
        setTimeout(function() {
          $("." + pattern[i]).fadeOut(200).fadeIn(200);
          playSound(pattern[i]);
        }, 500 * (i + 1));
      }

    // setTimeout($("." + pattern[0]).fadeOut(200).fadeIn(200), 500);
    // setTimeout($("." + pattern[1]).fadeOut(200).fadeIn(200), 1000);
    // setTimeout($("." + pattern[2]).fadeOut(200).fadeIn(200), 1500);
    // setTimeout($("." + pattern[3]).fadeOut(200).fadeIn(200), 2000);


    /*for (i = 0; i < 4; i++) {
        (function(i) {
      
          setTimeout(function() {
            $("." + pattern[i]).fadeOut(200).fadeIn(200);
          }, 500 * (i + 1));
          
        })(i)
      }*/

    
    $("h1").html("Level" + " " + level);
    level++;
    console.log(pattern)
}


/*var num = nextSequence();

var randomColour = buttonColours[num];

pattern.push([randomColour]);
console.log(pattern); */



$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    userPattern.push(userChosenColour);
    console.log(userPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    if (userPattern.length === pattern.length) {
        answerCheck(userPattern);
    }
});

function playSound(name) {

    switch (name) {
        case "green":
            var green = new Audio("./sounds/" + name + ".mp3");
            green.play();
            break;
            
        case "red":
            var red = new Audio("./sounds/" + name + ".mp3");
            red.play();    
            break;

        case "yellow":
            var yellow = new Audio("./sounds/" + name + ".mp3");
            yellow.play();    
            break;

        case "blue":
            var blue = new Audio("./sounds/" + name + ".mp3");
            blue.play();
            break;
        
    }

    // for (i = 0; i<pattern.length; i++) {
    //     var colourAudio = new Audio("./sounds/" + pattern[i] + ".mp3");
    //     colourAudio.play();
    // }

}

function animatePress (currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 75)
}



$("body").on ("keydown", function () {

    if (!started) {
        started = true;
        console.log(started);
        $(this).prop("disabled", "true");
        
        nextSequence();
    }

});

$("body").on ("touchstart", function () {

    if (!started) {
        started = true;
        console.log(started);
        $(this).prop("disabled", "true");
        
        nextSequence();
    }

});

function answerCheck(currentLevel) {
    let success = currentLevel.length === pattern.length && currentLevel.every((el, i) => pattern[i] === el);

    if (success) {
        console.log("success");
        setTimeout( function () {
            nextSequence()
        }, 1000)
    } else {
        console.log("incorrect");
        var wrong = new Audio("./sounds/wrong.mp3");
            wrong.play()
            $("h1").html("Game Over!")
            $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
    }, 300);

        restart();
   }
   
    // if (currentLevel[0] === pattern[0] && currentLevel[1] === pattern[1] && currentLevel[2] === pattern[2] && ) {
    //     console.log("success");
    //     setTimeout(nextSequence(), 1000);
    // } else {
    //     console.log("Incorrect");
    // }
}

function restart( ) {
    level = 0;
    started = false;
}

console.log(started);
