const fs = require("fs");

const inputFile = fs.readFileSync("./input.txt").toString();
const map = createMapFromText(inputFile);

function createMapFromText(inputText) {
  const map = inputText.split("\n").map((row) => row.split(""));
  return map;
}

function traverseMapAndCountTrees(map, moveX, moveY) {
  let trees = 0;
  let currentPos = { x: 0, y: 0 };
  while (currentPos.y < map.length) {
    drawRowInConsole(map[currentPos.y], currentPos);
    if (map[currentPos.y][currentPos.x] === "#") trees++;
    currentPos.x += moveX;
    if (currentPos.x > map[0].length - 1) {
      currentPos.x = currentPos.x - map[0].length;
    }
    currentPos.y += moveY;
  }
  return trees;
}

function drawRowInConsole(row, { x }) {
  const firstPart = row.slice(0, x);
  const current = row[x];
  const lastPart = row.slice(x + 1, row.length);
  console.log(
    `\x1b[40m${firstPart.join("")}${
      current === "#" ? "\x1b[41m" : "\x1b[42m"
    }${current}\x1b[40m${lastPart.join("")}`
  );
}

function tryMultipleSlopesAndMultiply() {
  let solution = traverseMapAndCountTrees(map, 1, 1);
  solution *= traverseMapAndCountTrees(map, 3, 1);
  solution *= traverseMapAndCountTrees(map, 5, 1);
  solution *= traverseMapAndCountTrees(map, 7, 1);
  solution *= traverseMapAndCountTrees(map, 1, 2);
  return solution;
}

console.log(`The solution to part 1: ${traverseMapAndCountTrees(map, 3, 1)}`);
console.log(`The solution to part 2: ${tryMultipleSlopesAndMultiply()}`);
