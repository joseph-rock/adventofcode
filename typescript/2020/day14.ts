import { input, print } from "../common.ts";

function puzzleInput() {
  const array = input(2020, 14).split("\n");
  return array.map((line) =>
    line.includes("mask") ? maskInst(line) : writeInst(line)
  );
}

type Instruction = {
  mask?: number[];
  address?: number;
  value?: number;
};

function maskInst(line: string): Instruction {
  return {
    mask: [...line.replace("mask = ", "")].map((num) => parseInt(num)),
  };
}

function writeInst(line: string): Instruction {
  const nums = line.match(/[0-9]+/g);

  return nums?.length === 2
    ? { address: parseInt(nums[0]), value: parseInt(nums[1]) }
    : { value: -1 };
}

function valueMask(num: number, mask: number[]): number[] {
  const bin = toBinary(num);

  while (bin.length < mask.length) {
    bin.unshift(0);
  }

  return bin.map((bit, idx) => isNaN(mask[idx]) ? bit : mask[idx]);
}

function pt1(input: (Instruction)[]) {
  let currentMask: number[] = [];
  const mem = new Map();

  for (const inst of input) {
    if (inst.mask) {
      currentMask = inst.mask;
    } else if (inst.address && inst.value) {
      mem.set(inst.address, valueMask(inst.value, currentMask));
    }
  }

  return [...mem.values()]
    .map((num) => fromBinary(num))
    .reduce((total, num) => total += num);
}

function toBinary(num: number): number[] {
  let n = num;
  const binary: number[] = [];

  while (n > 0) {
    binary.unshift(n % 2);
    n = Math.floor(n / 2);
  }

  return binary;
}

function fromBinary(bin: number[]): number {
  const b = bin.reverse();
  let total = 0;

  for (let num = b.length - 1; num >= 0; num--) {
    total += b[num] * (2 ** num);
  }

  return total;
}

print(pt1(puzzleInput()));
