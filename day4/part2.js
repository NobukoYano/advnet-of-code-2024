
const checkXmas = ([[a, b, c], [d, e, f], [g, h, i]]) => {
    // return how many times the xmas pattern is found
    if (e !== "A") {
        return 0;
    }
    
    let count = 0;
    if (a === "M" && g === "M" && c === "S" && i === "S") {
        return 1;
    }

    if (a === "M" && c === "M" && g === "S" && i === "S") {
        return 1;
    }

    if (c === "M" && i === "M" && a === "S" && g === "S") {
        return 1;
    }

    if (g === "M" && i === "M" && a === "S" && c === "S") {
        return 1;
    }
    return 0;
}

/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const calculate = (input) => {
    let count = 0;

    for (let i = 1; i < input.length - 1; i++) {
        for(let j = 1; j < input[i].length - 1; j++) {
            const xmas = [
                [input[i-1][j-1], input[i-1][j], input[i-1][j+1]],
                [input[i][j-1], input[i][j], input[i][j+1]],
                [input[i+1][j-1], input[i+1][j], input[i+1][j+1]]
            ];
            count += checkXmas(xmas);
        }
    }

    return count;
};



const fs = require("fs");
const file = fs.readFileSync("./day4/input.txt").toString('utf-8');
const input = file.split("\n").map((i)=>i.split(""));

const sampleFile = fs.readFileSync("./day4/sample2.txt").toString('utf-8');
const sampleInput = sampleFile.split("\n").map((i)=>i.split(""));

console.log(calculate(input));
// console.log(calculate(sampleInput));
