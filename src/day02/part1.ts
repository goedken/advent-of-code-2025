// Advent of Code - Day 1, Part 1
import * as fs from "fs";
import * as path from "path";

function getInstructions(): string[][] {
  // Read the file and store each line in an array
  const filePath = path.join(__dirname, "input.txt");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const instructions = fileContent.trim().split(",").map(i => i.split('-'));
  return instructions;
}

function sumInvalids(low: number, high: number): number {
  let sum: number = 0;

  for (let i = low; i <= high; i++) {
    const curr = String(i);

    // invalid IDs can't have an odd number of digits
    if (curr.length % 2 !== 0) {
      continue;
    }

    const firstHalf = curr.substring(0, curr.length / 2);
    const secondHalf = curr.substring(curr.length / 2, curr.length);

    if (firstHalf === secondHalf) {
      sum += i;
    }
  }

  return sum;
}

function solve() {
  const instructions = getInstructions();

  let sum: number = 0;
  for (let pair of instructions) {
    const [low, high] = pair;
    sum += sumInvalids(Number(low), Number(high));
  }

  console.log(sum)
}

solve();

export {};
