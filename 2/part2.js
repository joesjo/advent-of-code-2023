import fs from 'fs';

const file = fs.readFileSync('./2/input.txt', 'utf8');
const lines = file.trim().split('\n');

let powerSum = 0;

for (const line of lines) {
  const games = line.split(';');
  const gameMinDice = {
    red: 0,
    green: 0,
    blue: 0
  }
  for (const game of games) {
    const red = game.match(/(\d+)\sred/);
    const green = game.match(/(\d+)\sgreen/);
    const blue = game.match(/(\d+)\sblue/);
    
    if (red) {
      gameMinDice.red = Math.max(gameMinDice.red, parseInt(red[1]));
    }
    if (green) {
      gameMinDice.green = Math.max(gameMinDice.green, parseInt(green[1]));
    }
    if (blue) {
      gameMinDice.blue = Math.max(gameMinDice.blue, parseInt(blue[1]));
    }
  }
  powerSum += gameMinDice.red * gameMinDice.green * gameMinDice.blue;
}

console.log(powerSum);
