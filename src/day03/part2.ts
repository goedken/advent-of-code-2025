import * as fs from "fs";
import * as path from "path";

function getInstructions(): string[] {
  // Read the file and store each line in an array
  const filePath = path.join(__dirname, "example.txt");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const instructions = fileContent.trim().split("\n");
  return instructions;
}

function findIndexOfEarliestLocalMinimum(sequence: string[]): number {
  let lowestIndexSoFar = 0;

  for (let i = 1; i <= sequence.length - 1; i++) {
    const prev = Number(sequence[i - 1]);
    const curr = Number(sequence[i]);
    const lowest = Number(sequence[lowestIndexSoFar]);

    if (prev < lowest) {
      lowestIndexSoFar = i - 1;
    }

    if (prev < curr) {
      return lowestIndexSoFar;
    }

    if (i === sequence.length - 1 && curr < lowest) {
      lowestIndexSoFar = i;
    }
  }

  return lowestIndexSoFar;
}

function solve() {
  const instructions = getInstructions();

  let sum = 0;

  for (let bank of instructions) {
    let bankArray = Array.from(bank);

    while (bankArray.length > 12) {
      const toRemove = findIndexOfEarliestLocalMinimum(bankArray);
      delete bankArray[toRemove];
      bankArray = bankArray.filter((b) => !!b);
    }

    sum += Number(bankArray.join(""));
  }

  console.log("sum", sum);
}

solve();

export {};
