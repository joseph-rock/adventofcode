import { input, print } from "common";

function calorieCounts(raw: string): number[] {
  return raw.split("\n\n")
    .map((line) =>
      line.split("\n")
        .map((num) => parseInt(num))
        .reduce((total, num) => total += num)
    );
}

function pt1(raw: string): number {
  return Math.max(...calorieCounts(raw));
}

function pt2(raw: string): number {
  return calorieCounts(raw)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce(
      (total, num) => total += num,
      0,
    );
}

const raw = input(2022, 1);
print(pt1(raw), pt2(raw));
