import { input, print } from "common";
import { None, Option, Some } from "opt";

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
  const nodeMap = raw
    .split("\n")
    .map((line) => line.split(""))
    .map((line, y) => line.map((char, x) => node(char, y, x)));
  const { furthestSteps } = findPath(nodeMap);
  return furthestSteps;
}

function pt2(raw: string): number {
  const nodeMap = raw
    .split("\n")
    .map((line) => line.split(""))
    .map((line, y) => line.map((char, x) => node(char, y, x)));
  const { pathMap } = findPath(nodeMap);
  return countInsideNodes(pathMap);
}

function node(char: string, y: number, x: number): Node {
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
    default:
      break;
  }

  return {
    char,
    location: { x, y },
    north,
    south,
    east,
    west,
  };
}

function findPath(
  nodeMap: Node[][],
  pathChar = "S",
): { furthestSteps: number; pathMap: Node[][] } {
  const copyMap = structuredClone(nodeMap);
  const start = getStartNode(copyMap, pathChar);
  copyMap[start.location.y][start.location.x] = start;

  let steps = 0;
  let active = getNeighbors(copyMap, start);

  const traveled: Record<string, Node> = {};
  const nodeID = (node: Node) => `${node.location.x},${node.location.y}`;

  while (active.length > 0) {
    const next = [];
    for (const node of active) {
      node.char = pathChar;
      traveled[nodeID(node)] = node;
      const neighbors = getNeighbors(copyMap, node)
        .filter((node) => traveled[nodeID(node)] === undefined);
      next.push(...neighbors);
    }
    active = next;
    steps += 1;
  }

  return { furthestSteps: steps, pathMap: copyMap };
}

function getStartNode(nodeMap: Node[][], pathChar: string): Node {
  const location = startLocation(nodeMap);
  location.assertSome();

  const { x, y } = location.value;
  return {
    char: pathChar,
    location: location.value,
    north: nodeMap[y - 1][x].south ?? false,
    south: nodeMap[y + 1][x].north ?? false,
    east: nodeMap[y][x + 1].west ?? false,
    west: nodeMap[y][x - 1].east ?? false,
  };
}

function startLocation(nodeMap: Node[][]): Option<{ x: number; y: number }> {
  for (const line of nodeMap) {
    for (const node of line) {
      if (node.char === "S") return Some(node.location);
    }
  }
  return None;
}

function getNeighbors(nodeMap: Node[][], node: Node): Node[] {
  const neighbors: Node[] = [];

  const { x, y } = node.location;
  const northNode = nodeMap[y - 1][x];
  const southNode = nodeMap[y + 1][x];
  const eastNode = nodeMap[y][x + 1];
  const westNode = nodeMap[y][x - 1];

  if (node.north && northNode.south) neighbors.push(northNode);
  if (node.south && southNode.north) neighbors.push(southNode);
  if (node.east && eastNode.west) neighbors.push(eastNode);
  if (node.west && westNode.east) neighbors.push(westNode);

  return neighbors;
}

function countInsideNodes(nodeMap: Node[][], pathChar = "S"): number {
  let count = 0;
  for (const line of nodeMap) {
    let inside = false;
    let left = undefined;
    for (const node of line) {
      if (node.char !== pathChar) {
        if (inside) count += 1;
      } // Boundary Line - flip inside
      else if (node.north && node.south) {
        inside = !inside;
      } // Boundary Corner -- determine to flip inside
      else if (node.north || node.south) {
        // Wait for next corner
        if (left === undefined) {
          left = node;
        } // Edge - dont flip, reset left corner
        else if ((left.north && node.north) || (left.south && node.south)) {
          left = undefined;
        } // Boundary - flip
        else {
          inside = !inside;
          left = undefined;
        }
      }
    }
  }
  return count;
}

main();
