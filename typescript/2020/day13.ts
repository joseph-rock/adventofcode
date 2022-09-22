import { input, print } from "../common.ts";
import { last } from "https://deno.land/x/ramda@v0.27.2/mod.ts";

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
    .map((n) => parseInt(n));

  return { timestamp: timestamp, schedule: schedule };
}

function nextMultiple(target: number, num: number): number {
  return target % num === 0 ? target : num * Math.ceil(target / num);
}

function partOne(notes: Notes): number {
  notes.schedule = notes.schedule.filter((n) => !isNaN(n));
  let nearestBus = { busID: 0, wait: NaN };

  for (const bus of notes.schedule) {
    const waitTime = nextMultiple(notes.timestamp, bus) - notes.timestamp;
    if (waitTime < nearestBus.wait || isNaN(nearestBus.wait)) {
      nearestBus = { busID: bus, wait: waitTime };
    }
  }

  return nearestBus.busID * nearestBus.wait;
}

type Bus = {
  index: number;
  busID: number;
};

function makeBus(index: number, busID: number): Bus {
  return { index: index, busID: busID };
}

function isConcurrent(target: number, bus: Bus): boolean {
  return (target + bus.index) % bus.busID === 0;
}

function nextTimestamp(busList: Bus[], num: number): number {
  const lastBus = last(busList);
  const increment = busList.reduce((total, bus) => total * bus.busID, 1) /
    lastBus.busID;

  while (num < Number.MAX_VALUE) {
    if (isConcurrent(num, lastBus)) {
      return num;
    }
    num += increment;
  }

  return -1;
}

function timestamp(busList: Bus[]): number {
  const checkList: Bus[] = [];
  let answer = busList[0].busID;

  for (const bus of busList) {
    checkList.push(bus);
    answer = nextTimestamp(checkList, answer);
  }

  return answer;
}

function partTwo(notes: Notes): number {
  const busList = notes.schedule
    .map((bus, i) => makeBus(i, bus))
    .filter((bus) => !isNaN(bus.busID));

  return timestamp(busList);
}

print(partOne(puzzleInput()), partTwo(puzzleInput()));
