const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
ctx.fillStyle = "black";
ctx.strokeStyle = "black";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var fuel = 500;
var fuelEfficiency = 0.01;

var standardVelocityIncrement = 10;
var slowVelocityIncrement = 5;
var FastVelocityIncrement = 20;


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
var shiftPressed;

var pKeyPressed;
var tKeyPressed;
var mKeyPressed;
var cKeyPressed;
var pKeyFired;
var tKeyFired;
var mKeyFired;
var cKeyFired;

// var collisionExcused = false;

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
for (i = 0; i < 10000; i++) {

    genx = 1000 + prevx + Math.floor(Math.random() * 1000);
    prevx = genx;
    geny = Math.floor(Math.random() * 800);

    // genx = 1000 + prevx + Math.floor(Math.random() * 1000);
    // prevx = genx;
    // geny = Math.floor(Math.random() * 5000);

    genwidth = 10 + Math.floor(Math.random() * 200);
    genheight = genwidth;
    asteroidRenderList.push({ initxcoord: genx, xcoord: genx, ycoord: geny, width: genwidth, height: genheight, distance: 0, mined: 0 });
}

// for (i = 0; i < asteroidRenderList.length; i++) {
//     asteroidRenderList[i].ycoord -= 2500;
// }

// for (i=0; i<asteroidRenderList.length; i++) {
//     asteroidRenderList[i].xcoord -=100;
// }




