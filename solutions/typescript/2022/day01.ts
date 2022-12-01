import { input, print } from "../common.ts";

const pt1 = input(2022, 1)
  .split("\n\n")
  .map((line) =>
    line.split("\n")
      .map((num) => parseInt(num))
      .reduce((total, num) => total += num)
  );

const pt2 = pt1.sort((a, b) => b - a)
  .slice(0, 3)
  .reduce(
    (total, num) => total += num,
    0,
  );

print(Math.max(...pt1), pt2);
