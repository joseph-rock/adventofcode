import { input, print } from "common";
import { clone } from "ramda";

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
    .map((line, y) => line.map((char, x) => setNode(char, y, x)));
  const pathMap = floodFillPath(nodeMap, "S");
  return pathMap.furthestSteps;
}

function pt2(raw: string): number {
  const nodeMap = raw
    .split("\n")
    .map((line) => line.split(""))
    .map((line, y) => line.map((char, x) => setNode(char, y, x)));
  const pathMap = floodFillPath(nodeMap, "S");
  return countOutsideNodes(pathMap.pathMap, "S");
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

function floodFillPath(
  nodeMap: Node[][],
  pathChar: string,
): { furthestSteps: number; pathMap: Node[][] } {
  const copyMap = clone(nodeMap);
  const start = getStartNode(copyMap);
  copyMap[start.location.y][start.location.x] = start;

  let steps = 0;
  let active = getNeighbors(copyMap, start);
  const traveled: Record<string, Node> = {};

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

function getNeighbors(nodeMap: Node[][], node: Node): Node[] {
  const neighbors: Node[] = [];

  const northNode = nodeMap[node.location.y - 1][node.location.x];
  const southNode = nodeMap[node.location.y + 1][node.location.x];
  const eastNode = nodeMap[node.location.y][node.location.x + 1];
  const westNode = nodeMap[node.location.y][node.location.x - 1];

  if (node.north && northNode.south) neighbors.push(northNode);
  if (node.south && southNode.north) neighbors.push(southNode);
  if (node.east && eastNode.west) neighbors.push(eastNode);
  if (node.west && westNode.east) neighbors.push(westNode);

  return neighbors;
}

function countOutsideNodes(nodeMap: Node[][], pathChar: string): number {
  let count = 0;
  for (const line of nodeMap) {
    let outside = true;
    let left = undefined;
    for (const node of line) {
      if (node.char !== pathChar) {
        outside ? count : count += 1;
      } // Boundary Line - flip outside
      else if (node.north && node.south) {
        outside = !outside;
      } // Boundary Corner -- determine to flip outside
      else if (node.north || node.south) {
        // Wait for next corner
        if (left === undefined) {
          left = node;
        } // Edge - dont flip, reset left corner
        else if ((left.north && node.north) || (left.south && node.south)) {
          left = undefined;
        } // Boundary - flip
        else {
          outside = !outside;
          left = undefined;
        }
      }
    }
  }
  return count;
}

function nodeID(node: Node): string {
  return `${node.location.x},${node.location.y}`;
}

function getStartNode(renderedMap: Node[][]): Node {
  const start = clone(startNode(renderedMap));

  start.north = renderedMap[start.location.y - 1][start.location.x].south;
  start.south = renderedMap[start.location.y + 1][start.location.x].north;
  start.east = renderedMap[start.location.y][start.location.x + 1].west;
  start.west = renderedMap[start.location.y][start.location.x - 1].east;

  return start;
}

function startNode(renderedMap: Node[][]): Node {
  for (const line of renderedMap) {
    for (const node of line) {
      if (node.char === "S") return node;
    }
  }
  return renderedMap[0][0];
}

main();
