import { input, print } from "../common.ts";

function numCharsProcessed(raw: string, windowSize: number): number {
  const list = raw.split("");

  for (let start = 0; start < list.length - windowSize; start++) {
    const end = start + windowSize;
    const window = list.slice(start, end);
    const uniq = new Set(window);
    if (uniq.size === windowSize) return end;
  }
  return -1;
}

function pt1(raw: string): number {
  return numCharsProcessed(raw, 4);
}

function pt2(raw: string): number {
  return numCharsProcessed(raw, 14);
}

const raw = input(2022, 6);
print(pt1(raw), pt2(raw));
