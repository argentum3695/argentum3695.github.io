const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var spacePressed;
var launched = false;

var spaceRepeatDelay = 5000;
var lastSpacePressed;
var currTime;
var prevTime;

var first = true;

var projRenderList = [];
var test = [];





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
var tarY = rect.height / 2;

var projX = 0 - projRadius - 1;
var projY = rect.height / 2;

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
        
        if (first == false) {

            console.log(`Diff: ${Date.now() - lastSpacePressed}`);
            
            if ((Date.now() - lastSpacePressed) > spaceRepeatDelay) {
                console.log('asdfsdf');
                spacePressed = true;
                lastSpacePressed = Date.now();
                
            }
        } else {
            
            spacePressed = true;
            first = false;
            lastSpacePressed = Date.now();
        }


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
        // console.log(first);
        if (spacePressed) {
            // console.log('space pressed');

            
            projRenderList.push(0);
            

            launched = true;
        }

        if (launched) {

            for (proj in projRenderList) {
                projRenderList[proj] = projRenderList[proj] + 3;
            }
        }

        tarX -= 3;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        intercepted = false;
        for (i = 0; i < projRenderList.length; i++) {
            // console.log(`i = ${i}`);
            if (!checkIntercept(projRenderList[i], tarX)) {
                ctx.beginPath();
                ctx.arc(projRenderList[i], projY, projRadius, 0, 2 * Math.PI);
                ctx.stroke();
            } else {
                // console.log();
                // spawnRequired = true;
                // spawnBoth();
                // console.log(projRenderList)
                projRenderList.splice(i, 1);


                intercepted = true;

            }
        }
        if (intercepted) {
            spawnBoth();
        } else {
            ctx.beginPath();
            ctx.arc(tarX, tarY, projRadius, 0, 2 * Math.PI);
            ctx.stroke();
        }


        // if (!checkIntercept(projX, tarX)) {
        //     ctx.beginPath();
        //     ctx.arc(tarX, tarY, projRadius, 0, 2 * Math.PI);
        //     ctx.stroke();

        //     ctx.beginPath();
        //     ctx.arc(projX, projY, projRadius, 0, 2 * Math.PI);
        //     ctx.stroke();
        // } else {
        //     console.log('intercept')
        //     launched = false;
        //     spawnRequired = true;

        //     spawnBoth();
        // }
    }







    if (!gameOver) {
        req = window.requestAnimationFrame(playGame);
    } else {
        document.getElementById('canvas').style.display = 'none';
        alert('game over');
    }


    // first = false;

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
    tarY = rect.height / 2;

    projX = 0 - projRadius - 1;
    projY = rect.height / 2;
}

