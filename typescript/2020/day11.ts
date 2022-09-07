import { input, print } from "../common.ts";
import { equals } from "https://deno.land/x/ramda@v0.27.2/mod.ts";

interface coord {
  x: number;
  y: number;
}

const xMax = chart()[0].length;
const yMax = chart().length;

function partOne(): number {
  return totalOccSeats(stableChart(chart(), adjOccSeats, 4));
}

function partTwo(): number {
  return totalOccSeats(stableChart(chart(), dirOccSeats, 5));
}

type occSeats = (coord: coord, chart: string[][]) => number;

function stableChart(
  chart: string[][],
  occSeats: occSeats,
  tol: number,
): string[][] {
  const newChart = flipSeats(chart, occSeats, tol);
  if (equals(newChart, chart)) {
    return newChart;
  }
  return stableChart(newChart, occSeats, tol);
}

function flipSeats(
  chart: string[][],
  occSeats: occSeats,
  tol: number,
): string[][] {
  return chart.map((row, y) =>
    row.map((char, x) => flipSeat(char, occSeats({ x, y }, chart), tol))
  );
}

function flipSeat(char: string, neighbors: number, tol: number): string {
  if (char === "L" && neighbors === 0) {
    return "#";
  } else if (char === "#" && neighbors >= tol) {
    return "L";
  }
  return char;
}

function adjOccSeats(coord: coord, chart: string[][]): number {
  let counter = 0;
  for (let iy = coord.y - 1; iy <= coord.y + 1; iy++) {
    for (let ix = coord.x - 1; ix <= coord.x + 1; ix++) {
      if (indexInRange(ix, iy) && chart[iy][ix] === "#") {
        counter++;
      }
    }
  }

  return chart[coord.y][coord.x] === "#" ? counter - 1 : counter;
}

function dirOccSeats(coord: coord, chart: string[][]): number {
  let counter = 0;

  for (let ys = -1; ys <= 1; ys++) {
    for (let xs = -1; xs <= 1; xs++) {
      if (!slopeIsZero(xs, ys) && dirIsOcc(coord.x, coord.y, xs, ys, chart)) {
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
  if (!indexInRange(x + xs, y + ys) || chart[y + ys][x + xs] === "L") {
    return false;
  }
  if (chart[y + ys][x + xs] === "#") {
    return true;
  }
  return (dirIsOcc(x + xs, y + ys, xs, ys, chart));
}

function chart(): string[][] {
  return input(2020, 11)
    .split("\n")
    .map((line) => [...line]);
}

function indexInRange(x: number, y: number): boolean {
  return x >= 0 && x < xMax && y >= 0 && y < yMax;
}

function totalOccSeats(chart: string[][]): number {
  return chart.flat(2).filter((ch) => ch === "#").length;
}

function slopeIsZero(xs: number, ys: number): boolean {
  return xs === 0 && ys === 0;
}

print(partOne(), partTwo());
