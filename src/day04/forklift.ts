export function forklift(
  coordinates: { x: number; y: number },
  grid: string[][]
): boolean {
  const { x, y } = coordinates;
  let rolls = 0;
  for (let i = y - 1; i <= y + 1; i++) {
    if (i < 0 || i >= grid.length) {
      continue;
    }

    for (let j = x - 1; j <= x + 1; j++) {
      if ((i === y && j === x) || j < 0 || j >= grid[i].length) {
        continue;
      }

      if (grid[i][j] === '@') {
        rolls++;
        if (rolls > 3) {
          return false;
        }
      }
    }
  }

  return true;
}
