import { input, print } from "../common.ts";

// UNFINISHED

function puzzleInput() {
  const sections = input(2020, 16).split("\n\n");

  const rules = sections[0].split("\n")
    .map((line) => line.split(": "));

  const myTicket = sections[1].split("\n")[1].split(",");

  const nearbyTickets = sections[2]
    .split("\n")
    .slice(1)
    .map((line) => line.split(","));

  console.log(rules);
}

puzzleInput();
