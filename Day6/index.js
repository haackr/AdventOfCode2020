const fs = require("fs");

const answers = fs.readFileSync("./input.txt").toString().split(/\n{2}/g);

function countUniqueInGroup(groupString) {
  groupString = groupString.replaceAll("\n", "");
  // console.log(groupString);
  const uniqueAnswers = groupString
    .split("")
    .filter((char, i, arr) => arr.indexOf(char) === i);
  // console.log(uniqueAnswers.join(''));
  return uniqueAnswers.length;
}

const questionsSum = answers.reduce(
  (acc, cur) => (acc += countUniqueInGroup(cur)),
  0
);

function countQuestionsEveryoneAnswered(groupString) {
  const answerArray = groupString.split("\n");
  if (answerArray.length === 1) return answerArray[0].length;
  let count = 0;
  answerArray[0].split("").forEach((char) => {
    const existsInAll = answerArray.reduce((acc, cur) => {
      if (!cur.includes(char)) return false;
      return acc;
    }, true);
    if (existsInAll) count++;
  });
  return count;
}

const everyoneQuestionsSum = answers.reduce(
  (acc, cur) => (acc += countQuestionsEveryoneAnswered(cur)),
  0
);

// console.log(countQuestionsEveryoneAnswered(answers[1]))

console.log(`Part 1 solution: ${questionsSum}`);
console.log(`Part 2 solution: ${everyoneQuestionsSum}`);
