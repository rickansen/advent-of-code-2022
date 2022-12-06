import fs from 'fs';

const input = fs.readFileSync(__dirname + '/input.txt', 'utf8');

// Part 1 Solution
const getUniqFour = (input) =>[...input].findIndex((x, y, z) => [...new Set(z.slice(y, y + 4))].length === 4) + 4;

// Final Answer 1544

// Part 1 Test Cases
console.log(getUniqFour('bvwbjplbgvbhsrlpgdmjqwftvncz'), 5);
console.log(getUniqFour('nppdvjthqldpwncqszvftbrmjlhg'), 6);
console.log(getUniqFour('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg'), 10);
console.log(getUniqFour('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'), 11);


// Part 2 Solution
const getUniqFourteen = (input) => [...input].findIndex((x, y, z) => [...new Set(z.slice(y, y + 14))].length === 14) + 14;

// Final Answer 2145

// Part 2 Test Cases
console.log(getUniqFourteen('mjqjpqmgbljsphdztnvjfqwrcgsmlb'), 19);
console.log(getUniqFourteen('bvwbjplbgvbhsrlpgdmjqwftvncz'), 23);
console.log(getUniqFourteen('nppdvjthqldpwncqszvftbrmjlhg'), 23);
console.log(getUniqFourteen('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg'), 29);
console.log(getUniqFourteen('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'), 26);



// Solution for all distinct characters
const getFirstMarker = (input, char) => [...input].findIndex((x, y, z) => [...new Set(z.slice(y, y + char))].length === char) + char;

// Solution for all test cases
console.log(getFirstMarker('bvwbjplbgvbhsrlpgdmjqwftvncz', 4), 5)
console.log(getFirstMarker('nppdvjthqldpwncqszvftbrmjlhg', 4), 6);
console.log(getFirstMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 4), 10);
console.log(getFirstMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 4), 11);
console.log(getFirstMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 14), 19);
console.log(getFirstMarker('bvwbjplbgvbhsrlpgdmjqwftvncz', 14), 23);
console.log(getFirstMarker('nppdvjthqldpwncqszvftbrmjlhg', 14), 23);
console.log(getFirstMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 14), 29);
console.log(getFirstMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 14), 26);