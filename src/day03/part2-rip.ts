import * as fs from "fs";
import * as path from "path";

function getInstructions(): string[] {
  // Read the file and store each line in an array
  const filePath = path.join(__dirname, "example.txt");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const instructions = fileContent.trim().split("\n");
  return instructions;
}

function joltify(
  bank: string,
  shouldKeep: (a: number, b: number, removals: number) => boolean
): string {
  const joltageNums: number[] = [];
  let numRemovals = 0;

  for (let i = 0; i < bank.length; i++) {
    const curr = Number(bank[i]);
    const next = Number(bank[i + 1]);

    if (shouldKeep(curr, next, numRemovals)) {
      joltageNums.push(curr);
    } else {
      numRemovals++;
    }
  }

  return joltageNums.join("");
}

function solve() {
  const instructions = getInstructions();

  let sum = 0;

  for (let bank of instructions) {
    const forward = joltify(
      bank,
      (curr, next, numRemovals) =>
        numRemovals === bank.length - 12 || !next || curr >= next
    );

    if (forward.length === 12) {
      sum += Number(forward);
      console.log("joltage found", Number(forward))
      continue;
    }

    const backward = joltify(
      forward,
      (curr, next, numRemovals) =>
        numRemovals === forward.length - 12 || !next || curr > next
    );

    if (backward.length > 12) {
      throw new Error("fuck");
    }

    console.log('joltage found', Number(backward))
    sum += Number(backward);
  }

  console.log("sum", sum);
}

solve();

export {};
