import { input, print } from "../common.ts";

interface Range {
  min: number;
  max: number;
}

function formatRange(raw: string) {
  const value = raw.split(/[-|,]/).map((num) => parseInt(num));
  return [{ min: value[0], max: value[1] }, { min: value[2], max: value[3] }];
}

function fullContain(l: Range, r: Range): boolean {
  return (l.min <= r.min && l.max >= r.max) ||
    (r.min <= l.min && r.max >= l.max);
}

function overlap(l: Range, r: Range): boolean {
  let low = l;
  let high = r;
  if (l.min > r.min) {
    low = r;
    high = l;
  }

  return low.max >= high.min;
}

function pt1(raw: string) {
  const sections = raw.split("\n");
  const ranges = sections.map((group) => formatRange(group));
  return ranges.reduce(
    (sum, group) => fullContain(group[0], group[1]) ? sum + 1 : sum,
    0,
  );
}

function pt2(raw: string) {
  const sections = raw.split("\n");
  const ranges = sections.map((group) => formatRange(group));
  return ranges.reduce(
    (sum, group) => overlap(group[0], group[1]) ? sum + 1 : sum,
    0,
  );
}

const raw = input(2022, 4);
print(pt1(raw), pt2(raw));
