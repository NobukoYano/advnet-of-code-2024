// @ts-check

/**
 * 
 * @param {number} num 
 * @return {number[]}
 */
const applyRules = (num) => {
    if (num === 0) {
        return [1];
    }
    const len = num.toString().length;
    if (len % 2 === 0) {
        // split into two
        const pre = Number(num.toString().slice(0, len/2));
        const post = Number(num.toString().slice(len/2));
        return [pre, post];
    } else {
        return [num * 2024];
    }
}

/**
 * day X - first
 * @param {Array<number>} input
 * @return {number}
 */
const calculate = (input) => {
    const result = [...input];
    for (let i = 0; i < 25; i++) {
        for (let j = 0; j < result.length; j++) {
            const changed = applyRules(result[j]);
            result.splice(j, 1, ...changed);
            if (changed.length > 1) {
                j++;
            }
        }
        // console.log("### result", i, result.join(" "));
    }
    
    return result.length;
};

// @ts-ignore
const fs = require("fs");
const file = fs.readFileSync("./day11/input.txt").toString('utf-8');
const input = file.split(" ").map((char) => Number(char));

const sampleFile = fs.readFileSync("./day11/sample.txt").toString('utf-8');
const sampleInput = sampleFile.split(" ").map((char) => Number(char));

console.log(calculate(input));
// console.log(calculate(sampleInput));
