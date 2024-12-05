
const format = (input) => {
    const rules = [];
    const updates = [];
    for (let i = 0; i < input.length; i++) {
        if (input[i].includes("|")) {
            rules.push(input[i].split("|").map((i)=>Number(i)));
            continue;
        }
        if (input[i].includes(",")) {
            updates.push(input[i].split(",").map((i)=>Number(i)));
            continue;
        }
    }
    
    return {rules, updates};
};

const isPostNumberBeforeSelf = (update, index, number) => {
    const preNumbers = update.slice(0, index);
    return preNumbers.includes(number);
}

const isPreNumberAfterSelf = (update, index, number) => {
    const postNumbers = update.slice(index + 1);
    return postNumbers.includes(number);
}

const filterUpdates = (rules, updates) => {
    const correctUpdates = [];
    for (let i = 0; i < updates.length; i++) {
        const update = updates[i];
        let isValid = true;
        for (let j = 0; j < update.length - 1; j++) {
            const foundRules = rules.filter((rule)=>rule.includes(update[j]));
            foundRules.forEach((rule)=>{
                const isPre = rule[0] === update[j];
                if (isPre && isPostNumberBeforeSelf(update, j, rule[1])) {
                    isValid = false;
                } else if (!isPre && isPreNumberAfterSelf(update, j, rule[0])) {
                    isValid = false;
                }
            })
        }
        if (isValid) {
            correctUpdates.push(update);
        }
    }
    return correctUpdates;
}

/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const calculate = (input) => {
    const {rules, updates} = format(input);
    const correctUpdates = filterUpdates(rules, updates);
    let sum = 0;
    for (let i = 0; i < correctUpdates.length; i++) {
        const midIndex = (correctUpdates[i].length - 1) / 2;
        sum += correctUpdates[i][midIndex];
    }
    return sum;
};



const fs = require("fs");
const file = fs.readFileSync("./day5/input.txt").toString('utf-8');
const input = file.split("\n");

const sampleFile = fs.readFileSync("./day5/sample.txt").toString('utf-8');
const sampleInput = sampleFile.split("\n");

console.log(calculate(input));
// console.log(calculate(sampleInput));
