import { input, print, toNumArray } from "common";
import { last } from "ramda";

function main() {
  const raw = input(2023, 9);
  print(pt1(raw));
}

function pt1(raw: string) {
  const OASISHistory = raw
    .split("\n")
    .map((line) => toNumArray(line, " "));

  const foo = OASISHistory.map((line) => getHistory(line));
  const bar = foo.map((a) => extrapolateRight(a));
  return bar.reduce((total, num) => total += num, 0);
}

function pt2(raw: string) {
}

function getHistory(line: number[]) {
  const history: number[][] = [line];
  let next = line;
  while (next.some((num) => num !== 0)) {
    next = nextHistory(next);
    history.push(next);
  }
  return history;
}

function nextHistory(line: number[]) {
  const next: number[] = [];
  for (let i = 0; i < line.length - 1; i++) {
    next.push(line[i + 1] - line[i]);
  }
  return next;
}

function extrapolateRight(history: number[][]) {
  return history.reduce((total, numList) => total += last(numList), 0);
}

function extrapolateLeft(history: number[][]) {
}

main();
