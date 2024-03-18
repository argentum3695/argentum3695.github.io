const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var spacePressed;
var launched = false;


// Get the DPR and size of the canvas
const dpr = window.devicePixelRatio;
const rect = canvas.getBoundingClientRect();
// console.log(dpr);
// console.log(rect);

// Set the "actual" size of the canvas
canvas.width = rect.width * dpr;
canvas.height = rect.height * dpr;

console.log(canvas.height);

// Scale the context to ensure correct drawing operations
ctx.scale(dpr, dpr);

// Set the "drawn" size of the canvas
canvas.style.width = `${rect.width}px`;
canvas.style.height = `${rect.height}px`;



ctx.fillStyle = "yellow";
// ctx.fillRect(10, 10, 150, 100);

var projRadius = 5;

var tarX = rect.width
var tarY = rect.height/2;

var projX = 0 - projRadius - 1;
var projY = rect.height/2;

var gameOver = false;


// console.log(rect.height)


document.body.addEventListener("keydown", getKeyDown);
document.body.addEventListener("keyup", getKeyUp);

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
        // console.log('registering space pressed');


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





req = window.requestAnimationFrame(playGame);


function playGame() {

    


    if (tarX - projRadius <= 0) {
        gameOver = true;
        console.log('gameover')
    }

    if (!gameOver) {
        if (spacePressed) {

            launched = true;
            console.log('launching')


        }

        if (launched) {

            projX += 3;
        }

        tarX -= 3;
        ctx.clearRect(0, 0, canvas.width, canvas.height);



        if (!checkIntercept(projX, tarX)) {
            ctx.beginPath();
            ctx.arc(tarX, tarY, projRadius, 0, 2 * Math.PI);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(projX, projY, projRadius, 0, 2 * Math.PI);
            ctx.stroke();
        } else {
            console.log('intercept')
            launched = false;
            spawnRequired = true;

            spawnBoth();
        }
    }







    if (!gameOver) {
        req = window.requestAnimationFrame(playGame);
    } else {
        document.getElementById('canvas').style.display = 'none';
        alert('game over');
    }

}


function checkIntercept(x1, x2) {
    if ((x1 + projRadius) > (x2 - projRadius)) {
        return true;
    } else {
        return false;
    }
}


function spawnBoth() {
    console.log('spwaning');
    tarX = rect.width;
    tarY = rect.height/2;

    projX = 0 - projRadius - 1;
    projY = rect.height/2;
}

