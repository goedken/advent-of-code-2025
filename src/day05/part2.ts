import * as fs from 'fs';
import * as path from 'path';

function getInstructions(): string[] {
  const filePath = path.join(__dirname, 'input.txt');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return fileContent.trim().split('\n\n')[0].split('\n');
}

function inside(candidate: number, range: number[]): boolean {
  return candidate >= range[0] && candidate <= range[1];
}

function solve() {
  const ranges = getInstructions();

  const distinct = new Map<number, number>();

  for (let input of ranges) {
    let [min, max] = input.split('-').map((v) => Number(v));

    let isDistinct = true;
    for (let range of distinct) {
      const minInRange = inside(min, range);
      const maxInRange = inside(max, range);

      if (minInRange && maxInRange) {
        isDistinct = false;
        break;
      } else if (min < range[0] && max > range[1]) {
        distinct.delete(range[0]);
      } else if (minInRange || maxInRange) {
        isDistinct = false;

        min = Math.min(min, range[0]);
        max = Math.max(max, range[1]);

        distinct.set(min, max);

        if (min !== range[0]) {
          distinct.delete(range[0]);
        }
      }
    }

    if (isDistinct) {
      distinct.set(min, max);
    }
  }

  let sum = 0;

  for (let range of distinct) {
    sum += range[1] - range[0] + 1;
  }

  console.log(sum);
}

solve();
