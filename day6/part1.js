// @ts-check

const findCurrent = (matrix) => {
    const current = {x: -1, y: -1, direction: "right"};
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === "^") {
                return {x: j, y: i, direction: "up"};
            }
            if (matrix[i][j] === ">") {
                return {x: j, y: i, direction: "right"};
            }
            if (matrix[i][j] === "<") {
                return {x: j, y: i, direction: "left"};
            }
            if (matrix[i][j] === "v") {
                return {x: j, y: i, direction: "down"};
            }
        }
    }
    return current;
}

const move = (matrix, current) => {
    const matrixCopy = matrix.map((i)=>[...i]);
    while (current.x >= 0 && current.x < matrixCopy[0].length && current.y >= 0 && current.y < matrixCopy.length) {
        if (current.direction === "up") {
            if ((current.y - 1) < 0) return matrixCopy;
            if (matrixCopy[current.y - 1] && matrixCopy[current.y - 1][current.x] !== "#") {
                matrixCopy[current.y - 1][current.x] = "X";
                current.y -= 1;
            } else {
                current.direction = "right";
            }
        } else if (current.direction === "right") {
            if ((current.x + 1) >= matrixCopy[0].length) return matrixCopy;
            if (matrixCopy[current.y][current.x + 1] !== "#") {
                matrixCopy[current.y][current.x + 1] = "X";
                current.x += 1;
            } else {
                current.direction = "down";
            }
        } else if (current.direction === "down") {
            if ((current.y + 1) >= matrixCopy.length) return matrixCopy;
            if ( matrixCopy[current.y + 1][current.x] !== "#") {
                matrixCopy[current.y + 1][current.x] = "X";
                current.y += 1;
            } else {
                current.direction = "left";
            }
        } else if (current.direction === "left") {
            if ((current.x - 1) < 0) return matrixCopy;
            if (matrixCopy[current.y][current.x - 1] !== "#") {
                matrixCopy[current.y][current.x - 1] = "X";
                current.x -= 1;
            } else {
                current.direction = "up";
            }
        }
    }
    return matrixCopy;
};

/**
 * day X - first
 * @param {Array<string[]>} matrix
 * @return {number}
 */
const calculate = (matrix) => {
    const current = findCurrent(matrix);
    const matrixMoved = move(matrix, current);
    // console.log("### matrixMoved", matrixMoved);
    let count = 0;
    for (let i = 0; i < matrixMoved.length; i++) {
        const moved = matrixMoved[i].filter((i)=>i === "X").length;
        count += moved;
    }
    return count;
};



const fs = require("fs");
const file = fs.readFileSync("./day6/input.txt").toString('utf-8');
const input = file.split("\n").map((i)=>i.split(""));

const sampleFile = fs.readFileSync("./day6/sample.txt").toString('utf-8');
const sampleInput = sampleFile.split("\n").map((i)=>i.split(""));

console.log(calculate(input));
// console.log(calculate(sampleInput));
