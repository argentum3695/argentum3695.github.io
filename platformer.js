const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
ctx.fillStyle = "black";
ctx.strokeStyle = "black";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


spriteX = 0;
spriteY = 480;
spriteWidth = 20;
spriteHeight = 20;

map = [];

map.push({ x: 0, y: 500, width: 500, height: 10 });
map.push({ x: 300, y: 480, width: 500, height: 10 });


var canvasDisplayOffset = 0;

var leftArrowPressed;
var rightArrowPressed;
var upArrowPressed;
var upArrowFired;
var downArrowPressed;


var jumpQueried = false;
var jumping = false;

jumped = false;


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

    if (`${keyEvent.code}` == "ArrowUp") {
        upArrowPressed = true;
        if (!upArrowFired) {
            upArrowFired = true;
        }
        keyEvent.preventDefault();
    }
    if (`${keyEvent.code}` == "ArrowDown") {
        downArrowPressed = true;
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
    if (`${keyEvent.code}` == "ArrowUp") {
        upArrowPressed = false;
        upArrowFired = false;
        keyEvent.preventDefault();
    }
    if (`${keyEvent.code}` == "ArrowDown") {
        downArrowPressed = false;
        keyEvent.preventDefault();
    }
}


req = window.requestAnimationFrame(playGame);


function playGame(timestamp) {

    canvasDisplayOffset = 0;

    if (leftArrowPressed) {
        spriteX -= 5;
        canvasDisplayOffset = -5;


    }



    if (rightArrowPressed) {
        spriteX += 5;
        canvasDisplayOffset = 5;
    }


    if (upArrowFired) {

        if (jumpQueried) {
            jumped = false;
        }
        
        jump();

        upArrowFired = false;
    }
    // if (spriteX + spriteWidth > canvas.width) {
    //     spriteX = canvas.width - spriteWidth;
    // }

    if (spriteX < 0) {
        spriteX = 0;
    }








    ctx.beginPath();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'red';
    ctx.fillRect(spriteX, spriteY, spriteWidth, spriteHeight);


    ctx.fillStyle = 'black';
    for (i in map) {
        ctx.fillRect(map[i].x, map[i].y, map[i].width, map[i].height)
    }

    // if (!jumping) {
    //     console.log('jumping is false');
    //     checkGround();

    // }

    console.log(jumpQueried);
    if (!jumpQueried) {
        checkGround();
    }

    req = window.requestAnimationFrame(playGame);


}


function jump() {
    jumping = true;
    // for (i = 0; i<=10; i++) {
    //     setTimeout( () => {
    //         spriteY--;
    //         console.log('changing y');
    //     } , 10000);

    // }

    // for (i = 0; i<=10; i++) {
    //     setTimeout( () => {
    //         spriteY++;
    //     } , 100);

    // }

    spriteY -= spriteHeight;

    jumping = false;
    jumpQueried = false;

    checkGround();



    groundBelow = false;
    groundPlane = false;

    for (i in map) {
        if ((map[i].y == (spriteY + spriteHeight)) && spriteX > map[i].x) {
            groundPlane = i;
            break;

        }
    }




    // console.log(groundPlane);
    // if (groundPlane == false) {
    //     setTimeout( () => {spriteY +=spriteHeight}, 100);



    // }



}


function checkGround() {

    
    if (!jumping) {
        for (i in map) {

            groundDetected = false;
            if ((map[i].y == (spriteY + spriteHeight)) && ((spriteX >= map[i].x) && (spriteX <= (map[i].x + map[i].width)))) {
                groundDetected = true;
                // console.log("ground detected")
                break;

            }

            if (!groundDetected) {
                spriteY += 1;

            }
        }

    }
}