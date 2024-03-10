// if (!localStorage.testvar) {
//     localStorage.setItem('testvar', 1);
// } else {
//     localStorage.testvar = Number(localStorage.testvar) + 1;
// }

// document.getElementById("test").innerHTML = localStorage.getItem("testvar");

// userDate = prompt("Set a date: ");
// localStorage.setItem('date1', userDate);

keyslist = Object.keys(localStorage);
// console.log(keyslist);

makeEventBoxes();

setInterval(() => {
    keyslist = Object.keys(localStorage);
    updateEventBoxes();

    
}, 1000); 


function makeEventBoxes() {
    document.getElementById("eventboxcontainer").innerHTML = '';

    

    for (i = 0; i<keyslist.length; i++) {
        document.getElementById("eventboxcontainer").innerHTML += "<div class='eventbox'id='eventbox" + (i+1) + "'><p id='datename"+ (i+1) + "' class='datename'></p><p id='days" + (i+1) + "' class='days'></p><p class='dayslabel'>days</p></div>"
    }
}

function updateEventBoxes() {
    const currDate = new Date();
    for (i = 0; i<keyslist.length; i++) {
        endDate = new Date(localStorage.getItem(keyslist[i]));
        // console.log(localStorage.getItem(keyslist[i]));
        dateDiff = Math.abs(currDate - endDate);
        dateDiffDays = Math.ceil((dateDiff / (1000 * 60 * 60 * 24)));

        document.getElementById('datename' + (i + 1)).innerText = keyslist[i].replace('#', ' ');
        document.getElementById('days' + (i + 1)).innerText = dateDiffDays;
}
}






// function printdate() {
//     console.log(document.getElementById("birthday").value);
//     testDate = new Date(document.getElementById("birthday").value);
//     console.log(testDate);
// }




function showDateMenu() {
    document.getElementById("newdatemenu").style.display = "inline";
}

function hideDateMenu() {
    document.getElementById("newdatemenu").style.display = "none";
}

function addDate() {
    datename = prompt("add a date name: ");
    
    localStorage.setItem(datename.replace(" ", "#"), document.getElementById('datepicker').value);
    keyslist = Object.keys(localStorage);
    console.log(keyslist)
    makeEventBoxes();
    hideDateMenu();
}

function removeDates() {
    localStorage.clear();
    keyslist = Object.keys(localStorage);
    makeEventBoxes();
}


var modal = document.getElementById("modal");
var button = document.getElementById("settingsbutton");
var span = document.getElementsByClassName("close")[0];


button.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}