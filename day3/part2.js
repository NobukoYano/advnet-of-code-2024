
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
    const muls = array.filter((chars)=>chars.includes(")")).map((i) => {
        const [a, ...b] = i.split(")");
        return [a, b.join(")")];
    });
    let res = 0;
    let isEnabled = true;
    for (let i = 0; i < muls.length; i++) {

        // check the multiply function
        if (isEnabled && validateFormat(muls[i][0])) {
            const [a, b] = muls[i][0].split(",");
            res += a * b;
        }
        // check do or don't function
        const doFuncIndex = muls[i][1].lastIndexOf("do()");
        const dontFuncIndex = muls[i][1].lastIndexOf("don't()");

        if (isEnabled && doFuncIndex < dontFuncIndex) {
            isEnabled = false;
        }

        if (!isEnabled && doFuncIndex > dontFuncIndex) {
            isEnabled = true;
        }

    }
    
    return res;
};



const fs = require("fs");
const file = fs.readFileSync("./day3/input.txt").toString('utf-8');

const sampleFile = fs.readFileSync("./day3/sample2.txt").toString('utf-8');


console.log(calculate(sampleFile));
console.log(calculate(file));
