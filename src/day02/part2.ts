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
  const curr = Array.from(String(id));

  let pattern: string = "";

  // Loop over each character in the id
  for (let j = 0; j < curr.length; j++) {
    // The pattern we will test for repetition
    pattern += curr[j];

    const rest = curr.slice(j + 1, curr.length);

    // We've tried every possible pattern
    if (pattern.length > rest.length) {
      return false;
    }

    let isFunny = true;

    // Loop over the part of the word that is not being tested as a pattern
    // A pattern must match every single candidate
    for (let k = 0; k < rest.length; k += pattern.length) {
      const candidate = rest.slice(k, k + pattern.length).join("");

      // This pattern didn't match a candidate, it can't be a funny id
      // Let's try longer patterns, though
      if (pattern !== candidate) {
        isFunny = false;
        break;
      }
    }

    // We've found a pattern that matches, it must be funny
    if (isFunny) {
      return true;
    }
  }

  // Technically shouldn't be reachable
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
