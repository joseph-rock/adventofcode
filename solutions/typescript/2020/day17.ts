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

function seed(raw: string, w?: number): coords {
  const list = raw.split("\n").map((line) => line.split(""));
  const seed: coords = {};
  for (let row = 0; row < list.length; row++) {
    for (let col = 0; col < list[row].length; col++) {
      if (list[row][col] === "#") {
        const active = new Coordinate(col, row, 0, w);
        seed[active.index()] = active;
      }
    }
  }
  return seed;
}

function neighbors(c: Coordinate): coords {
  const xRange = [c.x - 1, c.x, c.x + 1];
  const yRange = [c.y - 1, c.y, c.y + 1];
  const zRange = [c.z - 1, c.z, c.z + 1];
  const wRange = c.w !== undefined ? [c.w - 1, c.w, c.w + 1] : [undefined];

  const neighbors: coords = {};
  for (const x of xRange) {
    for (const y of yRange) {
      for (const z of zRange) {
        for (const w of wRange) {
          if (x === c.x && y === c.y && z === c.z && w === c.w) continue;
          const neighbor = new Coordinate(x, y, z, w);
          neighbors[neighbor.index()] = neighbor;
        }
      }
    }
  }
  return neighbors;
}

function activeNeighborCount(c: Coordinate, active: coords): number {
  return Object.keys(neighbors(c)).filter(key => active[key]).length;
}

function inactiveNeighbors(active: coords): coords {
  const inactive: coords = {};
  for (const c of Object.values(active)) {
    const n = neighbors(c)
    for(const neighbor of Object.keys(n)) {
      if(!active[neighbor]) {
        inactive[neighbor] = n[neighbor];
      }
    }
  }
  return inactive;
}

function cycle(active: coords): coords {
  const next: coords = {};

  const queue: coords = {
    ...active,
    ...inactiveNeighbors(active)
  }

  for(const idx of Object.keys(queue)) {
    const count = activeNeighborCount(queue[idx], active);
    if (active[idx] && (count === 2 || count === 3)) {
      next[idx] = queue[idx];
    }
    if(!active[idx] && count === 3) {
      next[idx] = queue[idx];
    }
  }

  return next;
}

function pt1(raw: string): number {
  let ans = seed(raw);
  for (let i = 0; i < 6; i++) {
    ans = cycle(ans);
  }

  return Object.keys(ans).length;
}

function pt2(raw: string): number {
  let ans = seed(raw, 0);
  for (let i = 0; i < 6; i++) {
    ans = cycle(ans);
  }

  return Object.keys(ans).length;
}

print(pt1(input(2020, 17)), pt2(input(2020, 17)));
