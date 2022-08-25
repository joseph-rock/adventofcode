import { input } from "../common.ts";

interface PasswordPolicy {
  min: number;
  max: number;
  char: string;
  password: string;
}

function constructPasswordPolicy(input: string[]): PasswordPolicy {
  return {
    min: parseInt(input[0]),
    max: parseInt(input[1]),
    char: input[2],
    password: input[3],
  };
}

function puzzleInput(): PasswordPolicy[] {
  return input(2020, 2)
    .split("\n")
    .map((e) => e.replace(":", ""))
    .map((e) => e.replace("-", " "))
    .map((e) => e.split(" "))
    .map((e) => constructPasswordPolicy(e));
}

function count(str: string, char: string): number {
  return str.split(char).length - 1;
}

function partOne(): number {
  return puzzleInput().filter((pw) =>
    count(pw.password, pw.char) >= pw.min &&
    count(pw.password, pw.char) <= pw.max
  ).length;
}

function partTwo(): number {
  return puzzleInput().filter((pw) =>
    pw.password.at(pw.min - 1) !=
      pw.password.at(pw.max - 1) &&
    (pw.password.at(pw.min - 1) == pw.char ||
      pw.password.at(pw.max - 1) == pw.char)
  ).length;
}

console.log("Part 1:", partOne());
console.log("Part 2:", partTwo());
