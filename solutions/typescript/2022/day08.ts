import { input, print } from "common";

interface POS {
  x: number;
  y: number;
}

function isVisible(pos: POS, grid: number[][]): boolean {
  const height = grid[pos.y][pos.x];
  const row = grid[pos.y];
  const col = grid.map((_) => _.filter((_, i) => i === pos.x)).flat();

  const left = row.slice(0, pos.x);
  const right = row.slice(pos.x + 1);
  const up = col.slice(0, pos.y);
  const dn = col.slice(pos.y + 1);

  return pos.x === 0 ||
    pos.y === 0 ||
    pos.x === grid[0].length - 1 ||
    pos.y === grid.length - 1 ||
    !left.some((tree) => tree >= height) ||
    !right.some((tree) => tree >= height) ||
    !up.some((tree) => tree >= height) ||
    !dn.some((tree) => tree >= height);
}

function totalVisScore(pos: POS, grid: number[][]): number {
  const height = grid[pos.y][pos.x];
  const row = grid[pos.y];
  const col = grid.map((_) => _.filter((_, i) => i === pos.x)).flat();

  const left = row.slice(0, pos.x).reverse();
  const right = row.slice(pos.x + 1);
  const up = col.slice(0, pos.y).reverse();
  const dn = col.slice(pos.y + 1);

  return viewDistance(height, left) *
    viewDistance(height, right) *
    viewDistance(height, up) *
    viewDistance(height, dn);
}

function viewDistance(height: number, arr: number[]): number {
  let total = 0;
  for (const tree of arr) {
    total += 1;
    if (tree >= height) {
      return total;
    }
  }
  return total;
}

function pt1(raw: string): number {
  const grid = raw.split("\n")
    .map((line) => line.split("").map((num) => parseInt(num)));

  return grid.map((_, y) => _.map((_, x) => isVisible({ x: x, y: y }, grid)))
    .flat()
    .filter((bool) => bool)
    .length;
}

function pt2(raw: string): number {
  const grid = raw.split("\n")
    .map((line) => line.split("").map((num) => parseInt(num)));

  const heights = grid
    .map((_, y) => _.map((_, x) => totalVisScore({ x: x, y: y }, grid)))
    .flat();

  return Math.max(...heights);
}

const raw = input(2022, 8);
print(pt1(raw), pt2(raw));
