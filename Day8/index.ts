import * as fs from "fs";

const code: Array<string> = fs
  .readFileSync("./input.txt", { encoding: "utf-8" })
  .toString()
  .split("\n");

interface IResult {
  status: number;
  acc: number;
}

function runCodeAndFindLoop(code: Array<string>): IResult {
  let lineRun = {};
  let acc = 0;
  let line = 0;
  while (!lineRun[line] && line < code.length) {
    lineRun[line] = true;
    const currentLine: Array<string> = code[line].split(" ");
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

interface ICodeLines {
  line: string;
  index: number;
}

function fixCode(code: Array<string>): IResult {
  const nopsAndJmps: Array<ICodeLines> = code.reduce(
    (
      acc: Array<ICodeLines>,
      line: string,
      index: number
    ): Array<ICodeLines> => {
      // console.log(acc);
      if (/(nop|jmp)/g.test(line)) {
        acc.push({ line, index });
      }
      return acc;
    },
    []
  );

  for (let i = 0; i < nopsAndJmps.length; i++) {
    const { line, index }: { line: string; index: number } = nopsAndJmps[i];
    const newLine = line.replace(/(nop|jmp)/g, (match: string) => {
      if (match === "jmp") return "nop";
      else return "jmp";
    });
    // console.log(line, newLine);
    let newCode: Array<string> = [...code];
    newCode[index] = newLine;
    const result: IResult = runCodeAndFindLoop(newCode);
    if (result.status === 0) {
      return result;
    }
  }
  return { status: -1, acc: -1 };
}

console.log(`Part 1 solution: ${runCodeAndFindLoop(code).acc}`);
console.log(`Part 2 solution: ${fixCode(code).acc}`);
