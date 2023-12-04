import fs from 'fs';

const file = fs.readFileSync('./4/input.txt', 'utf8');
const lines = file.trim().split('\n');

const numbersRegex = /(\d+)/g;

const memo = {};

const getMatchingNumbers = (card) => {
  const [winningNumbers, myNumbers] = card.split(':')[1].split('|').map(part => {
    const numbers = [];
    const numbersMatches = part.matchAll(numbersRegex);
    for (const match of numbersMatches) {
      numbers.push(parseInt(match[0]));
    }
    return numbers;
  });

  return myNumbers.filter(number => winningNumbers.includes(number));
}

const getCards = (cards, copies, startPosition) => {
  const key = `${copies}-${startPosition}`;
  if (memo[key]) {
    return memo[key];
  }
  if (copies === 0) {
    return 0;
  }
  let sum = 0;
  for (let i = startPosition; i < startPosition + copies; i++) {
    if (cards.length === 0 || i >= cards.length) {
      break;
    }
    const card = cards[i];
    const matchingNumbers = getMatchingNumbers(card);
    sum += matchingNumbers.length;
    sum += getCards(cards, matchingNumbers.length, i + 1);
  }
  memo[key] = sum;
  return sum;
}

let points = 0;

for (let i = 0; i < lines.length; i++) {
  points += getCards(lines, 1, i) + 1;
}

console.log(points);
