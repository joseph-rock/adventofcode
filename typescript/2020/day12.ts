import { input, print } from "../common.ts";

type instruction = {
  instruction: string;
  amount: number;
};

type ship = {
  facing: direction;
  xpos: number;
  ypos: number;
};

enum direction {
  N,
  E,
  S,
  W,
}

function puzzleInput(): instruction[] {
  return input(2020, 12)
    .split("\n")
    .map((e) => constructInst(e));
}

function constructInst(inst: string): instruction {
  return { instruction: inst.at(0) || "", amount: parseInt(inst.slice(1)) };
}

function executeInst(inst: instruction, ship: ship): ship {
  switch (inst.instruction) {
    case "N":
      ship.ypos += inst.amount;
      break;
    case "S":
      ship.ypos -= inst.amount;
      break;
    case "E":
      ship.xpos += inst.amount;
      break;
    case "W":
      ship.xpos -= inst.amount;
      break;
    case "L":
    case "R":
      ship.facing = turn(ship.facing, inst);
      break;
    case "F":
      ship = moveForward(ship, inst);
      break;
    default:
      break;
  }

  return ship;
}

function turn(facing: direction, inst: instruction): direction {
  if (inst.instruction == "L") {
    return (facing + ((360 - (inst.amount % 360)) / 90)) % 4;
  } else if (inst.instruction == "R") {
    return (facing + (inst.amount / 90)) % 4;
  }
  return facing;
}

function moveForward(ship: ship, inst: instruction): ship {
  switch (ship.facing) {
    case direction.N:
      ship.ypos += inst.amount;
      break;
    case direction.S:
      ship.ypos -= inst.amount;
      break;
    case direction.E:
      ship.xpos += inst.amount;
      break;
    case direction.W:
      ship.xpos -= inst.amount;
      break;
    default:
      break;
  }

  return ship;
}

function partOne() {
  const input = puzzleInput();
  let ship: ship = { facing: direction.E, xpos: 0, ypos: 0 };

  for (let i = 0; i < input.length; i++) {
    ship = executeInst(input[i], ship);
  }

  return Math.abs(ship.xpos) + Math.abs(ship.ypos);
}

print(partOne());
