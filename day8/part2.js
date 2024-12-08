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
            
            let step1 = 1;
            const antinode1 = {x: x1 + ((x1 - x2)*step1), y: y1 + ((y1 - y2)*step1)};
            while (antinode1.x >= 0 && antinode1.x < xWidth && antinode1.y >= 0 && antinode1.y < yWidth) {
                antinodes.push({...antinode1});
                step1++;
                antinode1.x = x1 + ((x1 - x2)*step1);
                antinode1.y = y1 + ((y1 - y2)*step1);
            }

            let step2 = 1;
            const antinode2 = {x: x2 + ((x2 - x1)*step2), y: y2 + ((y2 - y1)*step2)};
            while (antinode2.x >= 0 && antinode2.x < xWidth && antinode2.y >= 0 && antinode2.y < yWidth) {
                antinodes.push({...antinode2});
                step2++;
                antinode2.x = x2 + ((x2 - x1)*step2);
                antinode2.y = y2 + ((y2 - y1)*step2);
            }

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
    const frequenciesFlat = [];
    Object.keys(frequencies).map((key)=>{
        frequenciesFlat.push(...frequencies[key]);
    });
    const antinodesFlatUnique = [...new Set(antinodes.flat().concat(frequenciesFlat).sort((a, b)=> a.y - b.y || a.x - b.x).map((antinode)=>`${antinode.x},${antinode.y}`))];

    console.log("### antinodesFlatUnique", antinodesFlatUnique);
    return antinodesFlatUnique.length;
};



const fs = require("fs");
const file = fs.readFileSync("./day8/input.txt").toString('utf-8');
const input = file.split("\n").map((row)=>row.split(""));

const sampleFile = fs.readFileSync("./day8/sample.txt").toString('utf-8');
const sampleInput = sampleFile.split("\n").map((row)=>row.split(""));

console.log(calculate(input));
// console.log(calculate(sampleInput));
