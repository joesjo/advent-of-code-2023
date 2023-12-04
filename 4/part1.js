import fs from 'fs';

const file = fs.readFileSync('./4/input.txt', 'utf8');
const lines = file.trim().split('\n');

const numbersRegex = /(\d+)/g;

let points = 0;

for (const line of lines) {
  const [winningNumbers, myNumbers] = line.split(':')[1].split('|').map(part => {
    const numbers = [];
    const numbersMatches = part.matchAll(numbersRegex);
    for (const match of numbersMatches) {
      numbers.push(parseInt(match[0]));
    }
    return numbers;
  });

  const matchingNumbers = myNumbers.filter(number => winningNumbers.includes(number));
  if (matchingNumbers.length === 0) {
    continue;
  }

  points += Math.pow(2, matchingNumbers.length - 1);
}

console.log(points);
