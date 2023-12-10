import { input, print } from "common";
import { last } from "ramda";

function joltageList(): number[] {
  return input(2020, 10)
    .split("\n")
    .map((num) => parseInt(num))
    .sort((a, b) => a - b);
}

function pt1(jl: number[]): number {
  const target = last(jl);
  let diff1 = 0;
  let diff3 = 1;
  let current = 0;

  while (current < target) {
    if (jl.includes(current + 1)) {
      current += 1;
      diff1 += 1;
    } else if (jl.includes(current + 2)) {
      current += 2;
    } else if (jl.includes(current + 3)) {
      current += 3;
      diff3 += 1;
    } else {
      return -1;
    }
  }

  return diff1 * diff3;
}

function pt2(jl: number[]): number {
  const sol: Record<number, number> = { 0: 1 };
  for (const line of jl) {
    sol[line] = 0;
    if (sol[line - 1]) {
      sol[line] += sol[line - 1];
    }
    if (sol[line - 2]) {
      sol[line] += sol[line - 2];
    }
    if (sol[line - 3]) {
      sol[line] += sol[line - 3];
    }
  }

  return sol[last(jl)];
}

print(pt1(joltageList()), pt2(joltageList()));
