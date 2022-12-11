let input = fs.readFileSync(__dirname + '/input.txt', 'utf8');

// let newInput = input.split('\n\n').map( (x,y,z) => x.split('\n').map( (a,b,c) => b === 0 ? y : b === 1 ? a.replace(/(  Starting items: )/, '').split(', ').map(d => +d) : b === 2 ? a.replace(/(  Operation: new = old )/, '') : b === 3 ? +a.replace(/(  Test: divisible by )/, '') : b === 4 ? +a.replace(/(    If true: throw to monkey )/, '') : +a.replace(/(    If false: throw to monkey )/, '')) )

function getLevelOfMonkeyBusiness (notes, copy) {
    notes = parseNotes(notes)
    copy = parseNotes(copy)
    let arr = []

    for (let c = 0; c < 20; c++) {
        for (let i = 0; i < notes.length; i++) {
            let temp = notes[i][1].length

            for (let j = 0; j < temp; j++) {
                
                let eval = evaluate(notes[i][1][j], notes[i][2][0], notes[i][2][1])
                let bored = Math.floor(eval / 3) 
                notes[i][1][j] = bored
                let test = bored % notes[i][3] === 0
                
                if (test) {
                    notes[notes[i][4]][1].push( bored )
                    arr.push(notes[i][4])
                    continue
                }
                
                notes[notes[i][5]][1].push( bored )
                arr.push(notes[i][5])
                

            }
            notes[i][1] = []
        }
    }

    return Array(notes.length).fill('').map( (x,y) => filter(arr, y).length).map( (x,y) => x + copy.map(x => x[1].length)[y])
    //.sort((a,b) => a - b).slice(-2).reduce((a,b) => a * b)
}


function parseNotes (notes) {
    notes = notes.split('\n\n').map( (x,y,z) => x.split('\n').map( (a,b,c) => b === 0 ? y : b === 1 ? a.replace(/(  Starting items: )/, '').split(', ').map(d => +d) : b === 2 ? a.replace(/(  Operation: new = old )/, '').split(' ').map((d,e) => e === 1 ? +d || 'old' : d) : b === 3 ? +a.replace(/(  Test: divisible by )/, '') : b === 4 ? +a.replace(/(    If true: throw to monkey )/, '') : +a.replace(/(    If false: throw to monkey )/, '')) )
    return notes
}

const evaluate = (x, op, y) => {
    if (typeof y === 'string') return eval(`${x} ** 2`)
    return eval(`${x} ${op} ${y}`)
}

const filter = (arr,x) => arr.filter(a => a === x)

const test = 'Monkey 0:\n  Starting items: 79, 98\n  Operation: new = old * 19\n  Test: divisible by 23\n    If true: throw to monkey 2\n    If false: throw to monkey 3\n\nMonkey 1:\n  Starting items: 54, 65, 75, 74\n  Operation: new = old + 6\n  Test: divisible by 19\n    If true: throw to monkey 2\n    If false: throw to monkey 0\n\nMonkey 2:\n  Starting items: 79, 60, 97\n  Operation: new = old * old\n  Test: divisible by 13\n    If true: throw to monkey 1\n    If false: throw to monkey 3\n\nMonkey 3:\n  Starting items: 74\n  Operation: new = old + 3\n  Test: divisible by 17\n    If true: throw to monkey 0\n    If false: throw to monkey 1'

console.log(getLevelOfMonkeyBusiness(test, test))

