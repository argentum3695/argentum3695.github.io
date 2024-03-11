const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

keyslist = Object.keys(localStorage);
renderList = [];

makeEventBoxes();

setInterval(() => {
    keyslist = Object.keys(localStorage);
    updateRenderList();
    updateEventBoxes();


}, 1000);


function makeEventBoxes() {
    document.getElementById("eventboxcontainer").innerHTML = '';



    for (i = 0; i < keyslist.length; i++) {
        document.getElementById("eventboxcontainer").innerHTML += "<div class='eventbox'id='eventbox" + (i + 1) + "'><p id='datename" + (i + 1) + "' class='datename'></p><p id='days" + (i + 1) + "' class='days'></p><p class='dayslabel'>days</p><p id='eventdate" + (i + 1) + "' class='eventdate'></p></div>"
    }
}

function updateEventBoxes() {
    for (i = 0; i < keyslist.length; i++) {
        document.getElementById('datename' + (i + 1)).innerText = renderList[i].name;
        document.getElementById('days' + (i + 1)).innerText = renderList[i].daysleft;

        const printDate = new Date(renderList[i].enddate);
        // console.log(printDate.getDay())
        formattedDate = dayNames[printDate.getDay()] + ", " + monthNames[printDate.getMonth()] + " " + printDate.getDate() + " " + printDate.getFullYear();
        document.getElementById('eventdate' + (i + 1)).innerText = formattedDate;

    }
}

function updateRenderList() {
    const currDate = new Date();
    renderList = [];
    for (i = 0; i < keyslist.length; i++) {
        endDate = new Date(localStorage.getItem(keyslist[i]));
        dateDiff = Math.abs(currDate - endDate);
        dateDiffDays = Math.ceil((dateDiff / (1000 * 60 * 60 * 24)));

        renderList.push({ name: keyslist[i].replace('#', ' '), daysleft: dateDiffDays, enddate: endDate });


        // console.log(renderList);

        
    }
    renderList.sort(function (a, b) {
        return a.daysleft - b.daysleft;
    })
}




    function showDateMenu() {
        document.getElementById("newdatemenu").style.display = "inline";
        document.getElementById("shownewdatemenu").style.display = "none";
    }

    function hideDateMenu() {
        document.getElementById("newdatemenu").style.display = "none";
        document.getElementById("shownewdatemenu").style.display = "inline";
    }

    function addDate() {
        datename = prompt("add a date name: ");

        localStorage.setItem(datename.replace(" ", "#"), document.getElementById('datepicker').value);
        keyslist = Object.keys(localStorage);
        // console.log(keyslist)
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