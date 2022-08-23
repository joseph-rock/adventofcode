import * as mod from "https://deno.land/std@0.103.0/collections/mod.ts";
import { equal } from "https://deno.land/x/equal@v1.5.0/equal.ts";

function seatingChart(): string[][] {
  const input = Deno.readTextFileSync("./input/day11input.txt");
  return mod.chunked([...input].filter((c) => c != "\n"), input.indexOf("\n"));
}

function cloneChart(og: string[][]): string[][] {
  return [...og].map((line) => [...line]);
}

function indexInRange(x: number, y: number, input: string[][]): boolean {
  return x >= 0 && x < input[0].length && y >= 0 && y < input.length;
}

function totalOccupiedSeats(input: string[][]): number {
  return input.flat(2).filter((ch) => ch == "#").length;
}

function adjOccupiedSeats(x: number, y: number, input: string[][]): number {
  const c = "#";

  let counter = 0;
  if (input[y][x] == c) {
    counter = -1;
  }

  for (let iy = y - 1; iy < y + 2; iy++) {
    for (let ix = x - 1; ix < x + 2; ix++) {
      if (indexInRange(ix, iy, input) && input[iy][ix] == c) {
        counter++;
      }
    }
  }

  return counter;
}

function flipSeats(chart: string[][]): string[][] {
  const newChart = cloneChart(chart);
  for (let y = 0; y < chart.length; y++) {
    for (let x = 0; x < chart[0].length; x++) {
      if (chart[y][x] == "L" && adjOccupiedSeats(x, y, chart) == 0) {
        newChart[y][x] = "#";
      } else if (chart[y][x] == "#" && adjOccupiedSeats(x, y, chart) >= 4) {
        newChart[y][x] = "L";
      }
    }
  }
  return newChart;
}

function partOne(): void {
  let beforeInput = seatingChart();

  while (true) {
    const afterInput = flipSeats(beforeInput);
    if (equal(afterInput, beforeInput)) {
      break;
    }
    beforeInput = cloneChart(afterInput);
  }

  console.log(totalOccupiedSeats(beforeInput));
}

partOne();
