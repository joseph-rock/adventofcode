import { input, print } from "../common.ts";

type Instruction = {
  mask?: number[];
  address?: number;
  value?: number;
};

function puzzleInput() {
  const array = input(2020, 14).split("\n");
  return array.map((line) =>
    line.includes("mask") ? maskInst(line) : writeInst(line)
  );
}

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

function addressMask(address: number, mask: number[]): number[] {
  const bin = toBinary(address);

  while (bin.length < mask.length) {
    bin.unshift(0);
  }

  for (let i = 0; i < mask.length; i++) {
    if (mask[i] !== 0) {
      bin[i] = mask[i];
    }
  }

  return floatingAddresses(bin);
}

function floatingAddresses(list: number[]): number[] {
  const addresses: number[] = [];
  const indicies: number[] = [];
  const count = list.filter((n) => isNaN(n)).length;
  const permutations = binaryRange(count);

  for (let num = 0; num < list.length; num++) {
    if (isNaN(list[num])) {
      indicies.push(num);
    }
  }

  for (const perm of permutations) {
    for (let i = 0; i < perm.length; i++) {
      list[indicies[i]] = perm[i];
    }
    addresses.push(fromBinary(list));
  }

  return addresses;
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
  const b = bin.slice(bin.findIndex((num) => num > 0)).reverse();
  let total = 0;

  for (let num = b.length - 1; num >= 0; num--) {
    total += b[num] * (2 ** num);
  }

  return total;
}

function setBinarySize(bin: number[], size: number) {
  while (bin.length < size) {
    bin.unshift(0);
  }
  return bin;
}

function binaryRange(size: number): number[][] {
  const permutations = [];

  for (let i = 0; i < 2 ** size; i++) {
    permutations.push(setBinarySize(toBinary(i), size));
  }

  return permutations;
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

function pt2(input: (Instruction)[]) {
  let currentMask: number[] = [];
  const mem = new Map();

  for (const inst of input) {
    if (inst.mask) {
      currentMask = inst.mask;
    } else if (inst.address && inst.value) {
      for (const address of addressMask(inst.address, currentMask)) {
        mem.set(address, inst.value);
      }
    }
  }

  return [...mem.values()]
    .reduce((total, num) => total += num);
}

print(pt1(puzzleInput()), pt2(puzzleInput()));
