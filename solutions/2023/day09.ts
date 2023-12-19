import { input, print, toNumArray } from "common";
import { last } from "ramda";

function main() {
  const raw = input(2023, 9);
  print(pt1(raw), pt2(raw));
}

function pt1(raw: string): number {
  const OASISHistory = raw
    .split("\n")
    .map((line) => toNumArray(line, " "));

  return OASISHistory
    .map((line) => expandHistory(line))
    .map((history) => extrapolateRight(history))
    .reduce((total, num) => total += num, 0);
}

function pt2(raw: string): number {
  const OASISHistory = raw
    .split("\n")
    .map((line) => toNumArray(line, " "));

  return OASISHistory
    .map((line) => expandHistory(line))
    .map((history) => extrapolateLeft(history))
    .reduce((total, num) => total += num, 0);
}

function expandHistory(line: number[]): number[][] {
  const history: number[][] = [line];
  let next = line;
  while (next.some((num) => num !== 0)) {
    next = nextHistory(next);
    history.push(next);
  }
  return history;
}

function nextHistory(line: number[]): number[] {
  const next: number[] = [];
  for (let i = 0; i < line.length - 1; i++) {
    next.push(line[i + 1] - line[i]);
  }
  return next;
}

function extrapolateRight(history: number[][]): number {
  return history.reduce((total, numList) => total += last(numList), 0);
}

function extrapolateLeft(history: number[][]): number {
  let prev = 0;
  for (let i = history.length - 1; i >= 0; i--) {
    const curr = history[i][0];
    prev = curr - prev;
  }
  return prev;
}

main();
