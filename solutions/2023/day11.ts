import { input, print } from "common";

function main() {
  const raw = input(2023, 11);
  pt1(raw);
}

function pt1(raw: string) {
  const space = raw.split("\n")
    .map((line) => line.split(""));
  expandSpace(space);
}

function expandSpace(space: string[][]): string[][] {
  for (let i = 0; i < space.length; i++) {
    if (space[i].every((char) => char === ".")) {
      space.splice(i, 0, space[i]);
      i += 1;
    }
  }

  // TODO: expand columns

  return space;
}

main();

const foo = [];
foo[1] = "x";
console.log(foo);
