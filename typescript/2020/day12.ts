import { equalSet } from "https://deno.land/x/equal@v1.4.0/equal.ts";
import { map } from "https://deno.land/x/fonction@v1.6.2/mod.ts";

interface instruction {
  dir: string;
  amt: number;
}

interface ship {
  facing: string;
  n: number;
  s: number;
  e: number;
  w: number;
}

function changeFacing(inst: instruction, facing: string): string {
  const LEFT = ["N", "W", "S", "E"];
  const RIGHT = ["N", "E", "S", "W"];

  if (inst.dir == "L") {
    return LEFT[LEFT.indexOf(facing) + (inst.amt / 90) % LEFT.length];
  } else if (inst.dir == "R") {
    return RIGHT[RIGHT.indexOf(facing) + (inst.amt / 90) % RIGHT.length];
  }
  return facing;
}

// TODO
function moveForward(inst: instruction, ship: ship): ship {
  return ship;
}

// TODO
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
      ship.facing = changeFacing(inst, ship.facing);
      break;
    case "F":
      ship = moveForward(inst, ship);
      break;
    default:
      break;
  }

  console.log(ship);
  return ship;
}

function constructInst(inst: string): instruction {
  return { dir: inst.at(0) || "", amt: parseInt(inst.slice(1)) };
}

function puzzleInput(): instruction[] {
  const input = Deno.readTextFileSync("../../input/2020/day12.txt").split("\n");
  return input.map((e) => constructInst(e));
}

function partOne() {
  let ship: ship = { facing: "E", n: 0, s: 0, e: 0, w: 0 };
}

// const ship: ship = { facing: "E", n: 0, s: 0, e: 0, w: 0 };
// console.log(changeFacing({ dir: "L", amt: 90 }, "N"));
// console.log(executeInst({ dir: "L", amt: 90 }, ship));

partOne();
