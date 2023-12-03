import fs from 'fs';

const file = fs.readFileSync('./3/input.txt', 'utf8');
const lines = file.trim().split('\n');

const partNumbers = [];
const partSymbols = [];

for (const line of lines) {
  const partNumbersArray = [];

  const partNumbersRegex = /(\d+)/g;
  const partSymbolsRegex = /([^\d^\.^\s])/g;

  const partNumbersMatches = line.matchAll(partNumbersRegex);
  for (const match of partNumbersMatches) {
    const partNumberLength = match[0].length;
    const partNumberPositions = Array.from({ length: partNumberLength }, (_, i) => match.index + i);
    const partNumberObject = {
      partNumber: match[0],
      positions: partNumberPositions
    };
    partNumbersArray.push(partNumberObject);
  }

  const partSymbolsArray = [];
  const partSymbolsMatches = line.matchAll(partSymbolsRegex);
  for (const match of partSymbolsMatches) {
    partSymbolsArray.push(match.index);
  }

  partSymbols.push(partSymbolsArray);
  partNumbers.push(partNumbersArray);
}

const correctPartNumbers = [];

for (const [index, line] of partSymbols.entries()) {
  for (const symbolIndex of line) {
    const matchingPositions = [symbolIndex - 1, symbolIndex, symbolIndex + 1];
    const searchLines = [index - 1, index, index + 1];
    for (const searchLine of searchLines) {
      if (searchLine < 0 || searchLine >= partNumbers.length) {
        continue;
      }
      for (const partNumber of partNumbers[searchLine]) {
        if (partNumber.positions.some(position => matchingPositions.includes(position))) {
          correctPartNumbers.push(partNumber.partNumber);
        }
      }
    }
  }
}

console.log(correctPartNumbers.reduce((acc, partNumber) => acc + parseInt(partNumber), 0));
