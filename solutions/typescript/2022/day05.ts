import { input, print } from "../common.ts";
import { clone, transpose } from "../deps.ts";

interface Instruction {
  amt: number;
  from: number;
  to: number;
}

function instruction(list: string[]): Instruction {
  const a = parseInt(list[0]);
  const f = parseInt(list[1]);
  const t = parseInt(list[2]);
  return { amt: a, from: f - 1, to: t - 1 };
}

function seed(raw: string): string[][] {
  const sections = raw.split("\n\n");

  const re = /[\[|\]]/g;
  const arr = sections[0]
    .replaceAll(re, " ")
    .split("\n").map((line) => line.split(""));
  arr.pop();

  const rotatedArr = transpose(arr);
  const filtered = rotatedArr.filter((row: string[]) =>
    row.some((char) => char !== " ")
  );

  const reversed = filtered.map((group: string[]) => {
    group = group.filter((char) => char !== " ");
    return group.reverse();
  });

  return reversed;
}

function instList(raw: string) {
  const sections = raw.split("\n\n");
  const rawInst = sections[1].split("\n");
  const nums = rawInst.map((line) =>
    line.split(" ").filter((sects) => parseInt(sects))
  );

  const instructionList = nums.map((a) => instruction(a));

  return instructionList;
}

function executePt1(inst: Instruction, chart: string[][]): string[][] {
  const copy = clone(chart);
  for (let i = 0; i < inst.amt; i++) {
    copy[inst.to].push(copy[inst.from].pop());
  }
  return copy;
}

function executePt2(inst: Instruction, chart: string[][]): string[][] {
  const copy = clone(chart);
  copy[inst.to].push(...copy[inst.from].slice(-inst.amt));
  for (let i = 0; i < inst.amt; i++) {
    copy[inst.from].pop();
  }
  return copy;
}

function pt1(raw: string) {
  let chart = seed(raw);
  const inst = instList(raw);

  inst.forEach((i) => chart = executePt1(i, chart));

  return chart.reduce((final: string, line) => final += line.pop(), "");
}

function pt2(raw: string) {
  let chart = seed(raw);
  const inst = instList(raw);

  inst.forEach((i) => chart = executePt2(i, chart));

  return chart.reduce((final: string, line) => final += line.pop(), "");
}

const raw = input(2022, 5);
print(pt1(raw), pt2(raw));
