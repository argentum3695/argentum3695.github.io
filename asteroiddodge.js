const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
ctx.fillStyle = "black";
ctx.strokeStyle = "black";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var craftY = canvas.height/2;

var downArrowPressed;
var upArrowPressed;
var leftArrowPressed;
var rightArrowPressed;


var asteroidx = canvas.width;
var asteroidy = canvas.height/2;

document.body.addEventListener("keydown", getKeyDown);
document.body.addEventListener("keyup", getKeyUp);

// class asteroid {
//     constructor(x,y, width, height) {
//         this.xcoord = x;
//         this.ycoord = y;
//         this.width = width;
//         this.height = height;
//     }   
// }


var asteroidRenderList = [];

// asteroid1 = new asteroid(canvas.width, 500, 100, 100);

// for (i = 0; i <=5; i++) {
//     ('asteroid' + i) = new asteroid(canvas.width, 500, 100, 100); 
//     asteroidRenderList.push(('asteroid' + i));
// }
// asteroidRenderList.push(asteroid1);

prevx = 0;
for (i = 0; i < 1000; i++) {

    genx = 1000 + prevx + Math.floor(Math.random()*1000);
    prevx = genx
    geny = Math.floor(Math.random()*800)

    genwidth = 10 + Math.floor(Math.random()*200);
    genheight = genwidth;

    asteroidRenderList.push({initxcoord:genx, xcoord:genx, ycoord:geny, width:genwidth, height:genheight});
}

// asteroidRenderList.push({xcoord:1920, ycoord:500, width:100, height:100});

// console.log(asteroidRenderList);





function getKeyDown(keyEvent) {

    
    if (`${keyEvent.code}` == "ArrowDown") {
        // console.log("detecting arrow down");
        downArrowPressed = true;
        keyEvent.preventDefault();

    }
    if (`${keyEvent.code}` == "ArrowUp") {
        // console.log("detecting arrow up");
        upArrowPressed = true;
        keyEvent.preventDefault();

    }
    if (`${keyEvent.code}` == "ArrowLeft") {
        // console.log("detecting arrow left");
        leftArrowPressed = true;
        keyEvent.preventDefault();

    }
    if (`${keyEvent.code}` == "ArrowRight") {
        // console.log("detecting arrow right");

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
        console.log("right arrow released");
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

    duration = currTime - zeroTime;
    console.log(`Elapsed time: ${duration/1000} seconds`)

    for (i in asteroidRenderList) {
        // console.log(asteroidRenderList[i].xcoord);
        asteroidRenderList[i].xcoord = asteroidRenderList[i].initxcoord - (duration);
    }

    asteroidx = canvas.width - (350 * (duration/1000))
    



    if (downArrowPressed) {
        craftY+= 5;
    }

    if (upArrowPressed) {
        craftY -=5;
    }

    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    ctx.beginPath();
    ctx.fillRect(canvas.width/2 - 20, craftY, 20, 20);

    for (i in asteroidRenderList) {
        // console.log(asteroidRenderList[i].xcoord);
        ctx.fillRect(asteroidRenderList[i].xcoord, asteroidRenderList[i].ycoord, asteroidRenderList[i].width, asteroidRenderList[i].height);
    }

    for (i in asteroidRenderList) {
        // console.log(asteroidRenderList[i].xcoord);
        if (detectCollision(canvas.width/2 - 20, craftY, asteroidRenderList[i].xcoord,asteroidRenderList[i].ycoord, 20, 20, asteroidRenderList[i].width, asteroidRenderList[i].height)) {
            document.getElementById("canvas").style.display = "none";
            document.getElementById("endgame").style.display = "block";
            cancelAnimationFrame(req);
        }
    }



    ctx.stroke();
    req = window.requestAnimationFrame(playGame);
}


function detectCollision(x1, y1, x2, y2, width1, height1, width2, height2) {
    if (((x1 +width1 > x2) && (x1 + width1 < (x2 + width2)) && (y1 + height1 > y2) && (y1 + height1 < y2 + height2))) {
        return true;
    } else {
        return false;
    }
       

}








