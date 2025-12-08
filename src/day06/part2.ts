import * as fs from 'fs';
import * as path from 'path';
import { Problem } from './problem';

function getInstructions(): string[] {
  const filePath = path.join(__dirname, 'input.txt');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return fileContent.trim().split('\n');
}

function solve() {
  const lines = getInstructions();

  const terms = new Map<number, number>();
  const problems: Problem[] = [new Problem(lines[lines.length - 1][0])];
  let problemIter = 0;

  for (let i = 0; i < lines[0].length; i++) {
    let allSpaces = true;
    let term = '';

    for (let j = 0; j < lines.length - 1; j++) {
      const digit = lines[j][i];
      if (digit !== ' ') {
        allSpaces = false;
        term += digit;
      }
    }

    if (term.length) {
      terms.set(i, Number(term));
    }

    if (allSpaces) {
      problems[problemIter].terms = Array.from(terms.values());
      problems.push(new Problem(lines[lines.length - 1][i + 1]));
      terms.clear();
      problemIter++;
    }
  }

  problems[problemIter].terms = Array.from(terms.values());

  const sum = problems.reduce((sum, prob) => (sum += prob.solve()), 0);

  console.log(sum);
}

solve();
