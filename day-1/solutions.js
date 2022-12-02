import fs from 'fs';

const input = fs.readFileSync(__dirname + '/input.txt', 'utf8');

// Part 1 Solution
let calPerElf = input
  .split('\n\n')
  .map((x) => x.split('\n').reduce((a, b) => +a + +b, 0));
let maxCal = Math.max(...calPerElf);
let maxIndex = calPerElf.findIndex((x) => x === maxCal);

console.log(maxCal);
console.log(maxIndex);

// Part 2 Solution

let topThreeElves = calPerElf.sort((a, b) => a - b).slice(-3);
let threeElvesSum = topThreeElves.reduce((a, b) => a + b, 0);

console.log(threeElvesSum);
