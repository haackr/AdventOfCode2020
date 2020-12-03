const fs = require('fs');

const inputData = fs.readFileSync('./input.txt').toString().split('\n');

function extractPasswordDataFromString(inputString) {
    const minOccurance = Number(inputString.match(/\d+(?=-)/gmi)[0]);
    const maxOccurance = Number(inputString.match(/(?<=-)\d+/gmi)[0]);
    const char = inputString.match(/[a-z]{1}(?=:)/gmi)[0];
    const password = inputString.match(/(?<=:\s)[a-z]+/gmi)[0];
    return {
        minOccurance,
        maxOccurance,
        char,
        password,
    }
}

function validatePassword({password, minOccurance, maxOccurance, char}) {
    // Count the occurances of char in password.
    const occurances = password.split('').filter( c => c === char ).length;

    // Return true if the occurances of char are between the min and max.
    return(occurances >= minOccurance && occurances <= maxOccurance)
}

function validatePasswordPart2({password, minOccurance: posOne, maxOccurance: posTwo, char}){
    // Split the string into an array.
    const passwordArray = password.split('');

    // Does char occur at the the position.
    const ocPos1 = passwordArray[posOne-1] === char;
    const ocPos2 = passwordArray[posTwo-1] === char

    // Check to see that ther is an instance of char in at least one of the positions but not both of them.
    return ( ocPos1 || ocPos2 ) && !(ocPos1 && ocPos2 );
}

const passwordList = inputData.map(extractPasswordDataFromString);

console.log(`Part 1 solution: ${passwordList.map(validatePassword).filter(Boolean).length}`)
console.log(`Part 2 solution: ${passwordList.map(validatePasswordPart2).filter(Boolean).length}`)