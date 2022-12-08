let input = fs.readFileSync(__dirname + '/input.txt', 'utf8').split('\n');

// Part 1 Solution

function isVisible (matrix) {
    matrix  = matrix.map(x => [...x].map(a => +a))
    return matrix.map( (x,y,z) => x.map( (a,b,c) => {
        let sideArr = getSides(matrix, y, b)
        return sideArr.map( d => d.length).includes(0) || sideArr.map( e => Math.max(...e)).some(f => f < a)
    } ).filter(x => x).length ).reduce((a,b) => a + b)
}

// Part 1 Final Answer 1794

// Part 1 Test Case
let test = '30373\n25512\n65332\n33549\n35390'.split('\n')
console.log(isVisible(test))
console.log(isVisible(input))



// Part 2 Solution
function getScenicScore (matrix) {
    matrix  = matrix.map(x => [...x].map(a => +a))
    return Math.max(...matrix.map( (x,y,z) => x.map( (a,b,c) => {
        if (y === 0 || y === matrix.length - 1 || b === 0 || b === matrix[0].length - 1) return 0
        let sideArr = getSides(matrix, y, b)
        return sideArr.map(d => d.slice(0, d.findIndex(e => e >= a) === -1 ? d.length : d.findIndex(e => e >= a) + 1).length).reduce((a,b) => a * b, 1)
    } )).reduce((a,b) => a.concat(b)))
}

// Part 2 Final Answer 199272

// Part 2 Test Case
console.log(getScenicScore(test))
console.log(getScenicScore(input))

// Helper Function
function getSides (matrix, y, x) {
    let up = Array(y).fill('').map( (e, i) => matrix[y-i-1][x])
    let down = Array(matrix.length - y - 1).fill('').map( (e, i) => matrix[y+i+1][x])
    let left = Array(x).fill('').map( (e, i) => matrix[y][x-i-1])
    let right = Array(matrix.length - x - 1).fill('').map( (e, i) => matrix[y][x+i+1])

    return [up, down, left, right]
}