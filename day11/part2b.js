// @ts-check

const lastItems = {};
/**
 * @param {number} num
 * @returns {number}
 */
const applyRules = (num) => {
    let stack = [[num, 0]];
    let result = 0;

    while (stack.length > 0) {
        // @ts-ignore
        let [currentNum, step] = stack.pop();

        if (step === 40) {
            if (lastItems[currentNum] !== undefined) {
                lastItems[currentNum] += 1;
            } else {
                lastItems[currentNum] = 1;
            }
            const len = currentNum.toString().length;
            result += (currentNum === 0 || len % 2 !== 0) ? 1 : 2;
            continue;
        }

        const len = currentNum.toString().length;

        if (currentNum === 0) {
            stack.push([1, step + 1]);
        } else if (len % 2 === 0) {
            const pre = Number(currentNum.toString().slice(0, len / 2));
            const post = Number(currentNum.toString().slice(len / 2));
            stack.push([post, step + 1]);
            stack.push([pre, step + 1]);
        } else {
            stack.push([currentNum * 2024, step + 1]);
        }
    }

    return result;
}

/**
 * day X - first
 * @param {Array<number>} input
 * @return {number}
 */
const calculate = (input) => {
    return input.reduce((sum, num) => sum + applyRules(num), 0);
};


// Test the function
const input = [1];
// 814, 1183689, 0, 1, 766231, 4091, 93836, 46
console.log(calculate(input));
