const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
ctx.fillStyle = "black";
ctx.strokeStyle = "black";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


canvasDisplayOffset = 0;

var cloudRenderList = [];

prevy = 0;
for (i = 0; i < 10000; i++) {

    geny = 1000 + prevy + Math.floor(Math.random() * 1000);
    prevy = geny;
    genx = Math.floor(Math.random() * 800);

    genwidth = 10 + Math.floor(Math.random() * 200);
    genheight = 0.5 * genwidth + Math.random()/2 * genwidth;
    cloudRenderList.push({ xcoord: genx, ycoord: geny, width: genwidth, height: genheight });
}


ctx.font = "100px Bebas Neue";
ctx.textAlign = "center";

const text = ctx.measureText("DIVE");






req = window.requestAnimationFrame(playGame);

var first = true;

var vel = 0;
var accel = 100;

var charX = text.width + 10;
var charY = 80;
var charWidth = 20;
var charHeight = 20;

var flatTerminalVel = 55;
var headDownTerminalVel = 80;

var terminalVelocities = [550, 800];

var charOrientation = 0;

var platformX = 0;
var platformY = charY + charHeight;
var platformWidth = 500;
var platformHeight = 30;

var jumped = false;


var leftArrowPressed;
var rightArrowPressed;

document.body.addEventListener("keydown", getKeyDown);
document.body.addEventListener("keyup", getKeyUp);


function getKeyDown(keyEvent) {

    if (`${keyEvent.code}` == "ArrowLeft") {
        leftArrowPressed = true;
        keyEvent.preventDefault();
    }
    if (`${keyEvent.code}` == "ArrowRight") {
        rightArrowPressed = true;
        keyEvent.preventDefault();
    }
}

function getKeyUp(keyEvent) {

    if (`${keyEvent.code}` == "ArrowLeft") {
        leftArrowPressed = false;
        keyEvent.preventDefault();
    }
    if (`${keyEvent.code}` == "ArrowRight") {
        rightArrowPressed = false;
        keyEvent.preventDefault();
    }
}



function playGame(timestamp) {

    currTime = timestamp;
    if (first) {
        prevTime = timestamp;
        first = false;
    }

    timeDiff = currTime - prevTime;

    timeDiffSeconds = timeDiff / 1000;

    if (jumped) {
        vel += timeDiffSeconds * accel;
    }


    if (vel >= terminalVelocities[charOrientation]) {
        vel = terminalVelocities[charOrientation];
    }

    posOffset = timeDiffSeconds * vel;
    charY += posOffset;


    if (leftArrowPressed) {
        charX -= 5;
    }

    if (rightArrowPressed) {
        charX += 5;
    }

    if (charX >= canvas.width - charWidth) {
        charX = canvas.width - charWidth;
    }

    if (!jumped) {
        if (charX < text.width + 10) {
            charX = text.width + 10;
        }
    } else {
        if (charX < 0) {
            charX = 0;
        }
    }



    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    ctx.fillStyle = 'red';


    if (charY > canvas.height * 0.3) {

        if (canvasDisplayOffset == 0) {
            canvasDisplayOffset = posOffset;

        } else {
            canvasDisplayOffset += posOffset;
        }




        ctx.fillRect(charX, charY - canvasDisplayOffset, charWidth, charHeight);
        console.log("yeah");
    } else {
        ctx.fillRect(charX, charY, charWidth, charHeight);


    }

    ctx.fillStyle = 'black';

    ctx.font = "100px Bebas Neue";
    ctx.textAlign = "center";
    ctx.fillText("DIVE", 70, 100 - canvasDisplayOffset);


    ctx.fillRect(platformX, platformY - canvasDisplayOffset, platformWidth, platformHeight);

    if (charX > platformX + platformWidth) {
        if (jumped == false) {
            vel = 100;
        }
        jumped = true;

    }


    ctx.fillStyle = 'grey';

    for (i = 0; i < cloudRenderList.length; i++) {
        ctx.fillRect(cloudRenderList[i].xcoord, cloudRenderList[i].ycoord - canvasDisplayOffset, cloudRenderList[i].width, cloudRenderList[i].height);
    }



    prevTime = currTime;


    req = window.requestAnimationFrame(playGame);

}



