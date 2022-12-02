import fs from 'fs';

const input = fs.readFileSync(__dirname + '/input.txt', 'utf8');
let arrOfPairs = input.split('\n').map((x) => x.split(' '));

// Part 1 Solution

let arrDupe = arrOfPairs.slice(0);
let arrOfPoints = arrDupe.map((x) => winner(x));
let sumOfPoints = arrOfPoints.reduce((a, b) => a + b, 0);

console.log(sumOfPoints);

function winner(pair) {
  let convert = { X: 'A', Y: 'B', Z: 'C' };

  let points = ['A', 'B', 'C'];
  let shape = 0;
  let outcome = 0;
  pair[1] = convert[pair[1]];

  if (pair[0] === pair[1]) outcome = 3;
  if (
    (pair[0] === 'A' && pair[1] === 'B') ||
    (pair[0] === 'B' && pair[1] === 'C') ||
    (pair[0] === 'C' && pair[1] === 'A')
  )
    outcome = 6;

  shape = points.indexOf(pair[1]) + 1;
  return outcome + shape;
}

// Part 1 Test Case
console.log(winner(['B', 'Z']));

// x    y    z
// lose draw win

// Part 2 Solution
let arrDupeTwo = arrOfPairs.slice(0);
let arrOfPointsTwo = arrDupeTwo.map((x) => loseDrawWin(x));
let sumOfPointsTwo = arrOfPointsTwo.reduce((a, b) => a + b, 0);
console.log(sumOfPointsTwo);

function loseDrawWin(pair) {
  let points = ['A', 'B', 'C'];
  let winPairs = { A: 'B', B: 'C', C: 'A' };
  let losePairs = { A: 'C', B: 'A', C: 'B' };
  let shape = 0;
  let outcome = 0;

  if (pair[1] === 'Y') {
    pair[1] = pair[0];
    outcome = 3;
  }
  if (pair[1] === 'X') pair[1] = losePairs[pair[0]];
  if (pair[1] === 'Z') {
    pair[1] = winPairs[pair[0]];
    outcome = 6;
  }

  shape = points.indexOf(pair[1]) + 1;
  return shape + outcome;
}

// Part 2 Test Case
console.log(loseDrawWin(['A', 'X']), 'lose', 3);
console.log(loseDrawWin(['A', 'Y']), 'draw', 4);
console.log(loseDrawWin(['A', 'Z']), 'win', 8);
