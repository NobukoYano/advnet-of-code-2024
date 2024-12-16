// @ts-check

/**
 * day X - first
 * @param {Array<string[]>} input
 * @return {number}
 */
const calculate = (input) => {
    
    return 0;
};



// @ts-ignore
const fs = require("fs");
const file = fs.readFileSync("./day12/input.txt").toString('utf-8');
const input = file.split("\n").map((row) => row.split(""));

const sampleFile = fs.readFileSync("./day12/sample.txt").toString('utf-8');
const sampleInput = sampleFile.split("\n").map((row) => row.split(""));

console.log(calculate(input));
// console.log(calculate(sampleInput));
