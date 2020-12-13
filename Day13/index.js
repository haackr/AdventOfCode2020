const fs = require("fs");
const { parse } = require("path");

const [timeString, busString] = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n");

const time = parseInt(timeString);

const busses = busString.split(",");

const inServiceBusses = busses
  .filter((bus) => bus !== "x")
  .map((bus) => parseInt(bus))
  .sort((a, b) => a - b);

function findEarliest(busList, desiredTime) {
  let found = false;
  let time = desiredTime;
  while (!found) {
    for (bus of busList) {
      if (time % bus === 0) {
        return { bus, time, wait: time - desiredTime };
      }
    }
    time++;
  }
}

function getGaps(busList) {
  let gaps = [];
  for (let i = 0; i < busList.length; i++) {
    if (busList[i] !== "x") {
      gaps.push(i);
    }
  }
  return gaps;
}

console.log(getGaps(busses));

function winGoldCoin(busList) {
  const busses = busList
    .filter((bus) => bus !== "x")
    .map((bus) => parseInt(bus));
  let gaps = getGaps(busList);

  let searchString = "";

  for (let i = 0; i < busses.length; i++) {
    searchString += `(t+${gaps[i]}) mod ${busses[i]} = 0; `;
  }
  console.log(searchString);
}

console.log(winGoldCoin(busses));

// console.log(inServiceBusses);
const part1 = findEarliest(inServiceBusses, time);
console.log(`Part 1 solution: ${part1.bus * part1.wait}`);
