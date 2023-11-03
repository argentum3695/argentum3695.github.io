var targetButtonID;
var spawnRequired = true;
var score = 0;
var buttonSpawnTime;
var defScoreIncrement = 10;
var allowedTime = 2;
var showTime = true;
var ifStartGame = false;
var spawnTime = Date.now();
var gameOver = false;
let req;

function createButtons() {
    for (i = 0; i < 10; i ++) {
        var div = document.createElement("DIV");
        div.id = "row"  + (i+1);
        div.className = "buttonrow";
    
        for (j = 0; j < 10; j ++) {
            var x = document.createElement("BUTTON");
            x.id = "button" + ((10 * i) + (j + 1))
            x.className = "target-button";
            x.setAttribute('onclick', "getButtonPress(\'" + x.id + "\')");
            x.innerHTML = "&nbsp";
            div.appendChild(x);
        }
        document.getElementById("button-container").appendChild(div);
    }
}


function getButtonPress(buttonID) {
    // console.log(`Button ${buttonID} pressed`);
    if (buttonID == targetButtonID) {
        document.getElementById(targetButtonID).innerHTML = "&nbsp";
        document.getElementById(targetButtonID).style.backgroundColor = "#adb5bd";
        elapsedTimeSeconds = (Date.now() - buttonSpawnTime)/1000;


        scoreChange = defScoreIncrement * ((allowedTime - Math.floor(elapsedTimeSeconds))/allowedTime);
        console.log((allowedTime - Math.floor(elapsedTimeSeconds))/allowedTime);
        if (scoreChange < 0) {
            scoreChange = 0;
        }
        console.log(scoreChange)
        score += scoreChange;
        
        spawnRequired = true;
        spawnTime = Date.now() + (Math.random()*5000);
    }
}



createButtons();
req = window.requestAnimationFrame(playGame);

function playGame() {

    if (ifStartGame) {
       if (score > 300) {
            allowedTime = 1.5;
        }
    
    
        if (spawnRequired) {
            if (Date.now() > spawnTime) {
                setTarget();
                spawnRequired = 0;
            }
        }
    
        elapsedTime = (Date.now() - buttonSpawnTime)/1000;
        remainingTime = allowedTime - Math.floor(elapsedTime);
        if (showTime) {
            if (!spawnRequired) {
                document.getElementById(targetButtonID).innerHTML = remainingTime;
            } else {
                document.getElementById(targetButtonID).innerHTML = "&nbsp";
            }
        }
        
        if ((elapsedTime > allowedTime) && !spawnRequired) {
            document.getElementById(targetButtonID).innerHTML = "&nbsp";
            // spawnRequired = true;
            gameOver = true;
            cancelAnimationFrame(req);
            endScreen();

        }
    
    
        if (!spawnRequired) {
            updateButtonColour(targetButtonID, elapsedTime);
        } else {
            document.getElementById(targetButtonID).style.backgroundColor = "#adb5bd";
        }
    
        document.getElementById("score").innerText = Math.round(score);
    }
    



    req = window.requestAnimationFrame(playGame);
}


function setTarget() {
    buttonNum = Math.floor(Math.random()* 100);
    buttonNum++;
    targetButtonID = "button" + buttonNum;
    document.getElementById(targetButtonID).style.backgroundColor = "rgba(32, 139, 58, 1)";
    buttonSpawnTime = Date.now();
    
}

function updateButtonColour(targetID, elapsedTime) {

    proportionDone = elapsedTime/allowedTime;
    if (proportionDone <= 1) {
        document.getElementById(targetID).style.backgroundColor = "rgba(32, 139, 58," + (1- proportionDone) + ")";
    } else {
        document.getElementById(targetID).style.backgroundColor = "#adb5bd";
    }

}


function startGame() {
    ifStartGame = true;
    document.getElementById("game-intro").style.display = "none";
}

function endScreen() {
    document.getElementById("button-container").style.display = "none";
    document.getElementById("endmessage").style.display = "block";
    document.getElementById("reload").style.display = "block";

}