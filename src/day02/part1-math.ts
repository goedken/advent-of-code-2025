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

function isInvalid(candidate: number): boolean {
  const digits = Array.from(String(candidate));

  if (digits.length % 2 === 0) {
    return false;
  }

  let term: number = 0;

  // Start from the end
  for (let i = 0; i < digits.length / 2; i++) {
    const newDigit = digits[digits.length - i - 1];
    const newNum = Number(newDigit) * Math.pow(10, i);

    term += newNum;

    const left = candidate - term;

    const right = term * Math.pow(10, i + 1);

    if (right === left) {
      return true;
    }
  }

  return false;
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
