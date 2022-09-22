import { input, print } from "../common.ts";

function puzzleInput() {
  const array = input(2020, 14).split("\n");
  return array.map((line) =>
    line.includes("mask") ? maskInst(line) : writeInst(line)
  );
}

type Instruction = {
  isMask: boolean;
  address?: number;
  value: number | string;
};

function maskInst(line: string): Instruction {
  return { isMask: true, value: line.replace("mask = ", "") };
}

function writeInst(line: string): Instruction {
  const nums = line.match(/[0-9]+/g);

  return nums?.length === 2
    ? { isMask: false, address: parseInt(nums[0]), value: parseInt(nums[1]) }
    : { isMask: false, value: -1 };
}

function pt1(input: (Instruction)[]) {
  let currentMask = "";
  for (const inst of input) {
    if (inst.isMask) {
      console.log(inst.value);
    } else {
      console.log(inst);
    }
  }
}

pt1(puzzleInput());
