piString = Math.PI.toString()

longPi = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091" 

setInterval(() => {
    answer = document.getElementById("inputfield").value;
    if (!(answer === longPi.slice(0, answer.length))) {
        document.getElementById("inputfield").style.color = "#C51E3A"
    } else {
        document.getElementById("inputfield").style.color = "#50C878"
    }

}, 100);
