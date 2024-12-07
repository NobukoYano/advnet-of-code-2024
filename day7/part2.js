// @ts-check

const calc = (a, b, operator) => {
    if (operator === "+") {
        return a + b;
    }
    if (operator === "*") {
        return a * b;
    }

    if (operator === "||") {
        return Number(a.toString() + b.toString());
    }

    return 0;
}

const allcalcs = (numbers, operators) => {
    let result = numbers[0];
    for (let i = 0; i < numbers.length - 1; i++) {
        result = calc(result, numbers[i + 1], operators[i]);
    }
    return result;
}

const getOperatorCombinations = (elements, length) => {
    if (length === 0) return [[]];
  
  const combinations = [];

  for (let i = 0; i < elements.length; i++) {
    const subCombinations = getOperatorCombinations(elements, length - 1);
    for (const subCombo of subCombinations) {
      combinations.push([elements[i], ...subCombo]);
    }
  }

  return combinations;
};

/**
 * day X - first
 * @param {Array<string>} input
 * @return {number}
 */
const calculate = (input) => {
    const formatted = input.map((row)=>row.split(": ")).map((row)=>[Number(row[0]), [...row[1].split(" ").map((n)=>Number(n))]]);

    const calibration = [];
    for (let i = 0; i < formatted.length; i++) {
        // @ts-ignore
        const /** @type [number, number[]] */ [result, numbers] = formatted[i];
        const combis = getOperatorCombinations(["*", "+", "||"], numbers.length - 1);
        for (let j = 0; j < combis.length; j++) {
            const combi = combis[j];
            // calculate
            if (allcalcs(numbers, combi) === result) {
                calibration.push(result);
                break;
            }
        }

    }
    console.log("### calibration", calibration);
    return calibration.reduce((acc, curr)=>acc+curr, 0);
};



const fs = require("fs");
const { get } = require("http");
const file = fs.readFileSync("./day7/input.txt").toString('utf-8');
const input = file.split("\n");

const sampleFile = fs.readFileSync("./day7/sample.txt").toString('utf-8');
const sampleInput = sampleFile.split("\n");

console.log(calculate(input));
// console.log(calculate(sampleInput));
