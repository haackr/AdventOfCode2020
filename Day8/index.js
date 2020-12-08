"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var fs = require("fs");
var code = fs
    .readFileSync("./input.txt", { encoding: "utf-8" })
    .toString()
    .split("\n");
function runCodeAndFindLoop(code) {
    var lineRun = {};
    var acc = 0;
    var line = 0;
    while (!lineRun[line] && line < code.length) {
        lineRun[line] = true;
        var currentLine = code[line].split(" ");
        if (currentLine[0] === "acc") {
            acc += Number(currentLine[1]);
            line++;
        }
        else if (currentLine[0] === "jmp") {
            line += Number(currentLine[1]);
        }
        else {
            line++;
        }
    }
    // console.log(lineRun);
    return { status: code.length - line, acc: acc };
}
function fixCode(code) {
    var nopsAndJmps = code.reduce(function (acc, line, index) {
        // console.log(acc);
        if (/(nop|jmp)/g.test(line)) {
            acc.push({ line: line, index: index });
        }
        return acc;
    }, []);
    for (var i = 0; i < nopsAndJmps.length; i++) {
        var _a = nopsAndJmps[i], line = _a.line, index = _a.index;
        var newLine = line.replace(/(nop|jmp)/g, function (match) {
            if (match === "jmp")
                return "nop";
            else
                return "jmp";
        });
        // console.log(line, newLine);
        var newCode = __spreadArrays(code);
        newCode[index] = newLine;
        var result = runCodeAndFindLoop(newCode);
        if (result.status === 0) {
            return result;
        }
    }
    return { status: -1, acc: -1 };
}
console.log("Part 1 solution: " + runCodeAndFindLoop(code).acc);
console.log("Part 2 solution: " + fixCode(code).acc);
