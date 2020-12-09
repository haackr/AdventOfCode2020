const fs = require("fs");

const numberList = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((number) => Number(number));

function isValidNumber(number, list) {
  // console.log(list.length);
  for (let i = 0; i < list.length - 1; i++) {
    for (let j = 1; j < list.length; j++) {
      const x = list[i];
      const y = list[j];
      // console.log(x, y, x + y);
      if (x + y === number) return true;
    }
  }
  return false;
}

function findFirstInvalidNumber(numberList, preambleSize) {
  for (let i = preambleSize; i < numberList.length; i++) {
    const number = numberList[i];
    const preceedingNum = numberList.filter(
      (num, index) => index < i && index > i - preambleSize - 1
    );
    // console.log(preceedingNum);
    // console.log(`------------${i}----------------`);
    const isValid = isValidNumber(number, preceedingNum);
    if (!isValid) return number;
  }
}

function findContiguousSet(number, list) {
  for (let i = 0; i < list.length - 1; i++) {
    let sum = list[i];
    for (let j = i + 1; j < list.length; j++) {
      sum += list[j];
      // console.log(i, j, sum);
      if (sum === number) {
        console.log("range found");
        const subList = list.filter((num, index) => index >= i && index <= j);
        console.log(subList);
        return Math.max(...subList) + Math.min(...subList);
      }
    }
  }
}

const part1Answer = findFirstInvalidNumber(numberList, 25);

console.log(`Part 1 solution: ${part1Answer}`);
console.log(`Part 2 solution: ${findContiguousSet(part1Answer, numberList)}`);
