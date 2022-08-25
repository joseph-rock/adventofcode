function puzzleInput(): number[] {
  const input = Deno.readTextFileSync("../../input/2020/day1.txt").split("\n");
  return input.map((e) => parseInt(e));
}

function partOne() {
  const input: number[] = puzzleInput();
  const ans: number = input.find((e) => input.includes(2020 - e)) || 0;
  console.log("Part 1: ", ans * (2020 - ans));
}

function partTwo() {
  const input: number[] = puzzleInput();
  const num1: number = input.find((e) => thirdNum(input, e)) || 0;
  const num2: number = thirdNum(input, num1);
  const num3: number = 2020 - num1 - num2;

  console.log("Part 2: ", num1 * num2 * num3);
}

function thirdNum(input: number[], num: number): number {
  return input.find((e) => input.includes(2020 - e - num)) || 0;
}

partOne();
partTwo();
