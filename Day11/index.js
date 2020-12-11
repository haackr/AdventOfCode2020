const fs = require("fs");

const seatMap = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((row) => row.split(""));

const nearbyCoord = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function seatPeople(seatMap, visible = false) {
  // Rules:
  // If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
  // If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
  // Otherwise, the seat's state does not change.
  let newMap = JSON.parse(JSON.stringify(seatMap)); // Deep Copy to work with
  let changed = false;
  let occupiedCount = 0;
  const occupiedThreshold = visible ? 5 : 4;
  for (let i = 0; i < seatMap.length; i++) {
    for (let j = 0; j < seatMap[0].length; j++) {
      const currentSeat = seatMap[i][j];
      if (currentSeat !== ".") {
        const seatsAround = visible
          ? checkVisible([i, j], seatMap)
          : checkNearby([i, j], seatMap);
        // console.log(seatsAround);
        if (currentSeat === "#") occupiedCount++;
        if (seatsAround === 0 && currentSeat === "L") {
          newMap[i][j] = "#";
          changed = true;
        } else if (seatsAround >= occupiedThreshold && currentSeat === "#") {
          newMap[i][j] = "L";
          changed = true;
        }
      }
    }
  }

  // console.log(newMap.map((c) => c.join("")).join("\n"));
  // console.log("--------------------------------------------------");
  if (changed) {
    return seatPeople(newMap, visible);
  } else {
    return occupiedCount;
  }
}

function checkNearby([i, j], seatMap) {
  return nearbyCoord.reduce((acc, p) => {
    if (
      i + p[0] >= 0 &&
      i + p[0] < seatMap.length &&
      j + p[1] >= 0 &&
      j + p[1] < seatMap[0].length
    ) {
      if (seatMap[i + p[0]][j + p[1]] === "#") {
        acc++;
      }
    }
    return acc;
  }, 0);
}

function checkVisible([i, j], seatMap) {
  return nearbyCoord.reduce((acc, p) => {
    let seatFound = false;
    let distance = 1;
    // console.log("--------");
    while (!seatFound) {
      const x = i + distance * p[0];
      const y = j + distance * p[1];
      // console.log(x, y);
      if (x < 0 || y < 0 || x >= seatMap.length || y >= seatMap[0].length) {
        seatFound = true;
      } else if (seatMap[x][y] === "#") {
        acc++;
        seatFound = true;
      } else if (seatMap[x][y] === "L") {
        seatFound = true;
      }
      distance++;
    }
    return acc;
  }, 0);
}

console.log(`Part 1 solution: ${seatPeople(seatMap, false)}`);
console.log(`Part 2 solution: ${seatPeople(seatMap, true)}`);
