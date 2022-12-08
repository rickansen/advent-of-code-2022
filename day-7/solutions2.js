import fs, { lstatSync } from 'fs';
import { dirname } from 'path';

let input = fs.readFileSync(__dirname + '/input.txt', 'utf8');
    
function getTotalSize (input) {
    input = input.split('\n').filter(x => !x.includes("$ ls"))
    let cd = input.filter(x => x.includes("$ cd")).map(x => getDirName(x))
    let slashDir = {"/" :  []}
    let path = ["/"]
    let currPath = 0

    // loop for path
    for (let i = 1; i < cd.length; i++) {
        if (cd[i] !== "..") {
            path.push(path[path.length-1] + "." + cd[i])
            continue
        }
        path.push(path[path.length-1].slice(0, path[path.length-1].lastIndexOf('.')))
    }
 
    let current;
    //loop to nest objs
    for (let i = 1; i < input.length; i++) {
        let currDir = findDir(slashDir, path[currPath])
        let obj = {}
    //    current = currDir
        // let dirName = input[i].replace("dir ", '')
        let value = input[i].split(' ')[0]
        let key = input[i].split(' ')[1]

        if (input[i].includes('$ cd')) currPath++

        if (!input[i].includes('$ cd') && input[i].includes('dir')) {
            obj[key] = []
            currDir.push(obj)
        } else if (!input[i].includes('$ cd')) {
            obj[key] = value
            currDir.push(obj)
        } 
    }
    return slashDir
}

// helper function for dir name
function getDirName (str) {
    return str.slice(5)
}

// helper function for to navigate obj
function findDir (obj, arr) {
    let curr;
    arr = arr.split('.')
    for (let i = 0; i < arr.length; i++) {
        if (i === 0) {
            curr = obj[arr[i]]
            continue
        }
        curr = curr.find(x => Object.keys(x)[0] === arr[i])[arr[i]]
    }
    return curr
}

// let objTest = {
//     "/": [
//         {d: [{f: 123}, {h: 99}]},
//         {m: [{e: 2}]}
//     ]
// }

// console.log(findDir(objTest, "/.d"), 123)
// console.log(findDir(objTest, "/.m"), 1)


// const test = "$ cd /\n$ ls\ndir a\n14848514 b.txt\n8504156 c.dat\ndir d\n$ cd a\n$ ls\ndir e\n29116 f\n2557 g\n62596 h.lst\n$ cd e\n$ ls\n584 i\n$ cd ..\n$ cd ..\n$ cd d\n$ ls\n4060174 j\n8033020 d.log\n5626152 d.ext\n7214296 k"
// console.log(getTotalSize(test))
// const test2 = '$ cd /\n$ ls\ndir bsnqsfm\ndir dtqvbspj\ndir hhhtrws\ndir ldmsq\n307337 pnm.slh\ndir pqcndb\ndir pwtqzwv\n212421 zcrfndg.cms\n$ cd bsnqsfm\n$ ls\n179236 lccnhn\n$ cd ..\n$ cd dtqvbspj\n$ ls\n221336 gdjfp.mfp\n273114 jjgpvcqv.jlq'
// console.log(getTotalSize(test2))

console.log(getTotalSize(input))
