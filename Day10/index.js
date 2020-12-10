const fs = require("fs");

const adapters = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((n) => Number(n))
  .sort((a, b) => b - a);

const deviceMaxInputJoltage = adapters[0] + 3;

function connectAdapters(adapterList) {
  const mismatch = { 1: 0, 2: 0, 3: 0 };
  let adapterCopy = [deviceMaxInputJoltage, ...adapterList];
  let lastAdapter = 0;
  while (adapterCopy.length > 0) {
    let nextAdapter = adapterCopy.pop();
    if (nextAdapter - lastAdapter > 3) return null;
    mismatch[nextAdapter - lastAdapter]++;
    lastAdapter = nextAdapter;
  }
  // console.log(mismatch);
  return mismatch;
}

const mismatch = connectAdapters(adapters);

function letMeCountTheWays(adapterList) {
  let adapterCopy = [deviceMaxInputJoltage, ...adapterList, 0];

  // Calculate the difference between every adapter and put that in an array
  let differenceArray = [];
  for (let i = 0; i < adapterCopy.length; i++) {
    differenceArray.push(adapterCopy[i] - adapterCopy[i + 1]);
  }

  // Look for groups of a difference of one and count the ones in each group
  let consecutiveOnes = [];
  let last = null;
  for (let i = 0; i < differenceArray.length - 1; i++) {
    if (last === 1 && differenceArray[i] === 1)
      consecutiveOnes[consecutiveOnes.length - 1]++;
    else if (last !== 1 && differenceArray[i] === 1) consecutiveOnes.push(1);
    last = differenceArray[i];
  }

  // For each group of one, calculate the possible permutations for that group.
  let groupPermutations = consecutiveOnes.map((val) => {
    return 1 + (val * (val - 1)) / 2;
  });

  // Multiply the possible permutations of each group together to get the total permutations
  return groupPermutations.reduce((acc, cur) => acc * cur);
}

console.log(`Part 1 solution: ${mismatch[1] * mismatch[3]}`);
console.log(`Part 2 solution: ${letMeCountTheWays(adapters)}`);
