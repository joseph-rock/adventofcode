import { input, print } from "../common.ts";

function puzzleInput(): string[][] {
  return input(2020, 6)
    .split("\n\n")
    .map((line) => line.split("\n"));
}

function pt1(puzzleInput: string[][]): number {
  return puzzleInput.reduce((count, groupAns) =>
    count += new Set(
      groupAns.map((indAns) => indAns.split("")).flat(),
    )
      .size, 0);
}

print(pt1(puzzleInput()));
