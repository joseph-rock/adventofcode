function puzzleInput(): number[] {
  const input = Deno.readTextFileSync("../../input/2020/day1.txt").split("\n");
  return input.map((e) => parseInt(e));
}

function partOne() {
  const input: number[] = puzzleInput();
  const ans: number = input.find((e) => input.includes(2020 - e)) || 0;
  console.log("Part 1: ", ans * (2020 - ans));
}

partOne();
