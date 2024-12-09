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

const getSpaces = (discBlocks) => {
    let startSpace = -1;
    let length = 0;
    const spaces = [];
    for (let i = 0; i < discBlocks.length; i++) {
        if (discBlocks[i] === "." ) {
            if (startSpace === -1) {
                startSpace = i;
            }
            length++;
        } else {
            if (startSpace !== -1) {
                spaces.push({start: startSpace, length});
                length = 0;
                startSpace = -1;
            }
        }
    }
    if (startSpace !== -1) {
        spaces.push({start: startSpace, length});
    }
    return spaces;
};

const reorganizeBlocks = (discBlocks, input) => {
    const reorganizedBlocks = [...discBlocks];
    for (let i = input.length - 1; i >= 0; i--) {
        if (i % 2 === 1) {
            // space block, nothing to do
            continue;
        } else {
            const firstBlockIndex = reorganizedBlocks.indexOf(i/2);
            const spaces = getSpaces(reorganizedBlocks);
            // console.log("### i, spaces", i, spaces);
            // check if there are spaces to fit the block
            const firstFitSpace= spaces.find((space) => space.length >= input[i] && space.start < firstBlockIndex);

            if (!firstFitSpace) {
                continue;
            } else {
                // remove the block
                reorganizedBlocks.splice(firstBlockIndex, input[i], ...Array(input[i]).fill("."));
                // console.log("### debug", i, firstBlockIndex, firstFitSpace.start, input[i], Array(input[i]).fill(i/2));
                // replace the block with spaces
                reorganizedBlocks.splice(firstFitSpace.start, input[i], ...Array(input[i]).fill(i/2));

            }

        }
        // console.log("### reorganizedBlocks", reorganizedBlocks.join(""));
    }
    return reorganizedBlocks;
};

const calculateChecksum = (discBlocks) => {
    let checksum = 0;
    for (let i = 0; i < discBlocks.length; i++) {
        if (discBlocks[i] === ".") {
            continue;
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
    console.log("### discBlocks", discBlocks.length, discBlocks);
    const reorganizedBlocks = reorganizeBlocks(discBlocks, input);
    console.log("### reorganizedBlocks", reorganizedBlocks);
    return calculateChecksum(reorganizedBlocks);
};



const fs = require("fs");
const { start } = require("repl");
const file = fs.readFileSync("./day9/input.txt").toString('utf-8');
const input = file.split("").map((char)=>Number(char));

const sampleFile = fs.readFileSync("./day9/sample.txt").toString('utf-8');
const sampleInput = sampleFile.split("").map((char)=>Number(char));

console.log(calculate(input));
// console.log(calculate(sampleInput));
