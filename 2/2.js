const { getLines } = require('../helper');

/*
The winner of the whole tournament is the player with the highest score.
Your total score is the sum of your scores for each round.
The score for a single round is the score for the shape you selected (1 for Rock, 2 for Paper, and 3 for Scissors)
plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won)
*/

// Rock: A X 1
// Paper: B Y 2
// Scissors: C Z 3
// 0 3 6

// Lose X
// Draw Y
// Win Z


const input = getLines('2/input');

const checkShapeScore = (a, b) => {
    if (a === 'A') {
        if (b === 'X') return 3
        if (b === 'Y') return 1
        if (b === 'Z') return 2
    }

    if (a === 'B') {
        if (b === 'X') return 1
        if (b === 'Y') return 2
        if (b === 'Z') return 3
    }

    if (a === 'C') {
        if (b === 'X') return 2
        if (b === 'Y') return 3
        if (b === 'Z') return 1
    }
}

const checkResultScore = (result) => {
    if (result === 'X') return 0
    if (result === 'Y') return 3
    if (result === 'Z') return 6
}

let score = 0;

input.forEach((line) => {
    const shapes = line.split(' ');
    score += checkResultScore(shapes[1]);
    score += checkShapeScore(shapes[0], shapes[1]);
})

console.log(`Score: ${score}`);