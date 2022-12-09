import { input, print } from "common";

function startingNumbers(): string[][] {
  return input(2020, 5).split("\n").map((line) => line.split(""));
}

function calcRow(inst: string[]): number {
  let rowTotal = 128;
  let rowNum = 127;

  for (const i of inst) {
    rowTotal /= 2;
    if (i === "F") {
      rowNum -= rowTotal;
    }
  }

  return rowNum;
}

function calcCol(inst: string[]): number {
  let colTotal = 8;
  let colNum = 7;

  for (const i of inst) {
    colTotal /= 2;
    if (i === "L") {
      colNum -= colTotal;
    }
  }

  return colNum;
}

function boardingpassID(row: number, col: number): number {
  return (row * 8) + col;
}

function pt1(input: string[][]) {
  let highest = 0;

  for (const line of input) {
    const rowInst = line.slice(0, 7);
    const colInst = line.slice(7);
    const bpid = boardingpassID(calcRow(rowInst), calcCol(colInst));
    if (bpid > highest) {
      highest = bpid;
    }
  }

  return highest;
}

function pt2(input: string[][]) {
  const bp: number[] = [];

  for (const line of input) {
    const rowInst = line.slice(0, 7);
    const colInst = line.slice(7);
    const bpid = boardingpassID(calcRow(rowInst), calcCol(colInst));
    bp.push(bpid);
  }

  bp.sort();
  return bp.filter((num) => !bp.includes(num + 1))[0] + 1;
}

print(pt1(startingNumbers()), pt2(startingNumbers()));
