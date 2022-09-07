import { input, print } from "../common.ts";

function hill() {
  return input(2020, 3).split("\n").map((line) => [...line]);
}

const xMax = hill()[0].length;

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

console.log(sledWithSlope(3, 1, hill()));
