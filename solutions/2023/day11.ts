import { input, print } from "common";

function main() {
  const raw = input(2023, 11);
  pt1(raw);
}

function pt1(raw: string) {
  const space = raw.split("\n")
    .map((line) => line.split(""));
  const expandedSpace = expandSpace(space);
}

function expandSpace(space: string[][]): string[][] {
  let copy: string[][] = structuredClone(space);

  return copy;
}

function rotate(array: string[][]): string[][] {
  const rotatedArray: string[][] = structuredClone(array);
  for (let y = 0; y < array.length; y++) {
    for (let x = 0; x < array[y].length; x++) {
      rotatedArray[x][y] = array[y][x];
    }
  }
  return rotatedArray;
}

main();
