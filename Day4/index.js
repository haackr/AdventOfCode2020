const fs = require('fs');

const inputString = fs.readFileSync('./input.txt').toString();
const passportStrings = inputString.split(/\n\s*\n/igm).map(passportString => passportString.split(/[\n\s]+/igm));

const REQUIRED_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const passportList = convertPassportsToObjects(passportStrings);

function convertPassportsToObjects(passportArray) {
    return passportArray.map(passportString => (
        passportString.reduce((acc, cur) => {
            const key = cur.match(/[a-z]+(?=:)/ig)[0];
            const value = cur.match(/(?<=:).*/ig)[0];
            acc[key] = value;
            return acc;
        }, {})
    ));
}

function isPassportValid(passport) {
    for(const field of REQUIRED_FIELDS){
        if(passport[field] === undefined) {
            return false;
        }
    }
    return true;
}

function isPassportValidStrict(passport) {
    for(const field of REQUIRED_FIELDS){
        const fieldValue = passport[field];

        // Check if the field exists.
        if(fieldValue === undefined){
            return false;
        }

        // byr (Birth Year) - four digits; at least 1920 and at most 2002.
        if(field === 'byr' && (!/\d{4}/.test(fieldValue) || Number(fieldValue) < 1920 || Number(fieldValue) > 2002)) {
            // console.log(fieldValue, "Invalid Birth Year");
            return false;
        }

        // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
        if(field === 'iyr' && ( !/\d{4}/.test(fieldValue) || Number(fieldValue) < 2010 || Number(fieldValue) > 2020)) {
            // console.log(fieldValue, "Invalid Issue Year")
            return false;
        }

        // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
        if(field === 'eyr' && ( !/\d{4}/.test(fieldValue) || Number(fieldValue) < 2020 || Number(fieldValue) > 2030)) {
            // console.log(fieldValue, "Invalid Expiration Year")
            return false;
        }

        // hgt (Height) - a number followed by either cm or in:
            // If cm, the number must be at least 150 and at most 193.
            // If in, the number must be at least 59 and at most 76.
        if(field === 'hgt') {
            if(!/^\d+(cm|in)$/.test(fieldValue)){
                // console.log(fieldValue, "Invalid height format");
                return false;
            }
            const height = fieldValue.match(/\d+/g)[0];
            const units = fieldValue.match(/(in|cm)/g)[0];
            
            if(units === "cm") {
                if(height < 150 || height > 193){
                    return false;
                }
            } else if(units === "in"){
                if(height < 59 || height > 76) {
                    return false;
                }
            } else {
                return false;
            }
        }
        
        // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
        if(field === 'hcl' && !/^#[a-f\d]{6}$/.test(fieldValue)) {
            // console.log(fieldValue, 'Invalid hair color format');
            return false;
        }

        // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
        if(field === 'ecl' && !/^(amb|blu|brn|gry|grn|hzl|oth)$/.test(fieldValue)) {
            // console.log(fieldValue, 'Invalid eye color format');
            return false;
        }

        // pid (Passport ID) - a nine-digit number, including leading zeroes.

        if(field === 'pid' && !/^\d{9}$/.test(fieldValue)) {
            // console.log(fieldValue, "Invalid pid format");
            return false
        };
    }
    return true;
}

function countValidPassports(passportList, validator) {
    return passportList.reduce((acc, cur) => {
        if(validator(cur)) acc++
        return acc;
    }, 0)
}

console.log(`Part 1 solution: ${countValidPassports(passportList, isPassportValid)} out of ${passportList.length}`);
console.log(`Part 2 solution: ${countValidPassports(passportList, isPassportValidStrict)} out of ${passportList.length}`)
