var start = document.querySelector('.start');
var red = document.querySelector('div .red');
var strict = document.querySelector('.strict');
var green = document.querySelector('div .green');
var yellow = document.querySelector('div .yellow');
var blue = document.querySelector('div .blue');
var redsound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var greensound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var yellowsound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var bluesound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
var level = 1;
var playerturn, computerturn;
var playermoves = [];
var cpumoves = [];

$(document).ready(function(){
  createHandlers();
});

console.log(start);

start.addEventListener("click", function() {
    playgame();
});


resetgame = () => {
  level = 1;
  $('.count').html('<span>' + 0 + '</span>');
}


cputurn = () => {
    playerturn = false;
    computerturn = true;
    $('.count').html('<span>' + level + '</span>');

    for (i = 1; i <= level; i++) {
        var num = Math.floor(Math.random() * 4 + 1);
        cpumoves.push(num);
    }

    repeatsequence();
    computerturn = false;
    playerturn = true;
}

flash = (color) => {
    var element = document.querySelector('div ' + '.' + color);
    element.classList.add(color + '-light');
    setTimeout(function() {
        element.classList.remove(color + '-light');
    }, 1000)

    return color;
}

playgame = () => {
    cpumoves = [];
    playermoves = [];
    cputurn();
  
    setTimeout(function() {
        checkmoves();
    }, 2000 * level);

}
createHandlers = () => {
  red.addEventListener("click", function() {
        flash('red');
        redsound.play();
        playermoves.push(1);
    });

    green.addEventListener("click", function() {
        flash('green');
        greensound.play();
        playermoves.push(2);
    });

    yellow.addEventListener("click", function() {
        flash('yellow');
        yellowsound.play();
        playermoves.push(3);
    });

    blue.addEventListener("click", function() {
        flash('blue');
        bluesound.play();
        playermoves.push(4);
    });

}
repeatsequence = () => {

    var i = 0,
        l = cpumoves.length;
    (function iterator() {
        if (cpumoves[i] == 1) {
            flash('red');
            redsound.play();
        }
        if (cpumoves[i] == 2) {
            flash('green');
            greensound.play();
        }
        if (cpumoves[i] == 3) {
            flash('yellow');
            yellowsound.play();
        }
        if (cpumoves[i] == 4) {
            flash('blue');
            bluesound.play();
        }

        if (++i < l) {
            setTimeout(iterator, 1000);
        }
    })();
}
checkmoves = () => {
    console.log("Player Moves", playermoves);
    if (cpumoves.length == playermoves.length) {

        if (cpumoves.toString() == playermoves.toString()) {
            level++;
            setTimeout(function() {
                playgame();
            }, 2000);
        }
        else{
          console.log('Got Here');
          
        $('.count').html('<span>! !</span>');
        $('.count span').addClass('blink_me');
          setTimeout(function() {
                resetgame();
            }, 2000);
          //playgame();
          
        }
    }
}