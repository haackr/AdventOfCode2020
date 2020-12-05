const fs = require('fs');

const boardingPasses = fs.readFileSync('./input.txt').toString().split('\n').map(pass => {
    const pos = findPosition(pass);
    // console.log(pass)
    // console.log(`${pos.row.toString(2).padStart(7, '0')}${pos.col.toString(2).padStart(3, 0)}`);
    const id = pos.row * 8 + pos.col;
    return {
        id,
        ...pos,
        pass,
    }
});;

function findPosition(boardingPass) {

    const row = parseInt(boardingPass.substring(0,7).replace(/[FB]/g, c => c === "B" ? 1 : 0), 2);
    // console.log(row);

    const col = parseInt(boardingPass.substring(7,10).replace(/[RL]/g, c => c === "R" ? 1 : 0), 2);
    // console.log(col);

    return {
        row,
        col,
    }
}

function findMissingPass(boardingPasses) {
    const minRow = Math.min(...boardingPasses.map(pass => pass.row));
    const maxRow = Math.max(...boardingPasses.map(pass => pass.row));

    const filteredIds = boardingPasses.filter(pass => pass.row !== minRow && pass.row !== maxRow).sort((a, b) => a.id - b.id).map(pass => pass.id);
    // console.log(filteredIds);

    const minId = filteredIds[0];
    const maxId = filteredIds[filteredIds.length - 1];

    for(let i = minId + 1; i < maxId; i++) {
        if(!filteredIds.includes(i)){
            return i;
        }
    }
}


// console.log(boardingPassObjects);

console.log(`Part 1 solution: ${Math.max(...boardingPasses.map(pass => pass.id))}`);
console.log(`Part 2 solution: ${findMissingPass(boardingPasses)}`);