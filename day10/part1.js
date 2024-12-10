// @ts-check
let sum = 0
const result = [];

const findTrailHeads = (input) => {
    const trailHeads = [];
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (input[i][j] === 0) {
                trailHeads.push([i, j]);
            }
        }
    }
    return trailHeads;
};

const findNext = (input, next, routes) => {
    if (next[0] >= 0 && next[0] < input.length && next[1] >= 0 && next[1] < input[0].length) {
        if (input[next[0]][next[1]] === routes.length) {
            const newRoutes = [...routes, next];
            if (newRoutes.length === 10) {
                // console.log("### reached:", newRoutes, newRoutes.map((route) => input[route[0]][route[1]]).join(""));
                sum++;
                result.push(routes[0].join("") + next.join(""));
            } else {
                // top
                const top = [next[0] - 1, next[1]];
                findNext(input, top, newRoutes);

                // right
                const right = [next[0], next[1] + 1];

                findNext(input, right, newRoutes);

                // bottom
                const bottom = [next[0] + 1, next[1]];
                findNext(input, bottom, newRoutes);

                // left
                const left = [next[0], next[1] - 1];
                findNext(input, left, newRoutes);
            }
        }
    }
};


/**
 * day X - first
 * @param {Array<number[]>} input
 * @return {number}
 */
const calculate = (input) => {
    const trailHeads = findTrailHeads(input);
    console.log("### trailHeads", trailHeads);
    trailHeads.forEach((trailHead) => {
        const routes = [trailHead];
        // top
        const top = [trailHead[0] - 1, trailHead[1]];
        findNext(input, top, routes);

        // right
        const right = [trailHead[0], trailHead[1] + 1];
        findNext(input, right, routes);

        // bottom
        const bottom = [trailHead[0] + 1, trailHead[1]];
        findNext(input, bottom, routes);

        // left
        const left = [trailHead[0], trailHead[1] - 1];
        findNext(input, left, routes);
    });
    console.log("### result", result.sort());
    return [...new Set(result)].length;
};



const fs = require("fs");
const file = fs.readFileSync("./day10/input.txt").toString('utf-8');
const input = file.split("\n").map((row) => row.split("").map((char) => Number(char)));

const sampleFile = fs.readFileSync("./day10/sample.txt").toString('utf-8');
const sampleInput = sampleFile.split("\n").map((row) => row.split("").map((char) => Number(char)));

console.log(calculate(input));
// console.log(calculate(sampleInput));
