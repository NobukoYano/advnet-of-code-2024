// @ts-check

/**
 * 
 * @param {Array<{x: number, y: number}>} frequency 
 * @param {number} xWidth 
 * @param {number} yWidth 
 */
const getAntinodes = (frequency, xWidth, yWidth) => {
    const antinodes = [];
    for (let i = 0; i < frequency.length; i++) {
        for (let j = i+1; j < frequency.length; j++) {
            const x1 = frequency[i].x;
            const y1 = frequency[i].y;
            const x2 = frequency[j].x;
            const y2 = frequency[j].y;
            
            const antinode1 = {x: x1 + (x1 - x2), y: y1 + (y1 - y2)};
            const antinode2 = {x: x2 + (x2 - x1), y: y2 + (y2 - y1)};
            [antinode1, antinode2].forEach((antinode)=>{
                if (antinode.x >= 0 && antinode.x < xWidth && antinode.y >= 0 && antinode.y < yWidth) {
                    antinodes.push(antinode);
                }
            })

        }
    }
    return antinodes;
}

/**
 * 
 * @param {Array<string[]>} matrix
 * @return {Object<string, Array<{x: number, y: number}>>|{}} 
 */
const getFrequencies = (matrix) => {
    const frequencies = {};
    for (let i = 0; i < matrix.length; i++) {
        const row = matrix[i];
        for (let j = 0; j < row.length; j++) {
            if (row[j] !== ".") {
                if (!frequencies[row[j]]) {
                    frequencies[row[j]] = [];
                }
                frequencies[row[j]].push({x: j, y: i});
            }
        }
    }
    console.log("### A frequencies", frequencies);
    return frequencies;
}

/**
 * day X - first
 * @param {Array<string[]>} matrix
 * @return {number}
 */
const calculate = (matrix) => {
    const frequencies = getFrequencies(matrix);
    const xWidth = matrix[0].length;
    const yWidth = matrix.length;
    const antinodes = Object.keys(frequencies).map((key)=>{
        const frequency = frequencies[key];
        return getAntinodes(frequency, xWidth, yWidth);
    });
    const antinodesFlatUnique = [...new Set(antinodes.flat().map((antinode)=>`${antinode.x},${antinode.y}`))];

    console.log("### antinodesFlatUnique", antinodesFlatUnique);
    return antinodesFlatUnique.length;
};



const fs = require("fs");
const { get } = require("http");
const file = fs.readFileSync("./day8/input.txt").toString('utf-8');
const input = file.split("\n").map((row)=>row.split(""));

const sampleFile = fs.readFileSync("./day8/sample.txt").toString('utf-8');
const sampleInput = sampleFile.split("\n").map((row)=>row.split(""));

console.log(calculate(input));
// console.log(calculate(sampleInput));
