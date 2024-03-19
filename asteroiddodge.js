const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
ctx.fillStyle = "black";
ctx.strokeStyle = "black";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var craftY = canvas.height / 2;

var first = true;
var downArrowPressed;
var upArrowPressed;
var leftArrowPressed;
var rightArrowPressed;
var xvel = 0;
var yvel = 0;

var asteroidx = canvas.width;
var asteroidy = canvas.height / 2;

document.body.addEventListener("keydown", getKeyDown);
document.body.addEventListener("keyup", getKeyUp);

var prevTime = 0;
var asteroidRenderList = [];
var starsContainer = [[],[],[]];
var currStarIndex
var stars = [];
// var stars2 = [];
// var stars3 = [];

var numStarsCopied = 0;
prevx = 0;

asteroidRenderList.push({ initxcoord: 0, xcoord: 0, ycoord: 0, width: 0, height: 0 })
for (i = 0; i < 1000; i++) {

    genx = 1000 + prevx + Math.floor(Math.random() * 1000);
    prevx = genx
    geny = Math.floor(Math.random() * 800)

    genwidth = 10 + Math.floor(Math.random() * 200);
    genheight = genwidth;

    asteroidRenderList.push({ initxcoord: genx, xcoord: genx, ycoord: geny, width: genwidth, height: genheight });
}

var xDisplacement = 0;
var xDistance = 0;
var yDistance = 0;
var totalDistance = 0;

createStars();

function getKeyDown(keyEvent) {


    if (`${keyEvent.code}` == "ArrowDown") {
        downArrowPressed = true;
        keyEvent.preventDefault();
    }
    if (`${keyEvent.code}` == "ArrowUp") {
        upArrowPressed = true;
        keyEvent.preventDefault();
    }
    if (`${keyEvent.code}` == "ArrowLeft") {
        leftArrowPressed = true;
        keyEvent.preventDefault();
    }
    if (`${keyEvent.code}` == "ArrowRight") {
        rightArrowPressed = true;
        keyEvent.preventDefault();
    }

    if (`${keyEvent.code}` == "Space") {
        spacePressed = true;
        keyEvent.preventDefault();
    }
}


function getKeyUp(keyEvent) {

    if (`${keyEvent.code}` == "ArrowDown") {
        downArrowPressed = false;
        keyEvent.preventDefault();
    }
    if (`${keyEvent.code}` == "ArrowUp") {
        upArrowPressed = false;
        keyEvent.preventDefault();
    }
    if (`${keyEvent.code}` == "ArrowLeft") {
        leftArrowPressed = false;
        keyEvent.preventDefault();
    }
    if (`${keyEvent.code}` == "ArrowRight") {
        rightArrowPressed = false;
        keyEvent.preventDefault();
    }

    if (`${keyEvent.code}` == "Space") {
        spacePressed = false;
        keyEvent.preventDefault();
    }
}


const zeroTime = Date.now();

req = window.requestAnimationFrame(playGame);

function playGame(timestamp) {

    currTime = Date.now();
    if (first) {
        prevTime = Date.now();
        first = false;
    }
    timeDiff = currTime - prevTime;

    duration = currTime - zeroTime;

    craftY += yvel * (timeDiff / 1000);
    yDistance += Math.abs(yvel * (timeDiff / 1000));
    // console.log(asteroidRenderList[0].xcoord);
    if (asteroidRenderList[0].xcoord <= 0) {

        for (i in asteroidRenderList) {
            // asteroidRenderList[i].xcoord = asteroidRenderList[i].initxcoord - (duration);
            asteroidRenderList[i].xcoord -= xvel * (timeDiff / 1000);
        }
    }

    if (asteroidRenderList[0].xcoord <= 0) {
        for (i in stars) {
            // asteroidRenderList[i].xcoord = asteroidRenderList[i].initxcoord - (duration);
            stars[i].starX -= xvel * (timeDiff / 1000);
        }
    }

    if (asteroidRenderList[0].xcoord <= 0) {
       
            // asteroidRenderList[i].xcoord = asteroidRenderList[i].initxcoord - (duration);
            xDisplacement -= xvel * (timeDiff / 1000);
            xDistance += Math.abs(xvel * (timeDiff / 1000));
        
    }

    // console.log(`${xDisplacement}, ${asteroidRenderList[0].xcoord}`);

        // console.log(xDistance);


    if (asteroidRenderList[0].xcoord > 0) {
        xvel = 0;
        for (i in asteroidRenderList) {
            // asteroidRenderList[i].xcoord = asteroidRenderList[i].initxcoord - (duration);
            asteroidRenderList[i].xcoord = asteroidRenderList[i].initxcoord;
        }
    }

    if (downArrowPressed) {
        yvel += 7;
    }

    if (upArrowPressed) {
        yvel -= 7;
    }

    if (rightArrowPressed) {
        xvel += 10;
    }

    if (leftArrowPressed) {
        xvel -= 10;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawStars();

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(canvas.width / 2 - 20, craftY, 20, 20);

    ctx.fillStyle = "grey"
    for (i in asteroidRenderList) {
        ctx.fillRect(asteroidRenderList[i].xcoord, asteroidRenderList[i].ycoord, asteroidRenderList[i].width, asteroidRenderList[i].height);
    }

    for (i in asteroidRenderList) {
        if (detectCollision(canvas.width / 2 - 20, craftY, asteroidRenderList[i].xcoord, asteroidRenderList[i].ycoord, 20, 20, asteroidRenderList[i].width, asteroidRenderList[i].height)) {
            document.getElementById("canvas").style.display = "none";
            document.getElementById("endgame").style.display = "block";
            cancelAnimationFrame(req);
        }
    }
    ctx.stroke();

    // console.log(asteroidRenderList[0].xcoord)

    if (Math.abs(asteroidRenderList[0].xcoord) > (canvas.width * 5) * (numStarsCopied + 1) ) {
        console.log('copying stars')
        for (i in stars) {
            // asteroidRenderList[i].xcoord = asteroidRenderList[i].initxcoord - (duration);
            stars[i].starX += canvas.width * 5;
            
        }
        numStarsCopied ++;
    }


    if (Math.abs(asteroidRenderList[0].xcoord) < (canvas.width * 5) * (numStarsCopied ) ) {
        console.log('copying stars')
        for (i in stars) {
            // asteroidRenderList[i].xcoord = asteroidRenderList[i].initxcoord - (duration);
            stars[i].starX -= canvas.width * 5;
            
        }
        numStarsCopied --;
    }

    req = window.requestAnimationFrame(playGame);
    prevTime = currTime;

    totalDistance = xDistance + yDistance;
    console.log(Math.round(totalDistance, 0));
}


function detectCollision(x1, y1, x2, y2, width1, height1, width2, height2) {
    if (((x1 + width1 > x2) && (x1 + width1 < (x2 + width2)) && (y1 + height1 > y2) && (y1 + height1 < y2 + height2))) {
        return true;
    } else {
        return false;
    }
}

function createStars() {
    ctx.fillStyle = "white";
    // for (i = 0; i <3; i++) {
        for (j = 0; j < 4000; j++) {
            x = Math.floor(Math.random() * (canvas.width * 5));
            y = Math.floor(Math.random() * (canvas.height * 5));
            stars.push({ starX: x, starY: y });
        }
    // }
    
}

function drawStars() {
    ctx.fillStyle = "white";
    for (i = 0; i < stars.length; i++) {
        ctx.fillRect(stars[i].starX, stars[i].starY, 2, 2);
    }
}