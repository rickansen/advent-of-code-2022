import fs from 'fs';

const input = fs.readFileSync(__dirname + '/input.txt', 'utf8');

// Part 1 Solution
const assignmentPairs = input
  .split('\n')
  .map((x) => x.split(','))
  .map((x) => x.map((a) => a.split('-')));
let containingPairs = assignmentPairs
  .map((x) => x.reduce((a, b) => a.concat(b)))
  .map((x) => x.map((a) => +a))
  .filter(
    (x) =>
      (x[0] <= x[3] && x[1] <= x[3] && x[0] >= x[2]) ||
      (x[2] <= x[1] && x[3] <= x[1] && x[2] >= x[0])
  ).length;

// Final Asnwer 550

// Part 2 Solution

const assignmentPairsTwo = input
  .split('\n')
  .map((x) => x.split(','))
  .map((x) => x.map((a) => a.split('-')));
const overlappingPairs =
  assignmentPairsTwo.length -
  assignmentPairsTwo
    .map((x) => x.reduce((a, b) => a.concat(b)))
    .map((x) => x.map((a) => +a))
    .filter((x) => (x[1] < x[2] && x[1] < x[3]) || (x[3] < x[0] && x[3] < x[1]))
    .length;

// Final Asnwer 931
