const { getLines } = require('../helper');

const input = getLines('3/input');

const getPriority = s => s === s.toUpperCase() ? s.charCodeAt(0) - 38 : s.charCodeAt(0) - 96

let sum = 0;

// input.forEach((line) => {
//     const a = line.slice(0, line.length / 2).split('');
//     const b = line.slice(line.length / 2).split('');
//     const duplicate = a.find(c => b.includes(c));
//     sum += getPriority(duplicate);
// })

for (let i = 0; i < input.length; i += 3) {
    const a = input[i].split('');
    const b = input[i + 1].split('');
    const c = input[i + 2].split('');

    const duplicate = a.find(ch => b.includes(ch) && c.includes(ch));
    sum += getPriority(duplicate);
}

console.log(sum);
