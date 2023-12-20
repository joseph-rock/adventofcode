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
  const start = getStartNode(map);

  const traveled: Record<string, Node> = {};
  let active = getNeighbors(map, start);
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

  return count;
}

function pt2(raw: string): number {
  const rawMap = raw
    .split("\n")
    .map((line) => line.split(""));

  const map = renderMap(rawMap);
  const start = getStartNode2(map);

  const traveled: Record<string, Node> = {};
  let active = getNeighbors(map, start);
  while (active.length > 0) {
    const next = [];
    for (const node of active) {
      traveled[nodeID(node)] = node;
      node.char = "S"; // arbitrarily mark as S for path tile
      const neighbors = getNeighbors(map, node)
        .filter((node) => traveled[nodeID(node)] === undefined);
      next.push(...neighbors);
    }
    active = next;
  }

  const foo = convertNonPathChar(map, "S");

  return foo.reduce(
    (total, line) =>
      total += line.reduce(
        (total, node) => node.char === "I" ? total += 1 : total,
        0,
      ),
    0,
  );
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

function getStartNode2(renderedMap: Node[][]): Node {
  let start = renderedMap[0][0];
  for (const line of renderedMap) {
    for (const node of line) {
      if (node.char === "S") start = node;
    }
  }

  start.north = false;
  start.south = false;
  start.east = false;
  start.west = false;

  if (renderedMap[start.location.y - 1][start.location.x].south) {
    start.north = true;
  }
  if (renderedMap[start.location.y + 1][start.location.x].north) {
    start.south = true;
  }
  if (renderedMap[start.location.y][start.location.x + 1].east) {
    start.east = true;
  }
  if (renderedMap[start.location.y][start.location.x - 1].west) {
    start.west = true;
  }

  return start;
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

// Works... at what cost?
function convertNonPathChar(map: Node[][], pathChar: string): Node[][] {
  for (const line of map) {
    let outside = true;
    let left = undefined;

    for (let i = 0; i < line.length; i++) {
      if (line[i].char !== pathChar && outside) {
        line[i].char = "O";
        continue;
      }
      if (line[i].char !== pathChar && !outside) {
        line[i].char = "I";
        continue;
      }
      // Boundary Line - flip outside
      if (line[i].north && line[i].south) {
        outside = !outside;
        continue;
      } // Boundary Corner -- match corner to determine if flip
      else if (line[i].north || line[i].south) {
        // left corner not found
        if (left === undefined) {
          left = line[i];
          continue;
        }
        // left corner is found -- determine if edge or boundary
        // is edge - dont flip
        if ((left.north && line[i].north) || (left.south && line[i].south)) {
          left = undefined;
          continue;
        } // is boundary - flip
        else {
          outside = !outside;
          left = undefined;
        }
      }
    }
  }
  return map;
}

main();
