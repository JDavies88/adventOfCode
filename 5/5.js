const { getLines } = require('../helper');

const lines = getLines('5/input');

// console.log(lines);

const initialiseStacks = (a) => {
    const line = a[a.indexOf('') - 1];
    const stackNumbers =  line.split(' ').filter(e => e !== '')
    return stackNumbers.map(() => []);
}

const getStacks = (a, stacks) => {
    //     [D]    
    // [N] [C]    
    // [Z] [M] [P]

    // Split into array of 4 char strings
    // strip whitespace and []
    // Add to stacks

    const result = [...stacks];
    const stackLines = [];
    for (let i = 0; a[i + 1] !== ''; i++) {
        stackLines.push(a[i]);
    }

    stackLines.forEach((line) => {
        const boxes = line
            .match((/.{1,4}/g))
            .map(s => s[1]);

        boxes.forEach((box, i) => {
            if (box !== ' ') {
                result[i].push(box);
            }
        })
    })

    return result;
}

const parseInstruction = (instruction) => {
    const parts = instruction.split(' ');
    return {
        number: parseInt(parts[1]),
        origin: parseInt(parts[3]),
        target: parseInt(parts[5])
    }
}

const handleInstruction = (instruction, stacks) => {
    // 'move 1 from 2 to 1'

    const result = [...stacks];
    const { number, origin, target } = parseInstruction(instruction);
    const boxes = stacks[origin - 1].splice(0, number);
    // console.log(`Moving ${boxes} from ${origin} to ${target}`)
    result[target - 1] = [...boxes, ...result[target - 1]];
    // console.log(result)
    return result;
}

const emptyStacks = initialiseStacks(lines);

console.log(emptyStacks);

let stacks = getStacks(lines, emptyStacks);

console.log(stacks)

const instructions = lines.filter(line => line.startsWith('move '));

instructions.forEach(instruction => {
    stacks = handleInstruction(instruction, stacks);
})

console.log(stacks);

let result = ''
stacks.forEach(e => result += e[0]);
console.log(result);
