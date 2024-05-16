var target = 200;

var customE =  2.718281828459045235360287471352662497757247093699959574966

repetitions = parseInt(prompt('Choose a number of repetitions (the higher the number, the more accurate the result: '));
function distance(time) {
    res = 80 * (time + 8*(customE ** ((-1/8)*time))) -640;
    return res;
}

startTime = Date.now();

increment = 1;
var testval = 0;
for (i = 0; i<repetitions; i++) {


    if (distance(testval) < target) {
        while (distance(testval) < target) {
            testval += increment;
        }
    } else if (distance(testval) > target) {
        while(distance(testval) > target) {
            testval -= increment;
        }
    }

    console.log(testval);

    increment = increment/2;

}

endTime = Date.now();

timeDiff = endTime - startTime;


targetError = (Math.abs(distance(testval)-target)/target) * 100;
console.log(`Final value: ${testval}, with a result of ${distance(testval)} (Error: ${targetError}%)`);
document.write(`Final value: ${testval}, with a result of ${distance(testval)} (Error: ${targetError}%) </br> Operation took ${timeDiff} ms`);