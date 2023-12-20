import { input, print } from "common";

type Node = {
  char: string;
  location: { x: number; y: number };
  north: boolean;
  south: boolean;
  east: boolean;
  west: boolean;
};

function main() {
  const raw = input(2023, 10);
  print(pt1(raw), pt2(raw));
}

function pt1(raw: string): number {
  const rawMap = raw
    .split("\n")
    .map((line) => line.split(""));

  const map = renderMap(rawMap);
  const traveled: Record<string, Node> = {};
  let active = [getStartNode(map)];
  let count = 0;

  while (active.length > 0) {
    const next = [];
    for (const node of active) {
      traveled[nodeID(node)] = node;
      const neighbors = getNeighbors(map, node)
        .filter((node) => traveled[nodeID(node)] === undefined);
      next.push(...neighbors);
    }
    active = next;
    count += 1;
  }

  return count - 1;
}

function pt2(raw: string): number {
  const rawMap = raw
    .split("\n")
    .map((line) => line.split(""));
  const map = renderMap(rawMap);

  // Flood fill like before
  const traveled: Record<string, Node> = {};
  let active = [getStartNode(map)];
  while (active.length > 0) {
    const next = [];
    for (const node of active) {
      traveled[nodeID(node)] = node;
      node.char = "X"; // arbitrarily mark as X for path tile
      const neighbors = getNeighbors(map, node)
        .filter((node) => traveled[nodeID(node)] === undefined);
      next.push(...neighbors);
    }
    active = next;
  }

  // search for matching borders (180 vs 360 deg turns)

  return -1;
}

function renderMap(rawMap: string[][]) {
  return rawMap
    .map((line, y) =>
      line
        .map((char, x) => setNode(char, y, x))
    );
}

function setNode(char: string, y: number, x: number): Node {
  let north = false;
  let south = false;
  let east = false;
  let west = false;

  switch (char) {
    case "|":
      north = true;
      south = true;
      break;
    case "-":
      east = true;
      west = true;
      break;
    case "L":
      north = true;
      east = true;
      break;
    case "J":
      north = true;
      west = true;
      break;
    case "7":
      south = true;
      west = true;
      break;
    case "F":
      south = true;
      east = true;
      break;
    case "S":
      north = true;
      south = true;
      east = true;
      west = true;
      break;
    default:
      break;
  }

  return {
    char: char,
    location: { x: x, y: y },
    north: north,
    south: south,
    east: east,
    west: west,
  };
}

function nodeID(node: Node): string {
  return `${node.location.x},${node.location.y}`;
}

function getStartNode(renderedMap: Node[][]): Node {
  for (const line of renderedMap) {
    for (const node of line) {
      if (node.char === "S") return node;
    }
  }
  return renderedMap[0][0];
}

function getNeighbors(map: Node[][], node: Node): Node[] {
  const x = node.location.x;
  const y = node.location.y;
  const xMin = 0;
  const yMin = 0;
  const xMax = map[0].length;
  const yMax = map.length;
  const neighbors: Node[] = [];

  // to north
  if (y - 1 < yMax && node.north && map[y - 1][x].south) {
    neighbors.push(map[y - 1][x]);
  }
  // to south
  if (y + 1 >= yMin && node.south && map[y + 1][x].north) {
    neighbors.push(map[y + 1][x]);
  }
  // to west
  if (x - 1 >= xMin && node.west && map[y][x - 1].east) {
    neighbors.push(map[y][x - 1]);
  }
  // to east
  if (x + 1 < xMax && node.east && map[y][x + 1].west) {
    neighbors.push(map[y][x + 1]);
  }

  return neighbors;
}

main();
