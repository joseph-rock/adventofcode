import { input, print } from "../common.ts";

interface Range {
  min: number;
  max: number;
}

function ranges(raw: string) {
  const value = raw.split(/[-|,]/).map((num) => parseInt(num));
  return [{ min: value[0], max: value[1] }, { min: value[2], max: value[3] }];
}

function fullContain(a: Range, b: Range): boolean {
  return (a.min <= b.min && a.max >= b.max) ||
    (b.min <= a.min && b.max >= a.max);
}

function overlap(a: Range, b: Range): boolean {
  let low = a;
  let high = b;
  if (a.min > b.min) {
    low = b;
    high = a;
  }

  return low.max >= high.min;
}

function pt1(raw: string) {
  const elfPairs = raw.split("\n").map((group) => ranges(group));
  return elfPairs.reduce(
    (sum, elf) => fullContain(elf[0], elf[1]) ? sum + 1 : sum,
    0,
  );
}

function pt2(raw: string) {
  const elfPairs = raw.split("\n").map((group) => ranges(group));
  return elfPairs.reduce(
    (sum, elf) => overlap(elf[0], elf[1]) ? sum + 1 : sum,
    0,
  );
}

const raw = input(2022, 4);
print(pt1(raw), pt2(raw));
