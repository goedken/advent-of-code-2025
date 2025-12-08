import * as fs from 'fs';
import * as path from 'path';
import { Problem } from './problem';

function getInstructions(): string[][] {
  const filePath = path.join(__dirname, 'input.txt');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return fileContent
    .trim()
    .split('\n')
    .map((l) => l.split(' ').filter((n) => n.length));
}

function solve() {
  const lines = getInstructions();

  let sum = 0;

  const numProblems = lines[0].length;

  for (let i = 0; i < numProblems; i++) {
    const problem = new Problem(lines[lines.length - 1][i]);
    for (let j = 0; j < lines.length - 1; j++) {
      problem.terms.push(Number(lines[j][i]))
    }

    sum += problem.solve();
  }

  console.log(sum);
}

solve();
