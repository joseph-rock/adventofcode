import { input, print } from "common";
import { sortBy } from "collections";
import { last } from "ramda";
import { assertExists } from "assert";

type Galaxy = {
  id: number;
  coordinates: { x: number; y: number };
  sector: { x: number; y: number };
};

function main() {
  const raw = input(2023, 11);
  print(pt1(raw), pt2(raw));
}

function pt1(raw: string) {
  const space = raw.split("\n")
    .map((line) => line.split(""));
  const boundaries = sectorBoundaries(space);
  const galaxyList = galaxies(space, boundaries);

  let distanceSum = 0;
  for (let left = 0; left < galaxyList.length; left++) {
    for (let right = left + 1; right < galaxyList.length; right++) {
      distanceSum += manhattenDistance(
        galaxyList[left],
        galaxyList[right],
        2,
      );
    }
  }
  return distanceSum;
}

function pt2(raw: string) {
  const space = raw.split("\n")
    .map((line) => line.split(""));
  const boundaries = sectorBoundaries(space);
  const galaxyList = galaxies(space, boundaries);

  let distanceSum = 0;
  for (let left = 0; left < galaxyList.length; left++) {
    for (let right = left + 1; right < galaxyList.length; right++) {
      distanceSum += manhattenDistance(
        galaxyList[left],
        galaxyList[right],
        1000000,
      );
    }
  }
  return distanceSum;
}

function galaxies(
  space: string[][],
  boundaries: { x: number[]; y: number[] },
): Galaxy[] {
  const galaxies = [];
  let id = 0;

  for (let y = 0; y < space.length; y++) {
    for (let x = 0; x < space[y].length; x++) {
      if (space[y][x] === "#") {
        const coordinates = { x, y };
        const sector = makeSector(x, y, boundaries);
        const galaxy: Galaxy = { id, coordinates, sector };
        galaxies.push(galaxy);
        id += 1;
      }
    }
  }

  return galaxies;
}

function makeSector(
  x: number,
  y: number,
  boundaries: { x: number[]; y: number[] },
): { x: number; y: number } {
  const xBounds = sortBy(boundaries.x, (num) => num);
  const yBounds = sortBy(boundaries.y, (num) => num);
  let sectorXIndex = undefined;
  let sectorYIndex = undefined;

  if (x > last(xBounds)) {
    sectorXIndex = xBounds.length;
  } else {
    for (let i = 0; i < xBounds.length; i++) {
      if (x < xBounds[i]) {
        sectorXIndex = i;
        break;
      }
    }
  }

  if (y > last(yBounds)) {
    sectorYIndex = yBounds.length;
  } else {
    for (let i = 0; i < yBounds.length; i++) {
      if (y < yBounds[i]) {
        sectorYIndex = i;
        break;
      }
    }
  }

  assertExists(sectorXIndex);
  assertExists(sectorYIndex);
  return {
    x: sectorXIndex,
    y: sectorYIndex,
  };
}

function sectorBoundaries(space: string[][]): { x: number[]; y: number[] } {
  const x = [];
  const y = [];
  for (let i = 0; i < space.length; i++) {
    if (space[i].every((char) => char === ".")) y.push(i);
  }

  const rotated = rotate(space);
  for (let i = 0; i < rotated.length; i++) {
    if (rotated[i].every((char) => char === ".")) x.push(i);
  }
  return { x, y };
}

function rotate(array: string[][]): string[][] {
  const rotatedArray: string[][] = [];
  for (let y = 0; y < array.length; y++) {
    const line = [];
    for (let x = 0; x < array[y].length; x++) {
      line.push(array[x][y]);
    }
    rotatedArray.push(line);
  }
  return rotatedArray;
}

function manhattenDistance(left: Galaxy, right: Galaxy, magnitude: number) {
  magnitude = magnitude - 1;
  const x = Math.abs(left.coordinates.x - right.coordinates.x);
  const y = Math.abs(left.coordinates.y - right.coordinates.y);
  const xOffset = Math.abs(
    left.sector.x * magnitude - right.sector.x * magnitude,
  );
  const yOffset = Math.abs(
    left.sector.y * magnitude - right.sector.y * magnitude,
  );
  return x + y + xOffset + yOffset;
}

main();
