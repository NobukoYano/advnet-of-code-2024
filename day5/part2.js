
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

const check = (update, rules) => {
    let isValid = true;
    let selfIndex = -1;
    for (let j = 0; j < update.length - 1; j++) {
        const foundRules = rules.filter((rule)=>rule.includes(update[j]));
        for (let k = 0; k < foundRules.length; k++) {
            const isPre = foundRules[k][0] === update[j];
            if (isPre && isPostNumberBeforeSelf(update, j, foundRules[k][1])) {
                isValid = false;
                selfIndex = j;
                targetIndex = update.indexOf(foundRules[k][1]);
                break;
            } else if (!isPre && isPreNumberAfterSelf(update, j, foundRules[k][0])) {
                isValid = false;
                selfIndex = j;
                targetIndex = update.indexOf(foundRules[k][0]);
                break;
            }
        }
    }
    return {isValid, selfIndex, targetIndex};
}

const moveAfterSelf = (array, selfIndex, targetIndex, rules) => {
    const arrayCopy = [...array];
    // Remove the target element from its original position
    const targetElement = arrayCopy.splice(targetIndex, 1)[0];

    // Insert the target element after self
    arrayCopy.splice(selfIndex+1, 0, targetElement);

    const {isValid, selfIndex: selfIndexNew, targetIndex: targetIndexNew} = check(arrayCopy, rules);
    if (!isValid) {
        return selfIndex > targetIndex ? 
            moveAfterSelf(arrayCopy, selfIndexNew, targetIndexNew, rules) : 
            moveBeforeSelf(arrayCopy, selfIndexNew, targetIndexNew, rules);
    }
    // console.log("### A: arrayCopy", arrayCopy);
    return arrayCopy;
}; 

const moveBeforeSelf = (array, selfIndex, targetIndex, rules) => {
    const arrayCopy = [...array];
    // Remove the target element from its original position
    const targetElement = arrayCopy.splice(targetIndex, 1)[0];

    // Insert the target element after self
    arrayCopy.splice(selfIndex, 0, targetElement);
    // console.log("### B-pre: arrayCopy", arrayCopy);
    const {isValid, selfIndex: selfIndexNew, targetIndex: targetIndexNew} = check(arrayCopy, rules);
    if (!isValid) {
        return selfIndexNew > targetIndexNew ? 
            moveAfterSelf(arrayCopy, selfIndexNew, targetIndexNew, rules) : 
            moveBeforeSelf(arrayCopy, selfIndexNew, targetIndexNew, rules);
    }
    // console.log("### B: arrayCopy", arrayCopy);
    return arrayCopy;
}; 

const filterUpdates = (rules, updates) => {
    const correctUpdates = [];
    const modifiedUpdates = [];
    for (let i = 0; i < updates.length; i++) {
        const update = updates[i];
        let isValid = true;
        for (let j = 0; j < update.length - 1; j++) {
            const foundRules = rules.filter((rule)=>rule.includes(update[j]));
            for (let k = 0; k < foundRules.length; k++) {
                const isPre = foundRules[k][0] === update[j];
                if (isPre && isPostNumberBeforeSelf(update, j, foundRules[k][1])) {
                    isValid = false;
                    console.log("#### 1:", update, j, foundRules[k]);
                    const modifiedUpdate = moveAfterSelf(update, j, update.indexOf(foundRules[k][0]), rules);
                    modifiedUpdates.push(modifiedUpdate);
                    break;
                } else if (!isPre && isPreNumberAfterSelf(update, j, foundRules[k][0])) {
                    isValid = false;
                    console.log("#### 2:", update, j, foundRules[k]);
                    const modifiedUpdate = moveBeforeSelf(update, j, update.indexOf(foundRules[k][1]), rules);
                    modifiedUpdates.push(modifiedUpdate);
                    break;
                }
            }
            if (!isValid) {
                break;
            }
        }
        if (isValid) {
            correctUpdates.push(update);
        }
    }
    // console.log("### modifiedUpdates", modifiedUpdates);
    return modifiedUpdates;
}

/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const calculate = (input) => {
    const {rules, updates} = format(input);
    const modifiedUpdates = filterUpdates(rules, updates);
    let sum = 0;
    for (let i = 0; i < modifiedUpdates.length; i++) {
        const midIndex = (modifiedUpdates[i].length - 1) / 2;
        sum += modifiedUpdates[i][midIndex];
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
