import * as fs from "fs";
import * as path from "path";

function getInstructions(): string[] {
  // Read the file and store each line in an array
  const filePath = path.join(__dirname, "input.txt");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const instructions = fileContent.trim().split("\n");
  return instructions;
}

function solve() {
  const instructions = getInstructions();

  let sum = 0;

  for (let set of instructions) {
    let tens = { index: 0, num: 0 };
    let ones = { index: 0, num: 0 };

    for (let i = 0; i < set.length; i++) {
      const curr = Number(set[i]);
      if (curr > tens.num && i !== set.length - 1) {
        tens = { index: i, num: curr };
        ones = { index: i + 1, num: Number(set[i + 1]) };
      } else if (curr > ones.num) {
        ones = { index: i, num: curr };
      }
    }

    sum += tens.num * 10 + ones.num;
  }

  console.log("sum", sum)
}

solve();

export {};
