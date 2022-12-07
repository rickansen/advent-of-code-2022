import fs, { lstatSync } from 'fs';
import { dirname } from 'path';

let input = fs.readFileSync(__dirname + '/input.txt', 'utf8');
    
function getTotalSize (input) {
    input = input.split('\n').filter(x => !x.includes("$ ls"))
    let cd = input.filter(x => x.includes("$ cd")).map(x => getDirName(x))
    let slashDir = {"/" :  {}}
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
 
    //loop to nest objs
    for (let i = 1; i < input.length; i++) {
       let currDir = findDir(slashDir, path[currPath])
        let dirName = input[i].replace("dir ", '')
        let value = input[i].split(' ')[0]
        let key = input[i].split(' ')[1]

        if (input[i].includes('$ cd')) currPath++

        if (!input[i].includes('$ cd') && input[i].includes('dir')) {
            currDir[dirName] = {}
        } else if (!input[i].includes('$ cd')) {
            currDir[key] = +value
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
        curr = curr[arr[i]]
    }
    return curr
}


// test for helper nav
// let objTest = {
//     "/": {
//         b: 1,
//         c: 2,
//         d: {
//             e: 1
//            }
// }}
// console.log(findDir(objTest, "/.d.e"), 1)
// console.log(findDir(objTest, "/"), 1)


// const test = "$ cd /\n$ ls\ndir a\n14848514 b.txt\n8504156 c.dat\ndir d\n$ cd a\n$ ls\ndir e\n29116 f\n2557 g\n62596 h.lst\n$ cd e\n$ ls\n584 i\n$ cd ..\n$ cd ..\n$ cd d\n$ ls\n4060174 j\n8033020 d.log\n5626152 d.ext\n7214296 k"
// console.log(getTotalSize(test))
// const test2 = '$ cd /\n$ ls\ndir bsnqsfm\ndir dtqvbspj\ndir hhhtrws\ndir ldmsq\n307337 pnm.slh\ndir pqcndb\ndir pwtqzwv\n212421 zcrfndg.cms\n$ cd bsnqsfm\n$ ls\n179236 lccnhn\n$ cd ..\n$ cd dtqvbspj\n$ ls\n221336 gdjfp.mfp\n273114 jjgpvcqv.jlq'
// console.log(getTotalSize(test2))

console.log(getTotalSize(input))

// - / (dir)
//   - a (dir)
//     - e (dir)
//       - i (file, size=584)
//     - f (file, size=29116)
//     - g (file, size=2557)
//     - h.lst (file, size=62596)
//   - b.txt (file, size=14848514)
//   - c.dat (file, size=8504156)
//   - d (dir)
//     - j (file, size=4060174)
//     - d.log (file, size=8033020)
//     - d.ext (file, size=5626152)
//     - k (file, size=7214296)