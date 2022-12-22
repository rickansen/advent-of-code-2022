let input = fs.readFileSync(__dirname + '/input.txt', 'utf8');

function getPassword (input) {
    input = input.split('\n')
    // let board = input.slice(0,200)
    // let instructions = input.slice(201)
    let board = input.slice(0, 12).map(x => [...x])
    let instructions = input[input.length - 1 ]
    let insTiles = instructions.split(/[RL]/).map(x => +x)
    let insFace = instructions.split(/\d{1,}/).filter(x => x)
    let arrFace = getFace(insFace)
    let startingPoint = [0, board[0].findIndex(x => x !== ' ')]
    let coordHistory = []

    for (let i = 0; i < insTiles.length; i++ ) {
        let temp = 0
        if (i === 0) {
            let path = getPath('right', board, startingPoint)
            let start = path.findIndex(x => x !== ' ')
            let bounds = path.slice(start)
            //let range = bounds.slice(0, insTiles[i])
            let range = []
            

            while (bounds[temp] !== '#') {
                if (temp < bounds.length) {
                    range.push(bounds[temp])
                    temp++
                }
                temp = temp % bounds.length
                range.push(bounds[temp])
                temp++
                
            }
            
            // if (range.includes('#')) {
            //     let wall = range.indexOf('#')
            //     coordHistory.push([startingPoint[0], wall + start -1])
            // }

            //coordHistory.push(((start + insTiles[i]) % range.length) + start)
            coordHistory.push(range)
            
        }
    }
    
    return coordHistory
}

//        ...#
//        .#..
//        #...
//        ....
//...#.......#
//........#...
//..#....#....
//..........#.
//        ...#....
//        .....#..
//        .#......
//        ......#.
//10R5L5R10L4R5L5

function getFace (ins) {
    let faces = ['right', 'down', 'left', 'top']
    let index = 0
    let arrIn = []
    for (let i = 0; i < ins.length; i++) {
        if (ins[i] === 'R') {
            if (index + 1 > 3) index = index % 3
            else index++
            arrIn.push(index)
            continue
        }
            if (index - 1 < 0) index  = faces.length - 1 + index
            else index--
            arrIn.push(index)
        
       
    }
    return arrIn.map(x => faces[x])
}




function getPath(face, board, coord) {
    if (face === 'right' || face === 'left') return board[coord[0]]
    return board.map((x,y) => board[y][coord[1]])
}

let test2 = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
]

let test = '        ....\n        .#..\n        #...\n        ....\n...#.......#\n........#...\n..#....#....\n..........#.\n        ...#....\n        .....#..\n        .#......\n        ......#.\n10R5L5R10L4R5L5'

console.log(getPassword(test))
