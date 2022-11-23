import { input, print } from "../common.ts";

// UNFINISHED

interface inputInfo {
  rules: ticketRule[];
  yourTicket: number[];
  nearbyTickets: number[][];
}

interface ticketRule {
  name: string;
  range: ticketRange[];
}

interface ticketRange {
  min: number;
  max: number;
}

function constructTicketRule(foo: string[]): ticketRule {
  return { name: foo[0], range: formatRange(foo[1]) };
}

function formatRange(rawRange: string): ticketRange[] {
  const tr = rawRange
    .replaceAll("-", " ")
    .replace("or ", "")
    .split(" ")
    .map((num) => parseInt(num));
  return [{ min: tr[0], max: tr[1] }, { min: tr[2], max: tr[3] }];
}

function puzzleInput(): inputInfo {
  const sections = input(2020, 16).split("\n\n");

  const rls = sections[0].split("\n")
    .map((line) => line.split(": "))
    .map((line) => constructTicketRule(line));

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

const pi = puzzleInput();

console.log(pi);
