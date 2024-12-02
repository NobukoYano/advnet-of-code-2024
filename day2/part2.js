
function omitIndexInPlace(arr, index) {
    const arrayCopy = [...arr];
  if (index >= 0 && index < arrayCopy.length) {
    arrayCopy.splice(index, 1);
  }
  return arrayCopy;
}

const check = (array) => {
    const order = array[0] < array[array.length - 1] ? "asc" : "desc";
    let isSafe = true;
    for (let k = 0; k < array.length - 1; k++) {
        const diff = order === "asc" ? array[k+1] - array[k] : array[k] - array[k+1];
        if (diff < 1 || diff > 3) {
            isSafe = false;
            break;
        }
    }
    return isSafe;
}

/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const calculate = (input) => {
    const array = input.map((i)=>i.split(" ").map((i)=>Number(i)));
    let count = 0;
    for (let i = 0; i < array.length; i++) {

        const order = array[i][0] < array[i][array[i].length - 1] ? "asc" : "desc";
        let isSafe = true;
        for (let j = 0; j < array[i].length - 1; j++) {
            const diff = order === "asc" ? array[i][j+1] - array[i][j] : array[i][j] - array[i][j+1];
            if (diff < 1 || diff > 3) {
                // Check if omitting any element makes it safe
                let isSafeAfterOmit = false;
                for (let k = 0; k < array[i].length; k++) {
                    if(check(omitIndexInPlace(array[i], k))) {
                        isSafeAfterOmit = true;
                        break;
                    }
                }
                if (!isSafeAfterOmit) {
                    isSafe = false;
                    break;
                }

            }
        }
        if (isSafe) {
            count++;
        }
    }

    return count;
};



const fs = require("fs");
const file = fs.readFileSync("./day2/input.txt").toString('utf-8');
const input = file.split("\n")

const sampleFile = fs.readFileSync("./day2/sample.txt").toString('utf-8');
const sampleInput = sampleFile.split("\n");


console.log(calculate(sampleInput));
console.log(calculate(input));
