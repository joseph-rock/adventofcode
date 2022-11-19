import { uniq } from "../deps.ts";
import { input, print } from "../common.ts";

function puzzleInput(): number[] {
  return input(2020, 1)
    .split("\n")
    .map((e) => parseInt(e));
}

const partOne = (input: number[]) =>
  input.flatMap((x) => input.flatMap((y) => x + y === 2020 ? [x * y] : []));

const partTwo = (input: number[]) =>
  input.flatMap((x) =>
    input.flatMap((y) =>
      input.flatMap((z) => x + y + z === 2020 ? [x * y * z] : [])
    )
  );

print(uniq(partOne(puzzleInput())), uniq(partTwo(puzzleInput())));
