import { input, print } from "../common.ts";

interface instruction {
  dir: string;
  amt: number;
}

interface ship {
  dir: string;
  n: number;
  s: number;
  e: number;
  w: number;
}

function changeFacing(inst: instruction, facing: string): string {
  const LEFT = ["N", "W", "S", "E"];
  const RIGHT = ["N", "E", "S", "W"];

  if (inst.dir == "L") {
    return LEFT[(LEFT.indexOf(facing) + (inst.amt / 90)) % LEFT.length];
  } else if (inst.dir == "R") {
    return RIGHT[(RIGHT.indexOf(facing) + (inst.amt / 90)) % RIGHT.length];
  }
  return facing;
}

function moveForward(inst: instruction, ship: ship): ship {
  const dir: string = ship.dir;

  switch (dir) {
    case "N":
      ship.n += inst.amt;
      break;
    case "S":
      ship.s += inst.amt;
      break;
    case "E":
      ship.e += inst.amt;
      break;
    case "W":
      ship.w += inst.amt;
      break;
    default:
      break;
  }

  return ship;
}

function executeInst(inst: instruction, ship: ship): ship {
  const dir: string = inst.dir;

  switch (dir) {
    case "N":
      ship.n += inst.amt;
      break;
    case "S":
      ship.s += inst.amt;
      break;
    case "E":
      ship.e += inst.amt;
      break;
    case "W":
      ship.w += inst.amt;
      break;
    case "L":
    case "R":
      ship.dir = changeFacing(inst, ship.dir);
      break;
    case "F":
      ship = moveForward(inst, ship);
      break;
    default:
      break;
  }

  return ship;
}

function constructInst(inst: string): instruction {
  return { dir: inst.at(0) || "", amt: parseInt(inst.slice(1)) };
}

function puzzleInput(): instruction[] {
  return input(2020, 12)
    .split("\n")
    .map((e) => constructInst(e));
}

function partOne() {
  const input = puzzleInput();
  let ship: ship = { dir: "E", n: 0, s: 0, e: 0, w: 0 };

  for (let i = 0; i < input.length; i++) {
    ship = executeInst(input[i], ship);
  }

  return Math.abs(ship.e - ship.w) + Math.abs(ship.n - ship.s);
}

print(partOne());
