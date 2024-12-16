// @ts-check

/**
 * @typedef {{x: number, y: number}} XY
 */


/**
 * 
 * @param {string} item 
 * @return {XY}
 */
const setXY = (item, removeChar) => {
    const xy = item.split(":")[1];
    const x = Number(xy.split(", ")[0].replace(`X${removeChar}`, ""));
    const y = Number(xy.split(", ")[1].replace(`Y${removeChar}`, ""));
    return {x, y};
}

/**
 * 
 * @param {Array<string>} input 
 * @return {Array<{buttonA: XY, buttonB: XY, prize: XY}>}
 */
const formatInput = (input) => {
    const data = [];
    /** @type {{buttonA: XY, buttonB: XY, prize: XY}} */
    const element = {};
    for (let i = 0; i < input.length; i++) {
        
        if (!input[i]) {
            continue;
        }
        if (input[i].startsWith("Button A")) {            
            element.buttonA = setXY(input[i], "+");
            continue;
        }
        if (input[i].startsWith("Button B")) {
            element.buttonB = setXY(input[i], "+");
            continue;
        }
        if (input[i].startsWith("Prize")) {
            element.prize = setXY(input[i], "=");
            data.push({...element});
        }
    }
    return data;
}
/**
 * 
 * @param {{buttonA: XY, buttonB: XY, prize: XY}} data 
 * @return {number}
 */
const calculateToken = (data) => {
    const {buttonA, buttonB, prize} = data;
    for (let i = 0; i * buttonA.x < prize.x; i++) {
        // X satisfies the equation
        if ((prize.x - (buttonA.x * i)) % buttonB.x === 0) {
            const j = (prize.x - (buttonA.x * i)) / buttonB.x;
            // check if Button B also satisfies the equation
            if (i * buttonA.y + j * buttonB.y === prize.y) {
                console.log("### i, j", i, j);
                return 3 * i + j;
            }
        }
    }
    return 0;
}

/**
 * day X - first
 * @param {Array<string>} input
 * @return {number}
 */
const calculate = (input) => {
    const data = formatInput(input);
    let token = 0
    for (let i = 0; i < data.length; i++) {
        token += calculateToken(data[i])
    }
    return token;
};



// @ts-ignore
const fs = require("fs");
const file = fs.readFileSync("./day13/input.txt").toString('utf-8');
const input = file.split("\n");

const sampleFile = fs.readFileSync("./day13/sample.txt").toString('utf-8');
const sampleInput = sampleFile.split("\n");

console.log(calculate(input));
// console.log(calculate(sampleInput));
