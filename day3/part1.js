
function validateFormat(str) {
    const regex = /^\d{1,3},\d{1,3}$/;
    return regex.test(str);
}

/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const calculate = (input) => {
    const array = input.split("mul(");
    const muls = array.map((i) => i.split(")")[0]);
    
    let res = 0;
    for (let i = 0; i < muls.length; i++) {
        // check only
        if (validateFormat(muls[i])) {
            const [a, b] = muls[i].split(",");
            res += a * b;
        }
    }
    
    return res;
};



const fs = require("fs");
const file = fs.readFileSync("./day3/input.txt").toString('utf-8');

const sampleFile = fs.readFileSync("./day3/sample.txt").toString('utf-8');


console.log(calculate(sampleFile));
console.log(calculate(file));
