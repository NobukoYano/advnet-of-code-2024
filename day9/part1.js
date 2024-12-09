// @ts-check

const generateDiscBlockes = (input) => {
    const discBlocks = [];
    for (let i = 0; i < input.length; i++) {
        const num = input[i];
        for (let j = 0; j < num; j++) {
            if (i%2 === 1) {
                discBlocks.push(".");
            } else {
                discBlocks.push(i/2);
            }
        }
    }
    return discBlocks;
};

const isSpaceSorted = (discBlocks) => {
    const splitSpaces = discBlocks.join("").split(".");
    const [_, ...rest] = splitSpaces;
    return rest.every((char) => char === "");
};

const reorganizeBlocks = (discBlocks) => {
    const reorganizedBlocks = [...discBlocks];
    for (let i = discBlocks.length - 1; i >= 0; i--) {
        if (discBlocks[i] === ".") {
            continue;
        } else {
            const firstSpaceIndex = reorganizedBlocks.indexOf(".");
            reorganizedBlocks.splice(i, 1);
            reorganizedBlocks.splice(firstSpaceIndex, 1, discBlocks[i]);
        }
        // console.log("### reorganizedBlocks", reorganizedBlocks.join(""));
        if (isSpaceSorted(reorganizedBlocks)) {
            break;
        }
    }
    return reorganizedBlocks;
};

const calculateChecksum = (discBlocks) => {
    let checksum = 0;
    for (let i = 0; i < discBlocks.length; i++) {
        if (discBlocks[i] === ".") {
            break;
        } else {
            checksum += discBlocks[i] * i;
        }
    }
    return checksum;
};

/**
 * day X - first
 * @param {Array<number>} input
 * @return {number}
 */
const calculate = (input) => {
    // generate file mapping
    const discBlocks = generateDiscBlockes(input);
    console.log("### discBlocks", discBlocks);
    const reorganizedBlocks = reorganizeBlocks(discBlocks);
    console.log("### reorganizedBlocks", reorganizedBlocks);
    return calculateChecksum(reorganizedBlocks);
};



const fs = require("fs");
const file = fs.readFileSync("./day9/input.txt").toString('utf-8');
const input = file.split("").map((char)=>Number(char));

const sampleFile = fs.readFileSync("./day9/sample.txt").toString('utf-8');
const sampleInput = sampleFile.split("").map((char)=>Number(char));

console.log(calculate(input));
// console.log(calculate(sampleInput));
