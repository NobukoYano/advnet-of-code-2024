
const checkHorizontal = (input, isReverse) => {
    let count = 0;
    // check horizontal: left to right
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length - 3; j++) {
            const word = input[i].slice(j, j+4).join("");
            if (word === "XMAS") {
                count++;
            }
        }
    }
    return count;
};

const checkVertical = (input, isReverse) => {
    let count = 0;
    // check vertical: top to bottom
    for (let i = 0; i < input.length - 3; i++) {
        for (let j = 0; j < input[i].length; j++) {
            const word = input[i][j] + input[i+1][j] + input[i+2][j] + input[i+3][j];
            if (word === "XMAS") {
                count++;
            }
        }
    }
    return count;
}

const checkDiagonalTopLeft = (input, isReverse) => {
    let count = 0;
    // check diagonal: top left to bottom right
    for (let i = 0; i < input.length - 3; i++) {
        for (let j = 0; j < input[i].length - 3; j++) {
            const word = input[i][j] + input[i+1][j+1] + input[i+2][j+2] + input[i+3][j+3];
            if (word === "XMAS") {
                count++;
            }
        }
    }
    return count;
}

const checkDiagonalTopRight = (input, isReverse) => {
    let count = 0;
    // check diagonal: top right to bottom left
    for (let i = 0; i < input.length - 3; i++) {
        for (let j = 3; j < input[i].length; j++) {
            const word = input[i][j] + input[i+1][j-1] + input[i+2][j-2] + input[i+3][j-3];
            if (word === "XMAS") {
                count++;
            }
        }
    }
    return count;
}

/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const calculate = (input) => {
    let count = 0;
    const reverseInput = JSON.parse(JSON.stringify(input)).reverse().map((i)=>i.reverse());
    // check horizontal: left to right
    count += checkHorizontal(input, false);
    count += checkHorizontal(reverseInput, true);

    // check vertical: top to bottom
    count += checkVertical(input, false);
    count += checkVertical(reverseInput, true);

    // check diagonal: top left to bottom right
    count += checkDiagonalTopLeft(input, false);
    count += checkDiagonalTopLeft(reverseInput, true);

    // check diagonal: top right to bottom left
    count += checkDiagonalTopRight(input, false);
    count += checkDiagonalTopRight(reverseInput, true);

    return count;
};



const fs = require("fs");
const file = fs.readFileSync("./day4/input.txt").toString('utf-8');
const input = file.split("\n").map((i)=>i.split(""));

const sampleFile = fs.readFileSync("./day4/sample.txt").toString('utf-8');
const sampleInput = sampleFile.split("\n").map((i)=>i.split(""));

console.log(calculate(input));
// console.log(calculate(sampleInput));
