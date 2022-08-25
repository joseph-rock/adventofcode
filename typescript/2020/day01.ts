import { input, print } from "../common.ts";

function puzzleInput(): number[] {
  return input(2020, 1)
    .split("\n")
    .map((e) => parseInt(e));
}

function partOne(): number {
  const input: number[] = puzzleInput();
  const ans: number = input.find((e) => input.includes(2020 - e)) || 0;
  return ans * (2020 - ans);
}

function partTwo(): number {
  const input: number[] = puzzleInput();
  const num1: number = input.find((e) => thirdNum(input, e)) || 0;
  const num2: number = thirdNum(input, num1);
  const num3: number = 2020 - num1 - num2;

  return num1 * num2 * num3;
}

function thirdNum(input: number[], num: number): number {
  return input.find((e) => input.includes(2020 - e - num)) || 0;
}

print(partOne(), partTwo());
