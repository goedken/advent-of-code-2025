import * as fs from "fs";
import * as path from "path";

function getInstructions(): string[] {
  // Read the file and store each line in an array
  const filePath = path.join(__dirname, "input.txt");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const instructions = fileContent.trim().split("\n");
  return instructions;
}

function parseInstruction(ins: string): number {
  const dir = ins.slice(0, 1);
  const magnitude = Number(ins.slice(1));
  return dir === "R" ? magnitude : -magnitude;
}

function moveDial(
  start: number,
  instruction: number
): { position: number; numZeros: number } {
  const naivePos = start + instruction;
  let numZeros = 0;
  let finalPosition;

  // Handle switching signs
  if (naivePos > 0 && start < 0) {
    numZeros++;
  } else if (naivePos < 0 && start > 0) {
    numZeros++;
  }

  const modded = naivePos % 100;
  if (modded !== naivePos) {
    // We went too far and crossed zero
    const div = Math.abs(naivePos) / 100;
    if (div >= 1) {
      numZeros += Math.floor(div);
    }
  } else if (naivePos === 0) {
    // We landed on zero
    numZeros++;
  }

  if (modded < 0) {
    finalPosition = modded + 100;
  } else {
    finalPosition = modded;
  }

  return { position: finalPosition, numZeros };
}

function solve() {
  const instructions = getInstructions();

  let dial = 50;
  console.log("Starting at 50...");

  let totalZeros = 0;

  for (let i of instructions) {
    const parsed = parseInstruction(i);
    const { position, numZeros } = moveDial(dial, parsed);
    dial = position;
    totalZeros += numZeros;
  }

  console.log("We found dis many zeros", totalZeros);
}

solve();
