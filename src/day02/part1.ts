import * as fs from "fs";
import * as path from "path";

function getInstructions(): string[][] {
  // Read the file and store each line in an array
  const filePath = path.join(__dirname, "input.txt");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const instructions = fileContent
    .trim()
    .split(",")
    .map((i) => i.split("-"));
  return instructions;
}

function isInvalid(id: number): boolean {
  const curr = String(id);

  // invalid IDs can't have an odd number of digits
  if (curr.length % 2 !== 0) {
    return false;
  }

  const firstHalf = curr.substring(0, curr.length / 2);
  const secondHalf = curr.substring(curr.length / 2, curr.length);

  return firstHalf === secondHalf;
}

function solve() {
  const instructions = getInstructions();

  let sum: number = 0;
  for (let pair of instructions) {
    const [low, high] = pair;
    for (let i = Number(low); i <= Number(high); i++) {
      if (isInvalid(i)) {
        sum += i;
      }
    }
  }

  console.log(sum);
}

solve();

export {};
