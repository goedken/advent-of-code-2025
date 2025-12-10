import * as fs from 'fs';
import * as path from 'path';

const EXAMPlE_MODE = false;
const FILE_NAME = EXAMPlE_MODE ? 'example.txt' : 'input.txt';

type JunctionBox = [number, number, number];

function getInstructions(): JunctionBox[] {
  const filePath = path.join(__dirname, FILE_NAME);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return fileContent
    .trim()
    .split('\n')
    .map((r) => r.split(',').map(Number) as JunctionBox);
}

function getDistance(a: JunctionBox, b: JunctionBox): number {
  return Math.sqrt(
    (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2
  );
}

function getKey(i: number, j: number): string {
  const arr = [i, j].sort();
  return arr.map(String).join('-');
}

function match(boxA: number, boxB: number, circuits: Set<number>[]): boolean {
  let alreadyConnectedCircuit: Set<number> | null = null;
  let matchFound = false;

  for (let i = 0; i < circuits.length; i++) {
    const circuit = circuits[i];

    if (circuit.has(boxA) && circuit.has(boxB)) {
      return true;
    }

    if (circuit.has(boxA) || circuit.has(boxB)) {
      if (alreadyConnectedCircuit) {
        Array.from(circuit.values()).map((v) =>
          alreadyConnectedCircuit!.add(v)
        );
        circuit.clear();
        return true;
      }

      circuit.add(boxA);
      circuit.add(boxB);
      alreadyConnectedCircuit = circuit;
      matchFound = true;
    }
  }

  return matchFound;
}

function solve() {
  const list = getInstructions();

  const distances = new Map<string, number>();

  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list.length; j++) {
      if (i === j) {
        continue;
      }

      const boxA = list[i];
      const boxB = list[j];

      distances.set(getKey(i, j), getDistance(boxA, boxB));
    }
  }

  const sorted = Array.from(distances.entries()).sort((a, b) => a[1] - b[1]);

  let circuits: Set<number>[] = list.map((_l, i) => {
    return new Set([i]);
  });

  for (let distance of sorted) {
    const [boxA, boxB] = distance[0].split('-').map(Number);

    const matchFound = match(boxA, boxB, circuits);

    circuits = circuits.filter((c) => c.size);

    if (circuits.length === 1) {
      const junctionA = list[boxA];
      const junctionB = list[boxB];
      console.log(junctionA[0] * junctionB[0]);
      break;
    }

    if (!matchFound) {
      circuits.push(new Set([boxA, boxB]));
    }
  }
}

solve();
