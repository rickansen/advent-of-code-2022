import fs from 'fs';

const input = fs.readFileSync(__dirname + '/input.txt', 'utf8');

const stack = input.split('\n').slice(0, 8);
let arrStack = stack
  .map((x) => x.replaceAll(/(    )/g, ' ').split(' '))
  .map((x) => x.map((a) => (!a ? '' : a[1])));
arrStack.push(['', '', '', '', '', '', '', '', '']);
let horizStack = arrStack
  .map((x, y, z) => x.map((a, b, c) => z[b][y]).reverse())
  .map((x) => x.slice(1).filter((x) => x !== ''));
let rearrangement = input
  .split('\n')
  .slice(10)
  .map((x) => [...x.matchAll(/\d{1,}/g)].map((a) => +a[0]));
let finalArrangement = horizStack.slice();

for (let i = 0; i < rearrangement.length; i++) {
  rearrangement[i] = [
    rearrangement[i][0],
    rearrangement[i][1] - 1,
    rearrangement[i][2] - 1,
  ];
  const toMove = finalArrangement[rearrangement[i][1]]
    .splice(-rearrangement[i][0])
    .reverse();
  finalArrangement[rearrangement[i][2]] =
    finalArrangement[rearrangement[i][2]].concat(toMove);
}

let topCrates = finalArrangement.map((x) => x[x.length - 1]).join('');

// final answer = CNSZFDVLJ

// Part 2 Solution

let finalArrangementTwo = horizStack.slice();

for (let i = 0; i < rearrangement.length; i++) {
  rearrangement[i] = [
    rearrangement[i][0],
    rearrangement[i][1] - 1,
    rearrangement[i][2] - 1,
  ];
  const toMove = finalArrangementTwo[rearrangement[i][1]].splice(
    -rearrangement[i][0]
  );
  finalArrangementTwo[rearrangement[i][2]] =
    finalArrangementTwo[rearrangement[i][2]].concat(toMove);
}

let topCratesTwo = finalArrangementTwo.map((x) => x[x.length - 1]).join('');

console.log(topCratesTwo);
// final answer = QNDWLMGNS

// let arr =
// [
// [1,2,3, "", "", ""],
// [4,5,6, ""],
// [7,8,9, ""]
// ]

// let rearr = [[2,1,2],[1,1,2]]

// for (let i = 0; i < rearr.length; i++) {
//     rearr[i] = [rearr[i][0], rearr[i][1] - 1, rearr[i][2] - 1]
//     const toMove = arr[rearr[i][1]].splice(-rearr[i][0]).reverse()
//     arr[rearr[i][2]] = arr[rearr[i][2]].concat(toMove)
// }

// console.log(arr)
