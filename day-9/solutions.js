let input = fs.readFileSync(__dirname + '/input.txt', 'utf8');

function tailTrail (input) {
    input = input.split('\n').map(x => x.split(' ')).map(x => [x[0], +x[1]])
    const rl = input.filter(x => x[0] === "R" || x[0] === "L").map(x => [x[0], +x[1]])
    let width = Math.max(...rl.map( (x,y,z) => y !== 0 ? x[0] === "R" ? z[y][1] = x[1]+z[y-1][1] : z[y][1] = z[y-1][1]-x[1] : x[1])) + 1
    const ud = input.filter(x => x[0] === "U" || x[0] === "D").map(x => [x[0], +x[1]])
    let height = Math.max(...rl.map( (x,y,z) => y !== 0 ? x[0] === "U" ? z[y][1] = x[1]+z[y-1][1] : z[y][1] = z[y-1][1]-x[1] : x[1])) + 1

    let state = Array(height).fill('').map( (x,y) => Array(width).fill(y).map( (a,b) => `${y}${b}`))
    let directions = input.map(x => x[0])
    let coord = [height - 1, 0]
    state[coord[0]][coord[1]]= 'H'
    
    let coordHistory = []

    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i][1]; j++) {
            if (input[i][0] === "R") {
                let tempCoord = `${coord[0]}${coord[1]}`

                coord[1]++
                coordHistory.push([coord[0], coord[1]])
                state[coord[0]][coord[1]] = "H"
                state[coord[0]][coord[1]-1] = tempCoord
            } 
            
            if (input[i][0] === "L") {
                let tempCoord = `${coord[0]}${coord[1]}`

                coord[1]--
                coordHistory.push([coord[0], coord[1]])
                state[coord[0]][coord[1]] = "H"
                state[coord[0]][coord[1]+1] = tempCoord
            } 
            
            if (input[i][0] === "U") {
                let tempCoord = `${coord[0]}${coord[1]}`

                coord[0]--
                coordHistory.push([coord[0], coord[1]])
                state[coord[0]][coord[1]] = "H"
                state[coord[0]+1][coord[1]] = tempCoord
            } 
            
            if (input[i][0] === "D") {
                let tempCoord = `${coord[0]}${coord[1]}`

                coord[0]++
                coordHistory.push([coord[0], coord[1]])
                state[coord[0]][coord[1]] = "H"
                state[coord[0]-1][coord[1]] = tempCoord
            }
        }
    }

    return state
}

const test = 'R 4\nU 4\nL 3\nD 1\nR 4\nD 1\nL 5\nR 2'
//const test = 'R 4\nU 4\nL 1'
const test2 = 'R 3\nU 4\nL 3\nD 1'
console.log(tailTrail(test))