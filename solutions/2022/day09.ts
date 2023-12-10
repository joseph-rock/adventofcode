import { input, print } from "common";
import { last } from "ramda";

interface POS {
  x: number;
  y: number;
}

interface Instruction {
  dir: string;
  amt: number;
}

function instructions(raw: string): Instruction[] {
  return raw
    .split("\n")
    .map((line) => {
      const l = line.split(" ");
      return { dir: l[0], amt: parseInt(l[1]) };
    });
}

function idx(pos: POS): string {
  return pos.x.toString() + "," + pos.y.toString();
}

function inRange(head: POS, tail: POS): boolean {
  const row = [head.x - 1, head.x, head.x + 1];
  const col = [head.y - 1, head.y, head.y + 1];
  return row.includes(tail.x) && col.includes(tail.y);
}

function moveHead(head: POS, inst: Instruction): POS {
  const next = { x: head.x, y: head.y };
  switch (inst.dir) {
    case "R":
      next.x += 1;
      break;
    case "L":
      next.x -= 1;
      break;
    case "U":
      next.y += 1;
      break;
    case "D":
      next.y -= 1;
      break;
    default:
      break;
  }
  return next;
}

function moveTail(head: POS, tail: POS): POS {
  if (inRange(head, tail)) return tail;

  const next = { x: tail.x, y: tail.y };
  const xdiff = (head.x - tail.x) / Math.abs(head.x - tail.x);
  const ydiff = (head.y - tail.y) / Math.abs(head.y - tail.y);

  if (head.x === tail.x) {
    next.y += ydiff;
  } else if (head.y === tail.y) {
    next.x += xdiff;
  } else {
    next.y += ydiff;
    next.x += xdiff;
  }

  return next;
}

function pt1(raw: string) {
  const instList = instructions(raw);

  let head: POS = { x: 0, y: 0 };
  let tail: POS = { x: 0, y: 0 };
  const visited: Record<string, POS> = {};

  for (const inst of instList) {
    for (let i = 0; i < inst.amt; i++) {
      head = moveHead(head, inst);
      tail = moveTail(head, tail);
      visited[idx(tail)] = tail;
    }
  }
  return Object.keys(visited).length;
}

function pt2(raw: string) {
  const instList = instructions(raw);

  const knots: POS[] = Array(10).fill({ x: 0, y: 0 });
  const visited: Record<string, POS> = {};

  for (const inst of instList) {
    for (let i = 0; i < inst.amt; i++) {
      knots.forEach((_, i) =>
        i === 0
          ? knots[i] = moveHead(knots[0], inst)
          : knots[i] = moveTail(knots[i - 1], knots[i])
      );
      visited[idx(last(knots))] = last(knots);
    }
  }
  return Object.keys(visited).length;
}

const raw = input(2022, 9);
print(pt1(raw), pt2(raw));
