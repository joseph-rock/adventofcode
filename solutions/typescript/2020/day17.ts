import { input, print } from "../common.ts";

type coords = Record<string, Coordinate>;

class Coordinate {
  constructor(
    public x: number,
    public y: number,
    public z: number,
    public w?: number,
  ) {}

  public index() {
    return Coordinate.toIndex(this.x, this.y, this.z, this.w);
  }

  static toIndex(x: number, y: number, z: number, w?: number): string {
    return x.toString() + y.toString() + z.toString() +
      (w !== undefined ? w.toString() : "");
  }
}

function seed3D(raw: string): coords {
  const list = raw.split("\n").map((line) => line.split(""));
  const seed: coords = {};
  for (let row = 0; row < list.length; row++) {
    for (let col = 0; col < list[row].length; col++) {
      if (list[row][col] === "#") {
        const active = new Coordinate(col, row, 0);
        seed[active.index()] = active;
      }
    }
  }
  return seed;
}

function seed4D(raw: string): coords {
  const list = raw.split("\n").map((line) => line.split(""));
  const seed: coords = {};
  for (let row = 0; row < list.length; row++) {
    for (let col = 0; col < list[row].length; col++) {
      if (list[row][col] === "#") {
        const active = new Coordinate(col, row, 0, 0);
        seed[active.index()] = active;
      }
    }
  }
  return seed;
}

function activeNeighborCount(c: Coordinate, active: coords): number {
  const xRange = [c.x - 1, c.x, c.x + 1];
  const yRange = [c.y - 1, c.y, c.y + 1];
  const zRange = [c.z - 1, c.z, c.z + 1];
  const wRange = c.w !== undefined ? [c.w - 1, c.w, c.w + 1] : [undefined];

  let count = 0;
  for (const x of xRange) {
    for (const y of yRange) {
      for (const z of zRange) {
        for (const w of wRange) {
          if (x === c.x && y === c.y && z === c.z && w === c.w) continue;
          if (active[Coordinate.toIndex(x, y, z, w)]) {
            count += 1;
          }
        }
      }
    }
  }
  return count;
}

function inactiveNeighbors(active: coords): coords {
  const neighbors: coords = {};
  for (const c of Object.values(active)) {
    const xRange = [c.x - 1, c.x, c.x + 1];
    const yRange = [c.y - 1, c.y, c.y + 1];
    const zRange = [c.z - 1, c.z, c.z + 1];
    const wRange = c.w !== undefined ? [c.w - 1, c.w, c.w + 1] : [undefined];

    for (const x of xRange) {
      for (const y of yRange) {
        for (const z of zRange) {
          for (const w of wRange) {
            if (x === c.x && y === c.y && z === c.z && w === c.w) continue;
            if (active[Coordinate.toIndex(x, y, z, w)]) continue;
            const neighbor = new Coordinate(x, y, z, w);
            neighbors[neighbor.index()] = neighbor;
          }
        }
      }
    }
  }
  return neighbors;
}

function cycle(seed: coords): coords {
  const neighbors: coords = inactiveNeighbors(seed);
  const next: coords = {};

  for (const c of Object.values(seed)) {
    const aCount = activeNeighborCount(c, seed);
    if (aCount === 2 || aCount === 3) {
      next[c.index()] = c;
    }
  }

  for (const c of Object.values(neighbors)) {
    const aCount = activeNeighborCount(c, seed);
    if (aCount === 3) {
      next[c.index()] = c;
    }
  }

  return next;
}

function pt1(raw: string): number {
  let ans = seed3D(raw);
  for (let i = 0; i < 6; i++) {
    ans = cycle(ans);
  }

  return Object.keys(ans).length;
}

function pt2(raw: string): number {
  let ans = seed4D(raw);
  for (let i = 0; i < 6; i++) {
    ans = cycle(ans);
  }

  return Object.keys(ans).length;
}

print(pt1(input(2020, 17)), pt2(input(2020, 17)));
