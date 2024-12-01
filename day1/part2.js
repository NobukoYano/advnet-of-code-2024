/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const calculateSample = (input) => {
    const twoDArray = input.map((i)=>i.split("  "));
    const left = twoDArray.map((i)=>Number(i[0]));
    const right = twoDArray.map((i)=>Number(i[1]));

    let similarityScore = 0;
    for (let i = 0; i < left.length; i++) {
        const len = right.filter(r=>r===left[i]).length;
        ;
        similarityScore += left[i] * len;
    }

    return similarityScore;
};


const fs = require("fs");
const file = fs.readFileSync("./day1/input.txt").toString('utf-8');
const input = file.split("\n")

const sampleFile = fs.readFileSync("./day1/sample.txt").toString('utf-8');
const sampleInput = sampleFile.split("\n");


console.log(calculateSample(sampleInput));
console.log(calculateSample(input));
