const fs = require('node:fs');

const TEXT_NUMBERS = {
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9
};

const file = fs.readFileSync('./1/input.txt', 'utf8');
const lines = file.trim().split('\n');

let sum = 0;

for (const line of lines) {
  const wordsRegex = /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g;
  const words = line.matchAll(wordsRegex);
  
  if (words) {
    let firstWord, lastWord;
    for (const word of words) {
      if (firstWord === undefined) {
        firstWord = TEXT_NUMBERS[word[1]] ?? word[1];
      }
      lastWord = TEXT_NUMBERS[word[1]] ?? word[1];
    }
    sum += parseInt(`${firstWord}${lastWord}`);
  }
}

console.log(sum);
