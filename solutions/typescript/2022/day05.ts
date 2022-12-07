import { input, print } from "../common.ts";
import { clone, transpose } from "../deps.ts";

interface Instruction {
  amt: number;
  from: number;
  to: number;
}

function instruction(line: string[]): Instruction {
  const amt = parseInt(line[0]);
  const from = parseInt(line[1]) - 1;
  const to = parseInt(line[2]) - 1;
  return { amt: amt, from: from, to: to };
}

function instList(raw: string) {
  const sections = raw.split("\n\n");
  const lines = sections[1].split("\n");
  const instructionList = lines
    .map((line) => line.split(" ").filter((char) => parseInt(char)))
    .map((line) => instruction(line));
  return instructionList;
}

function chartSeed(raw: string): string[][] {
  const sections = raw.split("\n\n");

  const re = /[\[|\]]/g;
  const arr = sections[0]
    .replaceAll(re, " ")
    .split("\n")
    .map((line) => line.split(""));
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

function moveSingles(inst: Instruction, chart: string[][]): string[][] {
  const copy = clone(chart);
  for (let i = 0; i < inst.amt; i++) {
    copy[inst.to].push(copy[inst.from].pop());
  }
  return copy;
}

function moveChunk(inst: Instruction, chart: string[][]): string[][] {
  const copy = clone(chart);
  const chunk = copy[inst.from].slice(-inst.amt);
  copy[inst.to].push(...chunk);
  for (let i = 0; i < inst.amt; i++) {
    copy[inst.from].pop();
  }
  return copy;
}

function pt1(raw: string) {
  let chart = chartSeed(raw);
  const instructions = instList(raw);
  instructions.forEach((inst) => chart = moveSingles(inst, chart));
  return chart.reduce((final: string, line) => final += line.pop(), "");
}

function pt2(raw: string) {
  let chart = chartSeed(raw);
  const instructions = instList(raw);
  instructions.forEach((inst) => chart = moveChunk(inst, chart));
  return chart.reduce((final: string, line) => final += line.pop(), "");
}

const raw = input(2022, 5);
print(pt1(raw), pt2(raw));
