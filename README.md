# Advent of Code 2025

Solutions for [Advent of Code 2025](https://adventofcode.com/2025) written in TypeScript.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [pnpm](https://pnpm.io/) (version 10.13.1 or higher)

## Installation

Install dependencies:

```bash
pnpm install
```

## Project Structure

```
advent-of-code-2025/
├── src/
│   ├── day01/
│   │   ├── part1.ts       # Solution for Day 1, Part 1
│   │   ├── part2.ts       # Solution for Day 1, Part 2
│   │   ├── example.txt    # Example input
│   │   └── input.txt      # Puzzle input
│   ├── day02/
│   │   └── ...
│   └── ...
├── package.json
├── tsconfig.json
└── run.sh
```

Each day's solutions are organized in their own directory with:
- `part1.ts` and `part2.ts` - TypeScript solution files
- `input.txt` - The puzzle input
- `example.txt` - Example input for testing

## Running Solutions

Use the provided script to run a specific day and part:

```bash
pnpm solve <day> <part>
```

Examples:

```bash
# Run Day 1, Part 1
pnpm solve 1 1

# Run Day 1, Part 2
pnpm solve 1 2

# Run Day 12, Part 1
pnpm solve 12 1
```

The script will automatically format the day number with leading zeros and execute the corresponding TypeScript file using `tsx`.

## Development

The project uses:
- **TypeScript** for type-safe code
- **tsx** for running TypeScript files directly without compilation
- **@types/node** for Node.js type definitions

## Notes

- Input files (`input.txt`) contain personalized puzzle inputs from Advent of Code
- Solutions are run directly using `tsx` without a separate build step
- Each solution reads its input from the corresponding directory
- All solutions are written entirely by hand without AI assistance (as you can probably tell lol)

## License

ISC
