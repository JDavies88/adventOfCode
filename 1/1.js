const { getLines } = require('../helper');

const input = getLines('1/input');

// console.log(input);

const elves = [];

let calories = 0;

input.forEach((line) => {
    if (line === '') {
        elves.push(calories)
        calories = 0;
    } else {
        calories += parseInt(line)
    }
})

elves.sort().reverse();

const maxCalories = elves[0];

console.log(maxCalories);

const topThree = elves.slice(0, 3);

console.log(topThree.reduce((a, b) => a + b));