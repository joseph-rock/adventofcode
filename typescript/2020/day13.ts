import { input, print } from "../common.ts";

type Notes = {
  timestamp: number;
  schedule: number[];
};

function puzzleInput(): Notes {
  const array = input(2020, 13).split("\n");
  const first = array.shift();

  const timestamp = first !== undefined ? parseInt(first) : -1;
  const schedule = array.toString()
    .split(",")
    .map((n) => parseInt(n)).filter((n) => !isNaN(n));

  return { timestamp: timestamp, schedule: schedule };
}

function nextMultiple(target: number, num: number): number {
  return target % num === 0 ? target : num * (Math.floor(target / num) + 1);
}

function partOne(): number {
  const notes = puzzleInput();

  let nearest = [0, 0];
  for (let bus of notes.schedule) {
    const waitTime = nextMultiple(notes.timestamp, bus) - notes.timestamp;
    if (waitTime < nearest[1] || nearest[1] === 0) {
      nearest = [bus, waitTime];
    }
  }

  return nearest[0] * nearest[1];
}

print(partOne());
