// @ts-check

const isTop = ([x1, y1], [x2, y2]) => y1 === y2 - 1 && x1 === x2;

const isBottom = ([x1, y1], [x2, y2]) => y1 === y2 + 1 && x1 === x2;

const isRight = ([x1, y1], [x2, y2]) =>  x1 === x2 + 1 && y1 === y2;

const isLeft = ([x1, y1], [x2, y2]) => x1 === x2 - 1 && y1 === y2;

const isSameRegion = ([x1, y1], areas) => {
    
    for (let i = 0; i < areas.length; i++) {
        const [x2, y2] = areas[i];
        if (isTop([x1, y1], [x2, y2]) || isBottom([x1, y1], [x2, y2]) || isRight([x1, y1], [x2, y2]) || isLeft([x1, y1], [x2, y2])) {
            return true;
        }
    }
    return false;
};

/**
 * 
 * @param {Array<string[]>} input
 * @return {Array<{type: string, areas: Array<[number, number]>}>}
 */
const generateRegions = (input) => {
    /** @type {Array<{type: string, areas: Array<[number, number]>}>} */
    const plants = [];
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            const current = input[i][j];
            let firstSameRegionIndex = -1;

            for (let k = 0; k < plants.length; k++) {
                // check if the plant is in the same region
                const isSamePlant = plants[k].type === current;
                // first same region
                if (isSamePlant && isSameRegion([j, i], plants[k].areas) && firstSameRegionIndex === -1) {
                    firstSameRegionIndex = k;
                    plants[k].areas.push([j, i]);
                } 

                // second or more same region
                else if (isSamePlant && isSameRegion([j, i], plants[k].areas) && firstSameRegionIndex !== -1) {
                    // console.log("###", i, j, plants[k].areas);
                    // add the areas to the first same region
                    plants[firstSameRegionIndex].areas.push(...plants[k].areas);
                    // empty the areas of the second or more same region
                    plants.splice(k, 1);
                    k--;
                }
                
            }
            

            if (firstSameRegionIndex === -1) {
                plants.push({type: input[i][j], areas: [[j, i]]});
            }
        }
    }
    return plants;
};

const getCountPerimeter = (areas) => {
    let perimeter = 0;
    for (let i = 0; i < areas.length; i++) {
        const [x1, y1] = areas[i];
        if(!areas.find(([x2, y2]) => isTop([x1, y1], [x2, y2]))) {
            perimeter++;
        }
        if(!areas.find(([x2, y2]) => isBottom([x1, y1], [x2, y2]))) {
            perimeter++;
        }
        if (!areas.find(([x2, y2]) => isRight([x1, y1], [x2, y2]))) {
            perimeter++;
        }
        if (!areas.find(([x2, y2]) => isLeft([x1, y1], [x2, y2]))) {
            perimeter++;
        }
    }
    return perimeter;
}

const getCountSide = (areas) => {
    
};

/**
 * day X - first
 * @param {Array<string[]>} input
 * @return {number}
 */
const calculate = (input) => {
    const regions = generateRegions(input);
    const sum = regions.filter((region)=>region.areas.length).reduce((acc, region) => {
        const perimeter = getCountPerimeter(region.areas);
        // console.log("### region, perimeter", region, perimeter, region.areas.length * perimeter);
        return acc + (region.areas.length * perimeter);
    }, 0);
    return sum;
};



// @ts-ignore
const fs = require("fs");
const file = fs.readFileSync("./day12/input.txt").toString('utf-8');
const input = file.split("\n").map((row) => row.split(""));

const sampleFile = fs.readFileSync("./day12/sample.txt").toString('utf-8');
const sampleInput = sampleFile.split("\n").map((row) => row.split(""));

// console.log(calculate(input));
console.log(calculate(sampleInput));
