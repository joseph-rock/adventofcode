import { input, print } from "common";
import { assertExists } from "assert";

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
  const nodeMap: Node[][] = raw
    .split("\n")
    .map((line) => line.split(""))
    .map((line, y) => line.map((char, x) => node(char, y, x)));
  const { steps } = findPath(nodeMap);
  return steps;
}

function pt2(raw: string): number {
  const nodeMap: Node[][] = raw
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
  nodeMap: Readonly<Node[][]>,
  pathChar = "S",
): { steps: number; pathMap: Node[][] } {
  const pathMap = structuredClone(nodeMap);
  const start = getStartNode(pathMap, pathChar);
  pathMap[start.location.y][start.location.x] = start;

  const nodeID = (node: Node) => `${node.location.x},${node.location.y}`;
  const visited: Record<string, Node> = {};
  let queue = getNeighbors(pathMap, start);
  let steps = 0;

  while (queue.length > 0) {
    const next = [];
    for (const node of queue) {
      node.char = pathChar;
      visited[nodeID(node)] = node;
      const neighbors = getNeighbors(pathMap, node)
        .filter((node) => visited[nodeID(node)] === undefined);
      next.push(...neighbors);
    }
    queue = next;
    steps += 1;
  }

  return { steps, pathMap };
}

function getStartNode(nodeMap: Node[][], pathChar: string): Node {
  const start = nodeMap
    .flat()
    .find((node) => node.char === "S");
  assertExists(start, "Start Location Not Found");

  const { x, y } = start.location;
  return {
    char: pathChar,
    location: start.location,
    north: nodeMap[y - 1][x].south ?? false,
    south: nodeMap[y + 1][x].north ?? false,
    east: nodeMap[y][x + 1].west ?? false,
    west: nodeMap[y][x - 1].east ?? false,
  };
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
      if (node.char === pathChar) {
        // Boundary Line - flip inside
        if (node.north && node.south) {
          inside = !inside;
        } // Boundary Corner - determine inside flip
        else if (node.north || node.south) {
          // Start of horizontal edge - wait for next corner
          if (left === undefined) {
            left = node;
          } // True Edge - dont flip, reset left corner
          else if ((left.north && node.north) || (left.south && node.south)) {
            left = undefined;
          } // Boundary - flip, reset left corner
          else {
            inside = !inside;
            left = undefined;
          }
        }
      } else if (inside) {
        count += 1;
      }
    }
  }
  return count;
}

main();
