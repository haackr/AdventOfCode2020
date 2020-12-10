const fs = require("fs");

function inputToArray(file) {
  var arr = fs.readFileSync(file).toString().split("\n");
  arr = arr.map((n) => Number(n));
  return arr;
}

function findAndMultiply(arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === 2020) return arr[i] * arr[j];
    }
  }
}

function find3AndMultiply(arr) {
  for (var i = 0; i < arr.length - 2; i++) {
    for (var j = 1; j < arr.length - 1; j++) {
      for (var k = 2; k < arr.length; k++) {
        if (arr[i] + arr[j] + arr[k] === 2020) return arr[i] * arr[j] * arr[k];
      }
    }
  }
}

const arr = inputToArray("./input.txt");
var solution = findAndMultiply(arr);
console.log(`The solution to part 1 is: ${solution}`);
solution = find3AndMultiply(arr);
console.log(`The solution to part 2 is: ${solution}`);
