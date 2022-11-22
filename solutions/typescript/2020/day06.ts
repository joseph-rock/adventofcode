import { input, print } from "../common.ts";

function puzzleInput(): string[][] {
  return input(2020, 6)
    .split("\n\n")
    .map((line) => line.split("\n"));
}

function groupConsensus(group: string[]): number {
  const ansTotals: Record<string, number> = {};
  group.map((ind) =>
    ind.split("")
      .map((ans: string) =>
        ansTotals[ans] ? ansTotals[ans] += 1 : ansTotals[ans] = 1
      )
  );

  return Object.keys(ansTotals).reduce(
    (total, key) => ansTotals[key] === group.length ? total += 1 : total,
    0,
  );
}

function pt1(puzzleInput: string[][]): number {
  return puzzleInput.reduce((count, groupAns) =>
    count += new Set(
      groupAns.map((indAns) => indAns.split("")).flat(),
    )
      .size, 0);
}

function pt2(puzzleInput: string[][]): number {
  return puzzleInput.reduce(
    (count, groupAns) => count += groupConsensus(groupAns),
    0,
  );
}

print(pt1(puzzleInput()), pt2(puzzleInput()));
