import { input, print } from "../common.ts";

interface Info {
  rules: Rules[];
  yourTicket: number[];
  nearbyTickets: number[][];
}

interface Rules {
  name: string;
  range: Range[];
}

interface Range {
  min: number;
  max: number;
}

function puzzleInput(): Info {
  const sections = input(2020, 16).split("\n\n");

  const rls = sections[0]
    .split("\n")
    .map((line) => line.split(": "))
    .map((r) => constructRules(r));

  const yours = sections[1]
    .split("\n")[1]
    .split(",")
    .map((num) => parseInt(num));

  const nearby = sections[2]
    .split("\n")
    .slice(1)
    .map((line) => line.split(",").map((num) => parseInt(num)));

  return { rules: rls, yourTicket: yours, nearbyTickets: nearby };
}

function constructRules(r: string[]): Rules {
  return { name: r[0], range: formatRange(r[1]) };
}

function formatRange(rawRange: string): Range[] {
  const tr = rawRange
    .replaceAll("-", " ")
    .replace(" or ", " ")
    .split(" ")
    .map((num) => parseInt(num));
  return [{ min: tr[0], max: tr[1] }, { min: tr[2], max: tr[3] }];
}

function inRange(target: number, ranges: Range[]): boolean {
  return ranges.some((r) => target >= r.min && target <= r.max);
}

function validTickets(pi: Info): number[][] {
  const ranges = pi.rules.map((r) => r.range).flat();
  return pi.nearbyTickets.filter((ticket) =>
    !ticket.some((num) => !inRange(num, ranges))
  ).concat([pi.yourTicket]);
}

function getColumn(idx: number, ticketList: number[][]): number[] {
  const list = [];
  for (const ticket of ticketList) {
    list.push(ticket[idx]);
  }
  return list;
}

function pt1(pi: Info): number {
  const ranges = pi.rules.map((r) => r.range).flat();
  const nearby = pi.nearbyTickets.flat();

  return nearby.reduce(
    (total, curr) => !inRange(curr, ranges) ? total += curr : total,
    0,
  );
}

function pt2(pi: Info) {
  const valid = validTickets(pi);
  const len = valid[0].length;

  const potential: Record<string, number[]> = {};
  for (let i = 0; i < len; i++) {
    const nums = getColumn(i, valid);
    for (const rule of pi.rules) {
      const ranges = rule.range.flat();
      if (!nums.some((num) => !inRange(num, ranges))) {
        potential[rule.name]
          ? potential[rule.name].push(i)
          : potential[rule.name] = [i];
      }
    }
  }

  const claimed: number[] = [];
  const ans: Record<string, number> = {};
  for (let i = 1; i < len + 1; i++) {
    for (const name of Object.keys(potential)) {
      if (potential[name].length === i) {
        for (const num of potential[name]) {
          if (!claimed.includes(num)) {
            ans[name] = num;
            claimed.push(num);
          }
        }
      }
    }
  }

  const indicies: number[] = [];
  for (const name of Object.keys(ans)) {
    name.includes("departure") ? indicies.push(ans[name]) : indicies;
  }

  return indicies.reduce((total, curr) => total *= pi.yourTicket[curr], 1);
}

const pi = puzzleInput();
print(pt1(pi), pt2(pi));
