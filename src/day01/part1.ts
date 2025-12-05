import * as fs from "fs";
import * as path from "path";

function getInstructions(): string[] {
  // Read the file and store each line in an array
  const filePath = path.join(__dirname, "part1.txt");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const instructions = fileContent.trim().split("\n");
  return instructions;
}

function parseInstruction(ins: string): number {
  const dir = ins.slice(0, 1);
  const magnitude = Number(ins.slice(1));
  return dir === 'R' ? magnitude : -magnitude;
}

function moveDial(start: number, instruction: number): number {
  const naivePos = start + instruction;
  const modded = naivePos % 100;
  if (modded < 0) {
    return modded + 100;
  }
  return modded;
}

function solve() {
  const instructions = getInstructions();

  let dial = 50;
  console.log("Starting at 50...")

  let numZeros = 0;

  for (let i of instructions) {
    const parsed = parseInstruction(i); 
    dial = moveDial(dial, parsed);
    console.log(i, dial)
    if (dial === 0) {
      numZeros++;
      console.log("yay! zero found", numZeros)
    }
  }

  console.log("We found dis many zeros", numZeros)
}

solve();
