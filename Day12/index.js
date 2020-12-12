const fs = require("fs");

const navInstructions = fs.readFileSync("./input.txt").toString().split("\n");

function navigateShip(instructions) {
  let location = [0, 0];
  let heading = 90;
  instructions.forEach((instruction) => {
    const [_input, inst, magString] = instruction.match(
      /^(N|S|E|W|F|R|L)(\d+)$/i
    );
    const mag = parseInt(magString);
    if (inst === "R") {
      // console.log(`Old heading: ${heading} + ${mag}:`);
      heading = Math.abs(heading + mag);
      // console.log(heading);
    } else if (inst === "L") {
      // console.log(`Old heading: ${heading} - ${mag}:`);
      heading = Math.abs(heading - mag);
      // console.log(heading);
    } else if (inst === "F") {
      xV = Math.round(Math.sin((heading * Math.PI) / 180) * mag);
      yV = Math.round(Math.cos((heading * Math.PI) / 180) * mag);
      location[0] += xV;
      location[1] += yV;
    } else if (inst === "N") {
      location[1] += mag;
    } else if (inst === "S") {
      location[1] -= mag;
    } else if (inst === "E") {
      location[0] += mag;
    } else if (inst === "W") {
      location[0] -= mag;
    } else {
      console.log("MISSING SOMETHING");
    }
  });
  // console.log(location);
  // console.log(-90 % 360); // WHAT THE ACTUAL FUCK JAVASCRIPT
  return location;
}

function navigateByWaypoint(instructions) {
  let location = [0, 0];
  let waypoint = [10, 1];

  instructions.forEach((instruction) => {
    const [_input, inst, magString] = instruction.match(
      /^(N|S|E|W|F|R|L)(\d+)$/i
    );
    const mag = parseInt(magString);
    if (inst === "F") {
      location[0] += waypoint[0] * mag;
      location[1] += waypoint[1] * mag;
    } else if (inst === "N") {
      waypoint[1] += mag;
    } else if (inst === "S") {
      waypoint[1] -= mag;
    } else if (inst === "E") {
      waypoint[0] += mag;
    } else if (inst === "W") {
      waypoint[0] -= mag;
    } else if (inst === "R" || inst === "L") {
      let angle = (mag * Math.PI) / 180;
      if (inst === "R") angle *= -1;
      const [x, y] = waypoint;
      waypoint[0] = Math.round(Math.cos(angle) * x - Math.sin(angle) * y);
      waypoint[1] = Math.round(Math.cos(angle) * y + Math.sin(angle) * x);
      // console.log(`${instruction} (${x}, ${y}) to (${waypoint})`);
    } else {
      console.log("BAD SCENE");
    }
  });
  // console.log(location);
  return location;
}

const endLocation = navigateShip(navInstructions);
console.log(
  `Part 1 solution: ${Math.abs(endLocation[0]) + Math.abs(endLocation[1])}`
);
const endLocation2 = navigateByWaypoint(navInstructions);
console.log(
  `Part 2 solution: ${Math.abs(endLocation2[0]) + Math.abs(endLocation2[1])}`
);
