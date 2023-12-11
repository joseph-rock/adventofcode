import { input, print } from "common";

function main() {
  const raw = input(2023, 3);
  pt1(raw);
}

function pt1(raw: string) {
  const schematic = engineSchematic(raw);
  for (let y = 0; y < schematic.length; y++) {
    for (let x = 0; x < schematic[0].length; x++) {
      if (isNum(schematic[y][x]) && checkAdjacent(schematic, y, x)) {
        console.log(x, y);
      }
    }
  }
}

function pt2(raw: string) {
}

function engineSchematic(raw: string): string[][] {
  return raw.split("\n").map((line) => line.split(""));
}

function checkAdjacent(schematic: string[][], ycoord: number, xcoord: number) {
  const xLimit = schematic[0].length - 1;
  const yLimit = schematic.length - 1;

  for (let y = ycoord - 1; y <= ycoord + 1; y++) {
    if (y < 0 || y > yLimit) continue;
    for (let x = xcoord - 1; x <= xcoord + 1; x++) {
      if (x < 0 || x > xLimit) continue;
      if (schematic[y][x] !== "." && !isNum(schematic[y][x])) {
        return true;
      }
    }
  }
  return false;
}

function isNum(string: string): boolean {
  return /^[0-9]*$/.test(string);
}

main();
