const fs = require("fs");

const bagRules = fs.readFileSync("./input.txt").toString().split("\n");

function getBagsThatDirectlyContain(bagColor, bagRules) {
  let bags = [];
  const searchRule = new RegExp(`contain.*${bagColor}`);
  bagRules.forEach((bagRule) => {
    if (searchRule.test(bagRule)) {
      bags.push(bagRule.match(/^.+(?= bags contain.*)/)[0]);
    }
  });
  return bags;
}

function getAllPossibleOuterBags(bagColor, bagRules) {
  let allBags = [];
  let lastAdded = [bagColor];
  while (lastAdded.length > 0) {
    const newBags = lastAdded.reduce((acc, cur) => {
      return [
        ...acc,
        ...getBagsThatDirectlyContain(cur, bagRules).filter(
          (bag) => !allBags.includes(bag) && !acc.includes(bag)
        ),
      ];
    }, []);
    // console.log(newBags);
    allBags = [...allBags, ...newBags];
    // console.log(allBags);
    lastAdded = [...newBags];
    // console.log(lastAdded);
  }
  return allBags;
}

function bagContains(bagColor, bagRules) {
  const containedBags = findAndParseContainedBags(bagColor, bagRules);
  return containedBags.reduce((acc, cur) => {
    if (/no other/g.test(cur)) return acc;
    const numBags = parseInt(cur.match(/\d+/)[0]);
    const bag = cur.match(/(?<=\d+ ).+/)[0];
    // console.log(bag, numBags);
    return acc + numBags + numBags * bagContains(bag, bagRules);
  }, 0);
}

function findAndParseContainedBags(bagColor, bagRules) {
  const ruleSearch = new RegExp(`${bagColor} bags contain .+`);
  const bagRule = bagRules.filter((bagRule) => ruleSearch.test(bagRule))[0];
  const containedBags = bagRule
    .match(/(?<=contain ).+(?=.)/g)[0]
    .replace(/\sbags?/g, "")
    .split(", ");
  // console.log(containedBags);
  return containedBags;
}

console.log(
  `Part 1 solution: ${getAllPossibleOuterBags(["shiny gold"], bagRules).length}`
);
console.log(`Part 2 solution: ${bagContains("shiny gold", bagRules)}`);
