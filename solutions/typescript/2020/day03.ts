import { input, print } from "common";

const xMax = hill()[0].length;

function hill() {
  return input(2020, 3).split("\n").map((line) => [...line]);
}

function moveRight(position: number, amount: number): number {
  return position + amount >= xMax
    ? position + amount - xMax
    : position + amount;
}

function sledWithSlope(x: number, y: number, hill: string[][]) {
  let count = 0;
  let column = 0;

  for (let row = y; row < hill.length; row += y) {
    column = moveRight(column, x);
    if (hill[row][column] === "#") {
      count += 1;
    }
  }

  return count;
}

function partOne(hill: string[][]): number {
  return sledWithSlope(3, 1, hill);
}

function partTwo(hill: string[][]): number {
  return sledWithSlope(1, 1, hill) *
    sledWithSlope(3, 1, hill) *
    sledWithSlope(5, 1, hill) *
    sledWithSlope(7, 1, hill) *
    sledWithSlope(1, 2, hill);
}

print(partOne(hill()), partTwo(hill()));
