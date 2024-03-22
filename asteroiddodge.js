const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
ctx.fillStyle = "black";
ctx.strokeStyle = "black";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var fuel = 500;
var fuelEfficiency = 0.00001 * canvas.width;

var miningTargetState = false;

var power = 1;
var craftY = canvas.height / 2;

var fuelPerAsteroidPixel = 0.01;

var first = true;
var downArrowPressed;
var upArrowPressed;
var leftArrowPressed;
var rightArrowPressed;
var spacePressed;
var pKeyPressed;


var xvel = 0;
var yvel = 0;

var gameOver = 0;

var asteroidx = canvas.width;
var asteroidy = canvas.height / 2;

document.body.addEventListener("keydown", getKeyDown);
document.body.addEventListener("keyup", getKeyUp);

var prevTime = 0;
var asteroidRenderList = [];
var starsContainer = [[], [], []];
var currStarIndex;
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
    asteroidRenderList.push({ initxcoord: genx, xcoord: genx, ycoord: geny, width: genwidth, height: genheight, distance: 0, mined: 0 });
}

var xDisplacement = 0;
var xDistance = 0;
var yDistance = 0;
var totalDistance = 0;

createStars();

function getKeyDown(keyEvent) {

    console.log(keyEvent.code)

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

    if (`${keyEvent.code}` == "KeyP") {
        pKeyPressed = true;
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

    if (`${keyEvent.code}` == "KeyP") {
        pKeyPressed = false;
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

    // craftY += yvel * (timeDiff / 1000);
    yDistance += Math.abs(yvel * (timeDiff / 1000));
    if (asteroidRenderList[0].xcoord <= 0) {

        for (i in asteroidRenderList) {
            // asteroidRenderList[i].xcoord = asteroidRenderList[i].initxcoord - (duration);
            asteroidRenderList[i].xcoord -= xvel * (timeDiff / 1000);
            asteroidRenderList[i].ycoord -= yvel * (timeDiff / 1000);
        }
    }

    // if (asteroidRenderList[0].xcoord <= 0) {
    //     for (i in stars) {
    //         // asteroidRenderList[i].xcoord = asteroidRenderList[i].initxcoord - (duration);
    //         stars[i].starX -= xvel * (timeDiff / 1000);
    //     }
    // }

    if (asteroidRenderList[0].xcoord <= 0) {

        // asteroidRenderList[i].xcoord = asteroidRenderList[i].initxcoord - (duration);
        xDisplacement -= xvel * (timeDiff / 1000);
        xDistance += Math.abs(xvel * (timeDiff / 1000));

    }


    if (asteroidRenderList[0].xcoord > 0) {
        xvel = 0;
        for (i in asteroidRenderList) {
            // asteroidRenderList[i].xcoord = asteroidRenderList[i].initxcoord - (duration);
            asteroidRenderList[i].xcoord = asteroidRenderList[i].initxcoord;
        }
    }


    if (power) {
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

        if (pKeyPressed) {
            park();
        }

    }


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawStars();

    //Drawing Spacecraft
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(canvas.width / 2 - 20, craftY, 20, 20);

    if (power) {
        if (upArrowPressed) {
            drawBottomFlame();
        }

        if (downArrowPressed) {
            drawTopFlame();
        }

        if (leftArrowPressed) {
            drawRightFlame();
        }

        if (rightArrowPressed) {
            drawLeftFlame();
        }
    }

    if (miningTargetState) {
        ctx.fillStyle = '#0dc8ce';
        ctx.fillRect(asteroidRenderList[nearestAsteroid()].xcoord - 7, asteroidRenderList[nearestAsteroid()].ycoord - 7, asteroidRenderList[nearestAsteroid()].width + 14, asteroidRenderList[nearestAsteroid()].height + 14);
    }



    ctx.fillStyle = "grey";
    for (i in asteroidRenderList) {
        ctx.fillRect(asteroidRenderList[i].xcoord, asteroidRenderList[i].ycoord, asteroidRenderList[i].width, asteroidRenderList[i].height);
    }

    calculateAsteroidDistance();


    for (i in asteroidRenderList) {
        if (detectCollision(canvas.width / 2 - 20, craftY, asteroidRenderList[i].xcoord, asteroidRenderList[i].ycoord, 20, 20, asteroidRenderList[i].width, asteroidRenderList[i].height)) {
            gameOver = 1;
            document.getElementById("canvas").style.display = "none";
            document.getElementById("endgame").style.display = "block";
            endGame();
            cancelAnimationFrame(req);
        }
    }
    ctx.stroke();


    // if (Math.abs(asteroidRenderList[0].xcoord) > (canvas.width * 4) * (numStarsCopied + 1) ) {
    //     for (i in stars) {
    //         // asteroidRenderList[i].xcoord = asteroidRenderList[i].initxcoord - (duration);
    //         stars[i].starX += canvas.width * 5;

    //     }
    //     numStarsCopied ++;
    // }


    // if (Math.abs(asteroidRenderList[0].xcoord) < (canvas.width * 4) * (numStarsCopied) ) {
    //     for (i in stars) {
    //         // asteroidRenderList[i].xcoord = asteroidRenderList[i].initxcoord - (duration);
    //         stars[i].starX -= canvas.width * 5;

    //     }
    //     numStarsCopied --;
    // }

    oldTotalDistance = totalDistance;
    totalDistance = xDistance + yDistance;
    distanceDiff = totalDistance - oldTotalDistance;
    fuel -= fuelEfficiency * distanceDiff;

    if (fuel < 0) {
        fuel = 0;
        power = 0;
    }



    makeDashboard();

    req = window.requestAnimationFrame(playGame);
    prevTime = currTime;


}


function detectCollision(x1, y1, x2, y2, width1, height1, width2, height2) {
    // if (((x1 + width1 > x2) && (x1 + width1 < (x2 + width2)) && (y1 + height1 > y2) && (y1 + height1 < y2 + height2))) {
    //     return true;
    // } else {
    //     return false;
    // }



    if (((x1 + width1) > (x2) && x1 < (x2 + width2)) && ((y1 + width1) > y2 && (y1 < y2 + width2))) {
        return true
    } else {
        return false
    }
}

function createStars() {
    ctx.fillStyle = "white";
    for (j = 0; j < 4000; j++) {
        x = Math.floor(Math.random() * (canvas.width * 5));
        y = Math.floor(Math.random() * (canvas.height * 5));
        stars.push({ starX: x, starY: y });
    }
}

function drawStars() {
    ctx.fillStyle = "white";
    for (i = 0; i < stars.length; i++) {
        ctx.fillRect(stars[i].starX, stars[i].starY, 2, 2);
    }
}


function makeDashboard() {
    document.getElementById('distance').innerText = `Distance: ${Math.round(totalDistance, 0)}`;
    document.getElementById('fuel').innerText = `Fuel: ${Math.round(fuel, 1)}`;
    if ((Math.abs(xvel) < 20 && Math.abs(yvel) < 20)) {
        document.getElementById('parkbutton').style.backgroundColor = 'white';
    } else {
        document.getElementById('parkbutton').style.backgroundColor = 'red';
    }

}

function drawLeftFlame() {
    ctx.strokeStyle = 'yellow';
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 20, craftY + 10);
    ctx.lineTo(canvas.width / 2 - 30, craftY);
    ctx.lineTo(canvas.width / 2 - 30, craftY + 20);
    ctx.lineTo(canvas.width / 2 - 20, craftY + 10);
    ctx.fill();
}

function drawRightFlame() {
    ctx.strokeStyle = 'yellow';
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, craftY + 10);
    ctx.lineTo(canvas.width / 2 + 10, craftY);
    ctx.lineTo(canvas.width / 2 + 10, craftY + 20);
    ctx.lineTo(canvas.width / 2, craftY + 10);
    ctx.fill();
}

