import { input, print, toNumArray } from "common";

function main() {
  const raw = input(2023, 9);
  pt1(raw);
}

function pt1(raw: string) {
  const OASISHistory = raw
    .split("\n")
    .map((line) => toNumArray(line, " "));

  const foo = OASISHistory.map((line) => getHistory(line));
  console.log(foo);
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

function extrapolate(history: number[][]) {
  return 1;
}

main();
