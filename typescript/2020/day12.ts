import { input, print } from "../common.ts";

type Instruction = {
  instruction: string;
  amount: number;
};

type Ship = {
  facing: Direction;
  xpos: number;
  ypos: number;
};

type WaypointShip = {
  waypoint: Waypoint;
  xpos: number;
  ypos: number;
};

type Waypoint = {
  xpos: number;
  ypos: number;
};

enum Direction {
  N,
  E,
  S,
  W,
}

enum Quadrant {
  I,
  II,
  III,
  IV,
}

function puzzleInput(): Instruction[] {
  return input(2020, 12)
    .split("\n")
    .map((e) => constructInst(e));
}

function constructInst(inst: string): Instruction {
  return { instruction: inst.at(0) || "", amount: parseInt(inst.slice(1)) };
}

function executePt1(ship: Ship, inst: Instruction): Ship {
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
      ship = forward(ship, inst);
      break;
  }

  return ship;
}

function turn(facing: number, inst: Instruction): number {
  if (inst.instruction == "L") {
    return (facing + ((360 - (inst.amount % 360)) / 90)) % 4;
  } else if (inst.instruction == "R") {
    return (facing + (inst.amount / 90)) % 4;
  }
  return facing;
}

function forward(ship: Ship, inst: Instruction): Ship {
  switch (ship.facing) {
    case Direction.N:
      ship.ypos += inst.amount;
      break;
    case Direction.S:
      ship.ypos -= inst.amount;
      break;
    case Direction.E:
      ship.xpos += inst.amount;
      break;
    case Direction.W:
      ship.xpos -= inst.amount;
      break;
  }

  return ship;
}

function executePt2(ship: WaypointShip, inst: Instruction): WaypointShip {
  switch (inst.instruction) {
    case "N":
      ship.waypoint.ypos += inst.amount;
      break;
    case "S":
      ship.waypoint.ypos -= inst.amount;
      break;
    case "E":
      ship.waypoint.xpos += inst.amount;
      break;
    case "W":
      ship.waypoint.xpos -= inst.amount;
      break;
    case "L":
    case "R":
      ship.waypoint = turnWaypoint(ship.waypoint, inst);
      break;
    case "F":
      ship = forwardWaypoint(ship, inst);
      break;
  }

  return ship;
}

function forwardWaypoint(ship: WaypointShip, inst: Instruction): WaypointShip {
  for (let i = 0; i < inst.amount; i++) {
    ship = moveToWaypoint(ship);
  }
  return ship;
}

function moveToWaypoint(ship: WaypointShip): WaypointShip {
  return {
    waypoint: ship.waypoint,
    xpos: ship.xpos + ship.waypoint.xpos,
    ypos: ship.ypos + ship.waypoint.ypos,
  };
}

function turnWaypoint(waypoint: Waypoint, inst: Instruction): Waypoint {
  const beforeQuadrant = inQuadrant(waypoint);
  const afterQuadrant = turn(beforeQuadrant, inst);

  if (Math.abs(afterQuadrant - beforeQuadrant) % 2 === 1) {
    waypoint = flipAxis(waypoint);
  }

  return setQuadrant(waypoint, afterQuadrant);
}

function inQuadrant(waypoint: Waypoint): Quadrant {
  if (waypoint.xpos >= 0 && waypoint.ypos >= 0) {
    return Quadrant.I;
  } else if (waypoint.xpos >= 0 && waypoint.ypos < 0) {
    return Quadrant.II;
  } else if (waypoint.xpos < 0 && waypoint.ypos < 0) {
    return Quadrant.III;
  }
  return Quadrant.IV;
}

function flipAxis(waypoint: Waypoint): Waypoint {
  return { xpos: waypoint.ypos, ypos: waypoint.xpos };
}

function setQuadrant(waypoint: Waypoint, quadrant: Quadrant): Waypoint {
  switch (quadrant) {
    case Quadrant.I:
      return {
        xpos: Math.abs(waypoint.xpos),
        ypos: Math.abs(waypoint.ypos),
      };
    case Quadrant.II:
      return {
        xpos: Math.abs(waypoint.xpos),
        ypos: Math.abs(waypoint.ypos) * -1,
      };
    case Quadrant.III:
      return {
        xpos: Math.abs(waypoint.xpos) * -1,
        ypos: Math.abs(waypoint.ypos) * -1,
      };
    case Quadrant.IV:
      return {
        xpos: Math.abs(waypoint.xpos) * -1,
        ypos: Math.abs(waypoint.ypos),
      };
  }
}

function partOne() {
  const seedShip: Ship = { facing: Direction.E, xpos: 0, ypos: 0 };
  const returnShip = puzzleInput().reduce(
    (ship, inst) => executePt1(ship, inst),
    seedShip,
  );
  return Math.abs(returnShip.xpos) + Math.abs(returnShip.ypos);
}

function partTwo() {
  const seedWP: Waypoint = { xpos: 10, ypos: 1 };
  const seedShip: WaypointShip = {
    waypoint: seedWP,
    xpos: 0,
    ypos: 0,
  };
  const returnShip = puzzleInput().reduce(
    (ship, inst) => executePt2(ship, inst),
    seedShip,
  );
  return Math.abs(returnShip.xpos) + Math.abs(returnShip.ypos);
}

print(partOne(), partTwo());
