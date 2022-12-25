let input = fs.readFileSync(__dirname + '/input.txt', 'utf8');

function convertToDecimal (snafu) {

    snafu = snafu.split('\n')
    let sumOfSnafus = snafu.map(x => [...x].map( (a,b) => [a, 5 ** (x.length - b - 1)].map( (c,d) => !isNaN(+c) || c == 0 ? +c : c === '=' ? -2 : -1 ).reduce((acc,curr) => acc * curr, 1) ).reduce((a,b) => a+b,0)).reduce((a,b) => a + b)
    let base5 = ''

    while (sumOfSnafus) {
        remainder = sumOfSnafus % 5
        sumOfSnafus = Math.floor(sumOfSnafus/5)

        if (remainder <= 2) {
            base5 = String(remainder) + base5
        } else {
            base5 = '   =-'[remainder] + base5
            sumOfSnafus++
        }
    }
    
    return base5
}


let test = '1=-0-2\n12111\n2=0=\n21\n2=01\n111\n20012\n112\n1=-1=\n1-12\n12\n1=\n122'
console.log(convertToDecimal(input))