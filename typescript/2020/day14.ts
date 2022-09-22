import { input, print } from "../common.ts";

function puzzleInput() {
  const array = input(2020, 14).split("\n");
  return array.map((line) => line.includes("mask") ? mask(line) : write(line));
}

type Mask = {
  mask: string;
};

type Write = {
  address: number;
  value: number;
};

function mask(line: string): Mask {
  return { mask: line.replace("mask = ", "") };
}

function write(line: string): Write {
  const nums = line.match(/[0-9]+/g);

  return nums?.length === 2
    ? { address: parseInt(nums[0]), value: parseInt(nums[1]) }
    : { address: -1, value: -1 };
}

console.log(puzzleInput());
