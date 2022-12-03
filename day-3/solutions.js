import fs from 'fs';

const input = fs.readFileSync(__dirname + '/input.txt', 'utf8');

// Solution Part 1
const rucksacks = input.split('\n');
const compSets = rucksacks.map((x) => {
  let compartments = x.length / 2;
  return [x.slice(0, compartments), x.slice(compartments, x.length)].map((a) =>
    Array.from(new Set(a))
  );
});
const both = compSets.map((x) => x[0].find((a) => x[1].includes(a)));
const priority = both.map((x) =>
  /[a-z]/.test(x) ? x.charCodeAt() - 96 : x.charCodeAt() - 64 + 26
);
const prioritySum = priority.reduce((a, b) => a + b);

// Final Answer 7581
console.log(prioritySum);

// Solution Part 2

const rucksacksTwo = input.split('\n');
let elfGroups = [];

for (let i = 0; i < rucksacksTwo.length / 3; i++) {
  elfGroups.push(rucksacksTwo.slice(i * 3, i * 3 + 3));
}

const elfSets = elfGroups.map((x) => x.map((a) => Array.from(new Set(a))));
const trio = elfSets.map((x) =>
  x[0].find((a) => x[1].includes(a) && x[2].includes(a))
);
const priorityTwo = trio.map((x) =>
  /[a-z]/.test(x) ? x.charCodeAt() - 96 : x.charCodeAt() - 64 + 26
);
const prioritySumTwo = priorityTwo.reduce((a, b) => a + b);
console.log(prioritySumTwo);

// Final Answer 2525
