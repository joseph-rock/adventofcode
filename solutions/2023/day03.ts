import { input, print } from "common";

function main() {
  const raw = input(2023, 3);
  print(pt1(raw), pt2(raw));
}

function pt1(raw: string): number {
  const schematic = engineSchematic(raw);
  const partNumbers = [];
  for (let y = 0; y < schematic.length; y++) {
    for (let x = 0; x < schematic[0].length; x++) {
      if (isNum(schematic[y][x]) && hasAdjacentSymbol(schematic, y, x)) {
        x = rightBoundary(schematic[y], x);
        const partNumber = getPartNumber(schematic[y], x);
        partNumbers.push(partNumber);
      }
    }
  }
  return partNumbers
    .reduce((total, partNumber) => total += partNumber, 0);
}

function pt2(raw: string): number {
  const schematic = engineSchematic(raw);
  const gearRatios = [];
  for (let y = 0; y < schematic.length; y++) {
    for (let x = 0; x < schematic[0].length; x++) {
      if (schematic[y][x] === "*") {
        const partNumbers = adjacentNumbers(schematic, y, x);
        if (partNumbers.length === 2) {
          const gearRatio = partNumbers[0] * partNumbers[1];
          gearRatios.push(gearRatio);
        }
      }
    }
  }
  return gearRatios
    .reduce((total, ratio) => total += ratio, 0);
}

function engineSchematic(raw: string): string[][] {
  return raw.split("\n").map((line) => line.split(""));
}

function isNum(string: string): boolean {
  return /^[0-9]*$/.test(string);
}

function hasAdjacentSymbol(
  schematic: string[][],
  yCoord: number,
  xCoord: number,
): boolean {
  const xLimit = schematic[0].length - 1;
  const yLimit = schematic.length - 1;
  for (let y = yCoord - 1; y <= yCoord + 1; y++) {
    if (y < 0 || y > yLimit) continue;
    for (let x = xCoord - 1; x <= xCoord + 1; x++) {
      if (x < 0 || x > xLimit) continue;
      if (schematic[y][x] !== "." && !isNum(schematic[y][x])) {
        return true;
      }
    }
  }
  return false;
}

function adjacentNumbers(
  schematic: string[][],
  yCoord: number,
  xCoord: number,
): number[] {
  const xLimit = schematic[0].length - 1;
  const yLimit = schematic.length - 1;
  const partNumbers = [];
  for (let y = yCoord - 1; y <= yCoord + 1; y++) {
    if (y < 0 || y > yLimit) continue;
    for (let x = xCoord - 1; x <= xCoord + 1; x++) {
      if (x < 0 || x > xLimit) continue;
      if (isNum(schematic[y][x])) {
        x = rightBoundary(schematic[y], x);
        const partNumber = getPartNumber(schematic[y], x);
        partNumbers.push(partNumber);
      }
    }
  }
  return partNumbers;
}

function getPartNumber(line: string[], cursor: number): number {
  const left = leftBoundary(line, cursor);
  const right = rightBoundary(line, cursor) + 1;
  const num = line.slice(left, right).join("");
  return parseInt(num);
}

function rightBoundary(line: string[], x: number): number {
  if (x + 1 >= line.length || !isNum(line[x + 1])) return x;
  return rightBoundary(line, x + 1);
}

function leftBoundary(line: string[], x: number): number {
  if (x - 1 < 0 || !isNum(line[x - 1])) return x;
  return leftBoundary(line, x - 1);
}

main();
