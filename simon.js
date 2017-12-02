var min = 0;
var max = 3;
var counter = 1;
var round = counter;
const red = "red";
const green = 'green';
const blue = 'blue';
const yellow = 'yellow';
var sequence = [];
var colors = [red, green, blue, yellow];
var step = 0;
var buttonColors = ["#B02222", "#247A1A", "#1D3794", "#F5F233"];
var gSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var rSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var ySound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var bSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
// audio.play(variable);
// Element.setAttribute(name, value);
// .removeAttribute('onclick');


//TODO
// play sound when sequence is going through; (setInterval maybe? put it in there?)
// play a sound when you click a button
// current code is strictMode, need to add a function for non-strict mode
// NormalMode
// 

// checks to make sure you click the right color in a sequence
function nextColor(color) {
    if (!sequence.length) {
        nextSequence();
    } else { //strictMode works totally fine. 
        if (document.getElementById("checker").checked === true) {
            if (color === sequence[step]) {
                if (step == sequence.length - 1) {
                    step = 0;
                    nextSequence();
                }
                else {
                    step++;
                }

            } else {
                alert("Wrong sequence, let's start anew");
                sequence = [];
                step = 0;
                counter = 1;
                round = counter;
                document.getElementById('counter').innerHTML = counter;
                document.getElementById("startbtn").setAttribute("onClick", "nextSequence()");
                nextSequence();
            }

            //beginning of non-strict mode
        } else {//if they push the right buttons in order
            if (color === sequence[step]) {
                if (step == sequence.length - 1) {
                    step = 0;
                    nextSequence();
                }
                else {
                    step++;
                }

            } else {//if they push a button out of order
                alert("Hold on, here's the sequence again...");
                //query all classes of X and remove the onClick attribute
                step = 0;
                cycle();
            }
        }
    }
}

//generates random color to put in the sequence
function nextSequence() {
    if (round === 20) {
        sequence = [];
        step = 0;
        counter = 1;
        round = counter;
        document.getElementById('counter').innerHTML = counter;
        document.getElementById("startbtn").setAttribute("onClick", "nextSequence()");
        alert("20 ROUNDS IN A ROW! YOU WON!")
        changeStart();
    }
    else {
        document.getElementById("startbtn").removeAttribute('onclick');
        document.getElementById("startbtn").setAttribute("onClick", "newGame()")
        document.getElementById('counter').innerHTML = counter++;
        round++;
        var nextColor = colors[Math.floor(Math.random() * colors.length)];
        sequence.push(nextColor);
        //call timer on colorFlash here
        console.log(sequence);
        cycle();
    }

}

//flashes the colors in the sequence
function cycle() {
    var i = 0;
    var moves = setInterval(function () {
        colorFlash(sequence[i]);
        colorSound(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(moves);
        }
    }, 600)
}

function colorFlash(field) {
    var oldColor = document.getElementById(field).style.backgroundColor;
    document.getElementById(field).style.backgroundColor = "white";
    // colorSound(field);
    setTimeout(function () {
        document.getElementById(field).style.background = oldColor;
    }, 300);
}


function newGame() {
    //resets everything
    sequence = [];
    step = 0;
    counter = 1;
    round = counter;
    document.getElementById('counter').innerHTML = counter;
    document.getElementById("startbtn").removeAttribute('onclick');
    document.getElementById("startbtn").setAttribute("onClick", "nextSequence()");
    nextSequence();
};



function colorSound(theColor) {
    switch (theColor) {
        case "green":
            gSound.play();
            break;
        case "red":
            rSound.play();
            break;
        case "yellow":
            ySound.play();
            break;
        case "blue":
            bSound.play();
            break;
    }
}

function onOff() {
    if (document.getElementById("checker").checked === true) {
        document.getElementById("on").innerHTML = "ON";
    } else {
        document.getElementById("on").innerHTML = "OFF";
    }
}

function changeStart() {
    if (document.getElementById("startbtn").innerHTML === "Start") {
        document.getElementById("startbtn").innerHTML = "Reset";
    } else if (document.getElementById("startbtn").innerHTML === "Reset") {
        document.getElementById("startbtn").innerHTML = "Start";
    }
};