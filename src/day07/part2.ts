import * as fs from 'fs';
import * as path from 'path';

function getInstructions(): string[][] {
  const filePath = path.join(__dirname, 'input.txt');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return fileContent
    .trim()
    .split('\n')
    .map((row) => Array.from(row));
}

function split(manifold: string[][], beam: number, depth: number): number {
  if (!manifold[depth] || !manifold[depth][beam]) {
    return 0;
  }

  for (let i = depth; i < manifold.length; i++) {
    const target = manifold[i][beam];
    if (Number(target)) {
      return Number(target);
    }
    if (target === '^') {
      const timelines = split(manifold, beam - 1, i + 1) + split(manifold, beam + 1, i + 1);
      manifold[depth][beam] = String(timelines)
      return timelines;
    }
  };

  manifold[depth][beam] = '1';
  return 1;
}

function solve() {
  const manifold = getInstructions();

  const beam = manifold[0].indexOf('S');

  const timelines = split(manifold, beam, 0);

  console.log(timelines);
}

solve();
