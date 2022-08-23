import * as mod from "https://deno.land/std@0.103.0/collections/mod.ts";
import { equal } from "https://deno.land/x/equal@v1.5.0/equal.ts";

console.log(partOne());
console.log(partTwo());

function partOne(): number {
  return totalOccSeats(stableChart(puzzleInput(), adjOccSeats, 4));
}

function partTwo(): number {
  return totalOccSeats(stableChart(puzzleInput(), dirOccSeats, 5));
}

type occSeats = (x: number, y: number, chart: string[][]) => number;

function stableChart(
  chart: string[][],
  occSeats: occSeats,
  tol: number,
): string[][] {
  const newChart = flipSeats(chart, occSeats, tol);
  if (equal(newChart, chart)) {
    return newChart;
  }
  return stableChart(newChart, occSeats, tol);
}

function flipSeats(
  chart: string[][],
  occSeats: occSeats,
  tol: number,
): string[][] {
  const newChart = cloneChart(chart);
  for (let y = 0; y < chart.length; y++) {
    for (let x = 0; x < chart[0].length; x++) {
      if (chart[y][x] == "L" && occSeats(x, y, chart) == 0) {
        newChart[y][x] = "#";
      } else if (chart[y][x] == "#" && occSeats(x, y, chart) >= tol) {
        newChart[y][x] = "L";
      }
    }
  }
  return newChart;
}

function adjOccSeats(x: number, y: number, chart: string[][]): number {
  const c = "#";

  let counter = 0;
  if (chart[y][x] == c) {
    counter = -1;
  }

  for (let iy = y - 1; iy < y + 2; iy++) {
    for (let ix = x - 1; ix < x + 2; ix++) {
      if (indexInRange(ix, iy, chart) && chart[iy][ix] == c) {
        counter++;
      }
    }
  }

  return counter;
}

function dirOccSeats(x: number, y: number, chart: string[][]): number {
  let counter = 0;

  for (let ys = -1; ys <= 1; ys++) {
    for (let xs = -1; xs <= 1; xs++) {
      if (!slopeIsZero(xs, ys) && dirIsOcc(x, y, xs, ys, chart)) {
        counter++;
      }
    }
  }

  return counter;
}

function dirIsOcc(
  x: number,
  y: number,
  xs: number,
  ys: number,
  chart: string[][],
): boolean {
  if (!indexInRange(x + xs, y + ys, chart) || chart[y + ys][x + xs] == "L") {
    return false;
  }
  if (chart[y + ys][x + xs] == "#") {
    return true;
  }
  return (dirIsOcc(x + xs, y + ys, xs, ys, chart));
}

function puzzleInput(): string[][] {
  const input = Deno.readTextFileSync("../../input/2020/day11.txt");
  return mod.chunked([...input].filter((c) => c != "\n"), input.indexOf("\n"));
}

function cloneChart(chart: string[][]): string[][] {
  return [...chart].map((line) => [...line]);
}

function indexInRange(x: number, y: number, chart: string[][]): boolean {
  return x >= 0 && x < chart[0].length && y >= 0 && y < chart.length;
}

function totalOccSeats(chart: string[][]): number {
  return chart.flat(2).filter((ch) => ch == "#").length;
}

function slopeIsZero(xs: number, ys: number): boolean {
  return xs == 0 && ys == 0;
}
