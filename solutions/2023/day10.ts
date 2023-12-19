import { input, print } from "common";
import { mapObjIndexed } from "ramda";

type Node = {
  location: [x: number, y: number];
  north: boolean;
  south: boolean;
  east: boolean;
  west: boolean;
};

function main() {
  const raw = input(2023, 10);
  pt1(raw);
}

function pt1(raw: string) {
  const rawMap = raw
    .split("\n")
    .map((line) => line.split(""));

  const renderedMap = renderMap(rawMap);
  console.log(renderedMap);
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
    location: [x, y],
    north: north,
    south: south,
    east: east,
    west: west,
  };
}

main();
