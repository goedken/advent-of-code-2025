import * as fs from 'fs';
import * as path from 'path';

function getInstructions(): string[][] {
  const filePath = path.join(__dirname, 'input.txt');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return fileContent.trim().split('\n').map(row => Array.from(row));
}

function solve() {
  const manifold = getInstructions();

  const beams = new Set<number>([manifold[0].indexOf('S')]);

  let numSplits = 0;
  for (let row of manifold) {
    for (let beam of beams) {
      const beamTarget = row[beam];
      if (beamTarget === '^') {
        beams.add(beam - 1);
        beams.add(beam + 1);
        beams.delete(beam);
        numSplits++;
      }
    }
  }

  console.log(numSplits);
}

solve();
