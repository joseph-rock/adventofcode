import _Set from "https://deno.land/x/ramda@v0.27.2/source/internal/_Set.js";
import { input, print } from "../common.ts";
import { uniq } from "../deps.ts";

function uniqWindow(raw: string, size: number): number {
  const list = raw.split("");

  for (let start = 0; start < list.length - size; start++) {
    const end = start + size;
    const window = list.slice(start, end);
    if (uniq(window).length === size) return end;
  }
  return -1;
}

function pt1(raw: string): number {
  return uniqWindow(raw, 4);
}

function pt2(raw: string): number {
  return uniqWindow(raw, 14);
}

const raw = input(2022, 6);
print(pt1(raw), pt2(raw));
