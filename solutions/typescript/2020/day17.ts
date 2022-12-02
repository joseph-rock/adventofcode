import { input, print } from "../common.ts";
import { clone } from "../deps.ts";

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
    return w
      ? x.toString() + y.toString() + z.toString() + w.toString()
      : x.toString() + y.toString() + z.toString();
  }
}

function seed(raw: string): coords {
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

function activeNeighborCount(c: Coordinate, active: coords): number {
  const xRange = [c.x - 1, c.x, c.x + 1];
  const yRange = [c.y - 1, c.y, c.y + 1];
  const zRange = [c.z - 1, c.z, c.z + 1];

  let count = 0;
  for (const x of xRange) {
    for (const y of yRange) {
      for (const z of zRange) {
        if (x === c.x && y === c.y && z === c.z) continue;
        if (active[Coordinate.toIndex(x, y, z)]) {
          count += 1;
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

    for (const x of xRange) {
      for (const y of yRange) {
        for (const z of zRange) {
          if (x === c.x && y === c.y && z === c.z) continue;
          if (active[Coordinate.toIndex(x, y, z)]) continue;
          const neighbor = new Coordinate(x, y, z);
          neighbors[neighbor.index()] = neighbor;
        }
      }
    }
  }
  return neighbors;
}

function pt1(raw: string): number {
  const s = seed(raw);
  let newActive = clone(s);

  for (let i = 0; i < 6; i++) {
    const active: coords = clone(newActive);
    const neighbors: coords = inactiveNeighbors(active);

    newActive = {};
    for (const c of Object.values(active)) {
      const aCount = activeNeighborCount(c, active);
      if (aCount === 2 || aCount === 3) {
        newActive[c.index()] = c;
      }
    }

    for (const c of Object.values(neighbors)) {
      const aCount = activeNeighborCount(c, active);
      if (aCount === 3) {
        newActive[c.index()] = c;
      }
    }
  }

  return Object.keys(newActive).length;
}

print(pt1(input(2020, 17)));