function drawTopFlame() {
    ctx.strokeStyle = 'yellow';
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 10, craftY);
    ctx.lineTo(canvas.width / 2 - 20, craftY - 10);
    ctx.lineTo(canvas.width / 2, craftY - 10);
    // ctx.lineTo(canvas.width / 2, craftY+10);
    ctx.stroke();
    ctx.fill();
}


function drawBottomFlame() {
    ctx.strokeStyle = 'yellow';
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 10, craftY + 20);
    ctx.lineTo(canvas.width / 2 - 20, craftY + 30);
    ctx.lineTo(canvas.width / 2, craftY + 30);
    // ctx.lineTo(canvas.width / 2, craftY+10);
    ctx.stroke();
    ctx.fill();
}


function park() {
    if (Math.abs(xvel) < 20 && Math.abs(yvel) < 20) {
        xvel = 0;
        yvel = 0;
    }
}


function endGame() {
    xvel = 0;
    yvel = 0;
    document.getElementById('dashboard').style.display = 'none';
}


function calculateAsteroidDistance() {
    craftXPosition = canvas.width / 2 - 20;
    craftYPosition = craftY;
    for (i = 0; i < asteroidRenderList.length; i++) {
        asteroidX = asteroidRenderList[i].xcoord;
        asteroidY = asteroidRenderList[i].ycoord;
        asteroidDistance = Math.sqrt((craftXPosition - asteroidX) ** 2 + (craftYPosition - asteroidY) ** 2);
        asteroidRenderList[i].distance = asteroidDistance;
    }
}

function nearestAsteroid() {
    leastDistanceIndex = 0;

    for (i = 0; i < asteroidRenderList.length; i++) {
        if (asteroidRenderList[i].distance < asteroidRenderList[leastDistanceIndex].distance) {
            leastDistanceIndex = i;
        }
    }

    return leastDistanceIndex;
}

function showMiningTarget() {
    if (miningTargetState == false) {
        miningTargetState = true;
        document.getElementById('miningtargetbutton').innerText = 'Hide Mining Target';
    } else {
        miningTargetState = false;
        document.getElementById('miningtargetbutton').innerText = 'Show Mining Target'

    }


}

function mine() {
    if (asteroidRenderList[nearestAsteroid()].mined == 0) {
        area = asteroidRenderList[nearestAsteroid()].width * asteroidRenderList[nearestAsteroid()].height;
        fuelGain = area * fuelPerAsteroidPixel;
        fuel += fuelGain;
        asteroidRenderList[nearestAsteroid()].mined = 1;
    } else {
        alert('Asteroid already mined');
    }

}
