import * as fs from 'fs';
import * as path from 'path';
import { forklift } from './forklift';

function getInstructions(): string[][] {
  // Read the file and store each line in an array
  const filePath = path.join(__dirname, 'input.txt');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const instructions = fileContent
    .trim()
    .split('\n')
    .map((row) => Array.from(row));
  return instructions;
}

function solve() {
  const grid = getInstructions();

  let rolls = 0;
  let rollsRemovedThisRound = -1;

  while (rollsRemovedThisRound !== 0) {
    rollsRemovedThisRound = 0;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] !== '@') {
          continue;
        }

        if (forklift({ x: j, y: i }, grid)) {
          grid[i][j] = 'x';
          rollsRemovedThisRound++;
        }
      }
    }

    rolls += rollsRemovedThisRound;
  }

  console.log(rolls);
}

solve();
