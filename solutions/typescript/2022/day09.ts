import { input, print } from "common";

interface POS {
  x: number;
  y: number;
}

interface Instruction {
  dir: string;
  amt: number;
}

function POSIdx(pos: POS): string {
  return pos.x.toString() + "," + pos.y.toString();
}

function inRange(head: POS, tail: POS): boolean {
  const row = [head.x - 1, head.x, head.x + 1];
  const col = [head.y - 1, head.y, head.y + 1];

  return row.includes(tail.x) && col.includes(tail.y);
}

function moveTail(head: POS, tail: POS): POS {
  const next = { x: tail.x, y: tail.y };
  if (inRange(head, tail)) return next;
  if (head.x === tail.x) {
    next.y += (head.y - tail.y) / Math.abs(head.y - tail.y);
  } else if (head.y === tail.y) {
    next.x += (head.x - tail.x) / Math.abs(head.x - tail.x);
  } else {
    next.y += (head.y - tail.y) / Math.abs(head.y - tail.y);
    next.x += (head.x - tail.x) / Math.abs(head.x - tail.x);
  }

  return next;
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

function pt1(raw: string) {
  const instructions = raw.split("\n").map((line) => {
    const l = line.split(" ");
    return { dir: l[0], amt: parseInt(l[1]) };
  });

  let head: POS = { x: 0, y: 0 };
  let tail: POS = { x: 0, y: 0 };

  const visited: Record<string, POS> = {};
  visited[POSIdx(tail)] = tail;

  for (const inst of instructions) {
    for (let i = 0; i < inst.amt; i++) {
      head = moveHead(head, inst);
      tail = moveTail(head, tail);
      visited[POSIdx(tail)] = tail;
    }
  }
  return Object.keys(visited).length;
}

function pt2(raw: string) {
  const instructions = raw.split("\n").map((line) => {
    const l = line.split(" ");
    return { dir: l[0], amt: parseInt(l[1]) };
  });

  let head: POS = { x: 0, y: 0 };
  const tail: POS[] = [];
  for (let i = 0; i < 9; i++) {
    tail.push({ x: 0, y: 0 });
  }

  const visited: Record<string, POS> = {};
  visited[POSIdx(tail[8])] = tail[8];

  for (const inst of instructions) {
    for (let i = 0; i < inst.amt; i++) {
      head = moveHead(head, inst);
      tail.forEach((_, i) =>
        i === 0
          ? tail[i] = moveTail(head, tail[i])
          : tail[i] = moveTail(tail[i - 1], tail[i])
      );
      visited[POSIdx(tail[8])] = tail[8];
    }
  }
  return Object.keys(visited).length;
}

const raw = input(2022, 9);
print(pt1(raw), pt2(raw));
