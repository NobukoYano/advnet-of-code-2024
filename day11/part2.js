// @ts-check

/**
 * @param {number} num
 * @param {number} step
 * @returns {number}
 */
const applyRules = (num, step) => {
    if (step === 74) {
        const len = num.toString().length;
        return (num === 0 || len % 2 !== 0) ? 1 : 2;
    }

    const len = num.toString().length;

    if (num === 0) {
        return applyRules(1, step + 1);
    } else if (len % 2 === 0) {
        const pre = Number(num.toString().slice(0, len / 2));
        const post = Number(num.toString().slice(len / 2));
        return applyRules(pre, step + 1) + applyRules(post, step + 1);
    } else {
        return applyRules(num * 2024, step + 1);
    }
}

/**
 * day X - first
 * @param {Array<number>} input
 * @return {number}
 */
const calculate = (input) => {
    let count = 0;
    for (let j = 0; j < input.length; j++) {
        count += applyRules(input[j], 0);
    }
    return count;
};

// @ts-ignore
const fs = require("fs");
const file = fs.readFileSync("./day11/input.txt").toString('utf-8');
const input = file.split(" ").map((char) => Number(char));

const sampleFile = fs.readFileSync("./day11/sample.txt").toString('utf-8');
const sampleInput = sampleFile.split(" ").map((char) => Number(char));

console.log(calculate(input));
// console.log(calculate(sampleInput));
