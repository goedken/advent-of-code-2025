import * as fs from 'fs';
import * as path from 'path';

function getInstructions(): string[][] {
  // Read the file and store each line in an array
  const filePath = path.join(__dirname, 'input.txt');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return fileContent
    .trim()
    .split('\n\n')
    .map((i) => i.split('\n'));
}

function solve() {
  const [ranges, ingredients] = getInstructions();

  let fresh = 0;

  for (let ingredient of ingredients) {
    for (let range of ranges) {
      const [min, max] = range.split('-');
      if (
        Number(ingredient) >= Number(min) &&
        Number(ingredient) <= Number(max)
      ) {
        fresh++;
        break;
      }
    }
  }

  console.log(fresh);
}

solve();
