// @ts-check

let count = 0;

/**
 * 
 * @param {number} num
 * @param {number} step
 */
const applyRules = (num, step) => {
    const len = num.toString().length;
    
    if (step === 74) {
        if (num === 0) {
            // console.log("###### last", step, ":", num);
            count++;
        } 
        
        else if (len % 2 === 0) {
            // console.log("###### last", step, ":", num);
            count += 2;
            
        } else {
            // console.log("###### last", step, ":", num);
            count++;
        }
        
    } else {
        if (num === 0) {
            applyRules(1, step + 1);
        }
        else if (len % 2 === 0) {
            // split into two
            const pre = Number(num.toString().slice(0, len / 2));
            applyRules(pre, step + 1);;
            const post = Number(num.toString().slice(len / 2));
            applyRules(post, step + 1);;

        } else {
            applyRules(num * 2024, step + 1);
        }
    }
}

/**
 * day X - first
 * @param {Array<number>} input
 * @return {number}
 */
const calculate = (input) => {
    
    for (let j = 0; j < input.length; j++) {
        applyRules(input[j], 0);
        }

    return count;
};



const fs = require("fs");
const file = fs.readFileSync("./day11/input.txt").toString('utf-8');
const input = file.split(" ").map((char) => Number(char));

const sampleFile = fs.readFileSync("./day11/sample.txt").toString('utf-8');
const sampleInput = sampleFile.split(" ").map((char) => Number(char));

console.log(calculate(input));
// console.log(calculate(sampleInput));