var xDisplacement = 0;
var yDisplacement = 0;
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

    if (`${keyEvent.code}` == "ShiftRight" || `${keyEvent.code}` == "ShiftLeft") {
        shiftPressed = true;
        keyEvent.preventDefault();

    }



    if (`${keyEvent.code}` == "KeyP") {
        if (!pKeyFired) {
            pKeyPressed = true;
            pKeyFired = true;
        }

        keyEvent.preventDefault();
    }

    if (`${keyEvent.code}` == "KeyT") {
        if (!tKeyFired) {
            tKeyPressed = true;
            tKeyFired = true;
        }
        keyEvent.preventDefault();
    }

    if (`${keyEvent.code}` == "KeyC") {
        if (!cKeyFired) {
            cKeyPressed = true;
            cKeyFired = true;
        }
        keyEvent.preventDefault();
    }


    if (`${keyEvent.code}` == "KeyM") {
        if (!mKeyFired) {
            mKeyPressed = true;
            mKeyFired = true;
            console.log('m key pressed');
        }
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

    if (`${keyEvent.code}` == "ShiftRight" || `${keyEvent.code}` == "ShiftLeft") {
        shiftPressed = false;
        keyEvent.preventDefault();

    }

    if (`${keyEvent.code}` == "KeyP") {
        pKeyFired = false;
        pKeyPressed = false;
        keyEvent.preventDefault();

    }
    if (`${keyEvent.code}` == "KeyT") {
        tKeyFired = false;
        tKeyPressed = false;
        keyEvent.preventDefault();

    }

    if (`${keyEvent.code}` == "KeyC") {
        cKeyFired = false;
        cKeyPressed = false;
        keyEvent.preventDefault();

    }

    if (`${keyEvent.code}` == "KeyM") {
        mKeyFired = false;
        mKeyPressed = false;
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

    yDistance += Math.abs(yvel * (timeDiff / 1000));
    yDisplacement -= yvel * (timeDiff / 1000);
    if (asteroidRenderList[0].xcoord <= 0) {

        for (i in asteroidRenderList) {
            asteroidRenderList[i].xcoord -= xvel * (timeDiff / 1000);
            asteroidRenderList[i].ycoord -= yvel * (timeDiff / 1000);
        }
    }



    if (asteroidRenderList[0].xcoord <= 0) {

        xDisplacement -= xvel * (timeDiff / 1000);
        xDistance += Math.abs(xvel * (timeDiff / 1000));

    }

    if (asteroidRenderList[0].xcoord == 0) {
        xDisplacement = 0;
    }


    if (asteroidRenderList[0].xcoord > 0) {
        xvel = 0;
        for (i in asteroidRenderList) {
            asteroidRenderList[i].xcoord = asteroidRenderList[i].initxcoord;
        }
    }


    if (power) {

        if (spacePressed) {
            increment = 2 * standardVelocityIncrement;
        } else if (shiftPressed) {
            increment = 0.1 * standardVelocityIncrement;
        } else {
            increment = standardVelocityIncrement;
        }


        if (downArrowPressed) {
            yvel += increment;
            fuel -= fuelEfficiency * increment;
        }

        if (upArrowPressed) {
            yvel -= increment;
            fuel -= fuelEfficiency * increment;
        }

        if (rightArrowPressed) {
            xvel += increment;
            fuel -= fuelEfficiency * increment;
        }

        if (leftArrowPressed) {
            xvel -= increment;
            fuel -= fuelEfficiency * increment;
        }

        if (pKeyPressed) {
            park();
        }
        if (tKeyPressed) {
            showMiningTarget();
        }
        if (cKeyPressed) {
            mine();
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
            // collisionExcused = false;
            drawBottomFlame();
        }

        if (downArrowPressed) {
            // collisionExcused = false;

            drawTopFlame();
        }

        if (leftArrowPressed) {
            // collisionExcused = false;

            drawRightFlame();
        }

        if (rightArrowPressed) {
            // collisionExcused = false;

            drawLeftFlame();
        }
    }

    if (miningTargetState) {

        if (asteroidRenderList[nearestAsteroid()].mined == 1) {
            ctx.fillStyle = '#d41313';
        }
        else if (detectCollision(canvas.width / 2 - 20, craftY, asteroidRenderList[nearestAsteroid()].xcoord - 30, asteroidRenderList[nearestAsteroid()].ycoord - 30, 20, 20, asteroidRenderList[nearestAsteroid()].width + 60, asteroidRenderList[nearestAsteroid()].height + 60)) {
            ctx.fillStyle = '#15e615';
        } else {
            ctx.fillStyle = '#0dc8ce';
        }
        ctx.fillRect(asteroidRenderList[nearestAsteroid()].xcoord - 7, asteroidRenderList[nearestAsteroid()].ycoord - 7, asteroidRenderList[nearestAsteroid()].width + 14, asteroidRenderList[nearestAsteroid()].height + 14);
    }



    ctx.fillStyle = "grey";
    for (i in asteroidRenderList) {
        ctx.fillRect(asteroidRenderList[i].xcoord, asteroidRenderList[i].ycoord, asteroidRenderList[i].width, asteroidRenderList[i].height);
    }

    calculateAsteroidDistance();


    for (i in asteroidRenderList) {
        if (detectCollision(canvas.width / 2 - 20, craftY, asteroidRenderList[i].xcoord, asteroidRenderList[i].ycoord, 20, 20, asteroidRenderList[i].width, asteroidRenderList[i].height)) {


            // resultantVel = Math.sqrt((xvel) ** 2 + (yvel) ** 2);
            // if (resultantVel < 100) {
            //     freeCraft();
            //     xvel = -0.7 * xvel;
            //     yvel = -0.7 * yvel;
            //     // collisionExcused = true;
            // } else {
                // if (!collisionExcused) {
                gameOver = 1;
                document.getElementById("canvas").style.display = "none";
                document.getElementById("endgame").style.display = "block";
                endGame();
                cancelAnimationFrame(req);
                // }

            // }





        }
    }
    ctx.stroke();



    oldTotalDistance = totalDistance;
    totalDistance = xDistance + yDistance;
    distanceDiff = totalDistance - oldTotalDistance;
    // fuel -= fuelEfficiency * distanceDiff;

    if (fuel < 0) {
        fuel = 0;
        power = 0;
    }



    makeDashboard();

    req = window.requestAnimationFrame(playGame);
    prevTime = currTime;
}


function detectCollision(x1, y1, x2, y2, width1, height1, width2, height2) {
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
    document.getElementById('xvel').innerText = `x vel: ${Math.round(xvel, 2)}`;
    document.getElementById('yvel').innerText = `y vel: ${Math.round(-yvel, 2)}`;
    document.getElementById('position').innerText = `x: ${Math.round(-xDisplacement, 0)}, y: ${Math.round(yDisplacement, 1)}`;
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
    pKeyPressed = false;
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

    tKeyPressed = false;


}

function mine() {
    if (asteroidRenderList[nearestAsteroid()].mined == 0) {
        if (detectCollision(canvas.width / 2 - 20, craftY, asteroidRenderList[nearestAsteroid()].xcoord - 30, asteroidRenderList[nearestAsteroid()].ycoord - 30, 20, 20, asteroidRenderList[nearestAsteroid()].width + 60, asteroidRenderList[nearestAsteroid()].height + 60)) {
            area = asteroidRenderList[nearestAsteroid()].width * asteroidRenderList[nearestAsteroid()].height;
            fuelGain = area * fuelPerAsteroidPixel;
            fuel += fuelGain;
            asteroidRenderList[nearestAsteroid()].mined = 1;
        } else {
            // alert('asteroid too far!');
        }

    } else {
        // alert('Asteroid already mined');
    }

    cKeyPressed = false;

}

function nearestAsteroidCenterDistance() {

    craftXPosition = canvas.width / 2 - 20;
    craftYPosition = craftY;

    craftXCenter = craftXPosition + 10;
    craftYCenter = craftYPosition + 10;

    asteroidx = asteroidRenderList[nearestAsteroid()].xcoord;
    asteroidy = asteroidRenderList[nearestAsteroid()].ycoord;

    asteroidXCenter = asteroidx + asteroidRenderList[nearestAsteroid()].width / 2;
    asteroidYCenter = asteroidy + asteroidRenderList[nearestAsteroid()].height / 2;

    centerDistance = Math.sqrt((craftXCenter + asteroidXCenter) ** 2 + (craftYCenter + asteroidYCenter) ** 2);
    return centerDistance;
}


function freeCraft() {
    craftxCoord = canvas.width / 2 - 20
    craftyCoord = craftY;

    asteroidxCoord = asteroidRenderList[nearestAsteroid()].xcoord;
    asteroidyCoord = asteroidRenderList[nearestAsteroid()].ycoord;
    asteroidWidth = asteroidRenderList[nearestAsteroid()].width;
    asteroidHeight = asteroidRenderList[nearestAsteroid()].height;

    if (((craftxCoord + 20 ) > asteroidxCoord) && (craftxCoord < ( asteroidxCoord + asteroidWidth)) && craftyCoord > asteroidyCoord) {

        if (craftxCoord < asteroidxCoord) {
            asteroidRenderList[nearestAsteroid()].xcoord = craftxCoord + 21;
        } else {
            asteroidRenderList[nearestAsteroid()].xcoord = craftxCoord -1 - asteroidWidth;
        }
    } 

    // if (((craftyCoord + 20 ) > asteroidyCoord) && (craftyCoord < ( asteroidyCoord + asteroidHeight))) {

    //     if (craftyCoord < asteroidyCoord) {
    //         asteroidRenderList[nearestAsteroid()].ycoord = craftyCoord + 21;
    //     } else {
    //         asteroidRenderList[nearestAsteroid()].ycoord = craftyCoord -1 - asteroidHeight;
    //     }
    // } 
    

}


