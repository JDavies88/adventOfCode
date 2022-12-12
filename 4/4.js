const { getLines } = require('../helper');

const lines = getLines('4/input');

const arrayIncludesArray = (a, b) => a.filter(e => b.includes(e)).length > 0;

const overlapExists = (a, b) => arrayIncludesArray(a, b) || arrayIncludesArray(b, a);

const getNumbers = (min, max) => {
    const a = [];
    for (let i = min; i <= max; i++) a.push(i);
    return a;
}

const overlapCount = lines.filter((line) => {
    const groups = line.split(',');

    const a = groups[0].split('-')
    const aMin = parseInt(a[0]);
    const aMax = parseInt(a[1]);
    const aNumbers = getNumbers(aMin, aMax);

    const b = groups[1].split('-')
    const bMin = parseInt(b[0]);
    const bMax = parseInt(b[1]);
    const bNumbers = getNumbers(bMin, bMax);

    return overlapExists(aNumbers, bNumbers);
}).length

console.log(overlapCount)


