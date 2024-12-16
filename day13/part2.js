// @ts-check
const algebra = require("algebra.js");
const math = require("mathjs");

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
            element.prize.x = element.prize.x + 10000000000000;
            element.prize.y = element.prize.y + 10000000000000;
            data.push({...element});
        }
    }
    return data;
}
const getGcd = (a, b) => {
    if (b === 0) {
        return a;
    }
    return getGcd(b, a % b);
}

const getLcm = (a, b) => {
    return Math.abs(a * b) / getGcd(a, b);
}

/**
 * 
 * @param {{buttonA: XY, buttonB: XY, prize: XY}} data 
 * @return {XY}
 */
const calculateToken = (data) => {
    const {buttonA, buttonB, prize} = data;

    // Define the coefficient matrix A
    const A = math.matrix([[buttonA.x, buttonB.x], [buttonA.y, buttonB.y]]);

    // Define the constant vector b
    const b = math.matrix([prize.x, prize.y]);

    // Solve the system Ax = b
    const solution = math.lusolve(A, b);

    // Extract x and y from the solution
    const x = Math.round(solution.get([0, 0]));
    const y = Math.round(solution.get([1, 0]));

    if (buttonA.x * x + buttonB.x * y === prize.x && buttonA.y * x + buttonB.y * y === prize.y) {
        return { x, y };        
    }
    return { x: 0, y: 0 };


    // ****************************************************

    // const targetSum1 = prize.x;
    // const targetSum2 = prize.y;

    // for (let x = 0; x < Number.MAX_SAFE_INTEGER; x++) {
    //     // Calculate y from the first equation
    //     const y1 = (targetSum1 - buttonA.x * x) / buttonB.x;

    //     // Check if y1 is a positive integer
    //     if (y1 >= 0 && Number.isInteger(y1)) {
    //         // Verify if this x and y1 satisfy the second equation
    //         if (buttonA.y * x + buttonB.y * y1 === targetSum2) {
    //             return { x, y: y1 };
    //         }
    //     }
    // }

    // return { x: 0, y: 0 };
    
    // ****************************************************

    // const equation1 = algebra.parse(`${buttonA.x} * x + ${buttonB.x} * y - ${prize.x}`);
    // const equation2 = algebra.parse(`${buttonA.y} * x + ${buttonB.y} * y - ${prize.y}`);

    // const eq = new algebra.Equation(equation1, equation2);
    // console.log("###", eq.toString());
    // const answerA = eq.solveFor("x");
    // const answerB = eq.solveFor("y");
    // // console.log("Button B count = " + answer.toString(), num1 / num2);
    // console.log("Check1 : ", i, data, answerA.toString(), answerB.toString());

    // ****************************************************

    // // solve the equation
    // // buttonA.x * i + buttonB.y * j = prize.x  --- first equation
    // // buttonA.y * i + buttonB.y * j = prize.y  --- second equation

    // // find a lest common multiple
    // const lcm = getLcm(buttonA.x, buttonA.y);
    // const multiplicator1 = lcm / buttonA.x;
    // const multiplicator2 = lcm / buttonA.y;
    
    // // multiplicator1(buttonA.x * i) + multiplicator1(buttonB.x * j) = multiplicator1 * prize.x  --- first equation
    // // multiplicator2(buttonA.y * i) + multiplicator2(buttonB.y * j) = multiplicator2 * prize.y  --- second equation
    // // multiplicator1(buttonB.x * j) - multiplicator2(buttonB.y * j) = multiplicator1 * prize.x - multiplicator2 * prize.y
    // const equation1 = algebra.parse(`${multiplicator1 * buttonB.x} * x - ${multiplicator2 * buttonB.y} * x `);
    // const equation2 = algebra.parse(`${multiplicator1 * prize.x} - ${multiplicator2 * prize.y}`);

    // const eq = new algebra.Equation(equation1, equation2);
    // console.log("###", eq.toString());
    // const answer = eq.solveFor("x");
    // const [num1, num2] = answer.toString().split("/");
    // // console.log("Button B count = " + answer.toString(), num1 / num2);
    // console.log("Check1 : ", i, data, num1 / num2);

    // if (num1 / num2 === Math.round(num1 / num2)) {
    //     const countButtonB = num1 / num2;
    //     const countButtonA = (prize.x - buttonB.x * countButtonB) / buttonA.x;
        

    //     if (countButtonA === Math.round(countButtonA)) {
    //         const xCalculation = countButtonA * buttonA.x + countButtonB * buttonB.x === prize.x;
    //         const yCalculation = countButtonA * buttonA.y + countButtonB * buttonB.y === prize.y;

    //         if (xCalculation && yCalculation && countButtonA >= 0 && countButtonB >= 0) {
    //             // console.log("Check: ", data, countButtonA, countButtonB,
    //             //     countButtonA * buttonA.x + countButtonB * buttonB.x === prize.x,
    //             //     countButtonA * buttonA.y + countButtonB * buttonB.y === prize.y);
    //             return countButtonA * 3 + countButtonB;

    //         }

    //     }

    // }

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
        const res = calculateToken(data[i])
        console.log("### i", i, data[i], res);
        token += res.x * 3 + res.y;
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
