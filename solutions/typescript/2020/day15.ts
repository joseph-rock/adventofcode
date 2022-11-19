import { input, print } from "../common.ts";

function startingNumbers(): number[] {
  return input(2020, 15).split(",").map((num) => parseInt(num));
}

function nthNumSpoken(size: number, seed: number[]): number {
  const memo: Record<number, number> = {};
  seed.map((num, i) => memo[num] = i);

  let cur = seed[seed.length - 1];
  let idx = seed.length - 1;

  while (idx < size - 1) {
    let next = 0;

    if (cur in memo) {
      next = idx - memo[cur];
    }

    memo[cur] = idx;
    cur = next;
    idx += 1;
  }

  return cur;
}

function pt1(nums: number[]) {
  return nthNumSpoken(2020, nums);
}

function pt2(nums: number[]) {
  return nthNumSpoken(30000000, nums);
}

print(pt1(startingNumbers()), pt2(startingNumbers()));
