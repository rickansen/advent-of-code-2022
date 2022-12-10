let input = fs.readFileSync(__dirname + '/input.txt', 'utf8');

function  getSumOfSignalStrength (instr) {
    instr = instr.split('\n').map(x => x.includes('addx') ? +x.replace('addx ', '') : x)
    let x = 1, cycle = 0, history = [[0,1]]
    let cycles = [20, 60, 100, 140, 180, 220]

    for (let i = 0; i <instr.length + 1; i++) {
        if (instr[i] === 'noop') {
            cycle++
            history.push([cycle, x])
            continue
        }
        cycle++
        history.push([cycle, x])
        cycle++
        history.push([cycle, x])    
        x += instr[i]
    }

    return cycles.map(x => history[x].reduce((a,b) => a * b, 1)).reduce((a,b) => a + b, 0)
}

console.log(getSumOfSignalStrength(input))

// Part 1 Final Answer = 13740


// Part 2 Solution

function  renderImage (instr) {
    instr = instr.split('\n').map(x => x.includes('addx') ? +x.replace('addx ', '') : x)
    let x = 1, cycle = 0, history = []
    let crt = []
   

    for (let i = 0; i <instr.length + 1; i++) {
        if (instr[i] === 'noop') {
            cycle++
            history.push([cycle, x])
            continue
        }
        cycle++
        history.push([cycle, x])
        cycle++
        history.push([cycle, x])    
        x += instr[i]
    }

    let horiz = history.map(x => [(x[0] - 1) % 40, [x[1] - 1, x[1], x[1] + 1]]).map(x => x[1].includes(x[0]) ? '#' : '.')

    for (let i = 0; i < Math.floor(horiz.length / 40); i++ ) {
        crt.push(horiz.slice(i * 40, i * 40 + 40))
    }

    return crt.map(x => x.join(''))
}

// Part 2 Final Answer = ZUPRFECL

// Test Cases

const test = 'addx 15\naddx -11\naddx 6\naddx -3\naddx 5\naddx -1\naddx -8\naddx 13\naddx 4\nnoop\naddx -1\naddx 5\naddx -1\naddx 5\naddx -1\naddx 5\naddx -1\naddx 5\naddx -1\naddx -35\naddx 1\naddx 24\naddx -19\naddx 1\naddx 16\naddx -11\nnoop\nnoop\naddx 21\naddx -15\nnoop\nnoop\naddx -3\naddx 9\naddx 1\naddx -3\naddx 8\naddx 1\naddx 5\nnoop\nnoop\nnoop\nnoop\nnoop\naddx -36\nnoop\naddx 1\naddx 7\nnoop\nnoop\nnoop\naddx 2\naddx 6\nnoop\nnoop\nnoop\nnoop\nnoop\naddx 1\nnoop\nnoop\naddx 7\naddx 1\nnoop\naddx -13\naddx 13\naddx 7\nnoop\naddx 1\naddx -33\nnoop\nnoop\nnoop\naddx 2\nnoop\nnoop\nnoop\naddx 8\nnoop\naddx -1\naddx 2\naddx 1\nnoop\naddx 17\naddx -9\naddx 1\naddx 1\naddx -3\naddx 11\nnoop\nnoop\naddx 1\nnoop\naddx 1\nnoop\nnoop\naddx -13\naddx -19\naddx 1\naddx 3\naddx 26\naddx -30\naddx 12\naddx -1\naddx 3\naddx 1\nnoop\nnoop\nnoop\naddx -9\naddx 18\naddx 1\naddx 2\nnoop\nnoop\naddx 9\nnoop\nnoop\nnoop\naddx -1\naddx 2\naddx -37\naddx 1\naddx 3\nnoop\naddx 15\naddx -21\naddx 22\naddx -6\naddx 1\nnoop\naddx 2\naddx 1\nnoop\naddx -10\nnoop\nnoop\naddx 20\naddx 1\naddx 2\naddx 2\naddx -6\naddx -11\nnoop\nnoop\nnoop'

const test2 = 'noop\naddx 3\naddx -5'

console.log(renderImage(input))
