const fs = require("fs");

const code = fs
  .readFileSync("./input.txt", { encoding: "utf-8" })
  .toString("")
  .split("\n");

function runCodeAndFindLoop(code) {
  let lineRun = {};
  let acc = 0;
  let line = 0;
  while (!lineRun[line] && line < code.length) {
    lineRun[line] = true;
    const currentLine = code[line].split(" ");
    if (currentLine[0] === "acc") {
      acc += Number(currentLine[1]);
      line++;
    } else if (currentLine[0] === "jmp") {
      line += Number(currentLine[1]);
    } else {
      line++;
    }
  }
  // console.log(lineRun);
  return { status: code.length - line, acc };
}

function fixCode(code) {
  const nopsAndJmps = code.reduce((acc, line, index) => {
    // console.log(acc);
    if (/(nop|jmp)/g.test(line)) {
      acc.push({ line, index });
    }
    return acc;
  }, []);

  for (let i = 0; i < nopsAndJmps.length; i++) {
    const { line, index } = nopsAndJmps[i];
    const newLine = line.replace(/(nop|jmp)/g, (match) => {
      if (match === "jmp") return "nop";
      else return "jmp";
    });
    // console.log(line, newLine);
    let newCode = [...code];
    newCode[index] = newLine;
    const result = runCodeAndFindLoop(newCode);
    if (result.status === 0) {
      return result;
    }
  }
}

console.log(`Part 1 solution: ${runCodeAndFindLoop(code).acc}`);
console.log(`Part 2 solution: ${fixCode(code).acc}`);
