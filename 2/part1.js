import fs from 'fs';

const MAX_COLORS = {
  red: 12,
  green: 13,
  blue: 14
}

const file = fs.readFileSync('./2/input.txt', 'utf8');
const lines = file.trim().split('\n');

const possibleGamesSet = new Set();

for (const line of lines) {
  const gameId = line.match(/^\w+\s(\d+)/)[1];
  possibleGamesSet.add(gameId);

  const games = line.split(';');
  for (const game of games) {
    const red = game.match(/(\d+)\sred/);
    const green = game.match(/(\d+)\sgreen/);
    const blue = game.match(/(\d+)\sblue/);
    
    if (red && parseInt(red[1]) > MAX_COLORS.red) {
      possibleGamesSet.delete(gameId);
      break;
    }
    if (green && parseInt(green[1]) > MAX_COLORS.green) {
      possibleGamesSet.delete(gameId);
      break;
    }
    if (blue && parseInt(blue[1]) > MAX_COLORS.blue) {
      possibleGamesSet.delete(gameId);
      break;
    }
  }
}

const possibleGamesSum = [...possibleGamesSet].reduce((acc, gameId) => acc + parseInt(gameId), 0);

console.log(possibleGamesSum);
