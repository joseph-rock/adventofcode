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

function isDivisable(target: number, bus: Bus): boolean {
  return (target + bus.index) % bus.busID === 0;
}

function nextTimestamp(busList: Bus[], num: number): number {
  const increment = busList.reduce((total, bus) => total * bus.busID, 1) /
    busList[busList.length - 1].busID;

  while (num < Number.MAX_VALUE) {
    if (busList.every((bus) => isDivisable(num, bus))) {
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

/**
 * Pt 2 explination
 *
 * The input lists the buses at certain indicies, like below:
 *
 *    { index: 0,  busID: 19 }
 *    { index: 9,  busID: 41 }
 *    { index: 13, busID: 37 }
 *    { index: 19, busID: 367 }
 *    { index: 32, busID: 13 }
 *    { index: 36, busID: 17 }
 *    { index: 48, busID: 29 }
 *    { index: 50, busID: 373 }
 *    { index: 73, busID: 23 }
 *
 * We are trying to find a number, num, where each bus satisfies the following:
 *
 *    num + index % busID === 0
 *
 * If we start with a list of 1 bus
 *
 *    { index: 0,  busID: 19 }
 *
 * We can increment 0 by 1
 *
 *    0, 1, 2, ... 19
 *
 * Until we find 19
 *
 *    19 + 0 % 19 === 0
 *
 * Then we can add the second bus
 *
 *    { index: 0,  busID: 19 }
 *    { index: 9,  busID: 41 }
 *
 * Starting at 19, we increment by the first busID, or 19
 *
 *    19, 38, 57, ... 114
 *
 * Until we find 114, which satisfies our equation
 *
 *    114 + 0 % 19 === 0
 *    114 + 9 % 41 === 0
 *
 * We can now add the third bus
 *
 *    { index: 0,  busID: 19 }
 *    { index: 9,  busID: 41 }
 *    { index: 13, busID: 37 }
 *
 * Starting at 114, we increment by the first busID * second busID,
 *   or 19 * 41 === 779
 *
 *    114, 893, 1672 ... 22705
 *
 * Until we find 22705, which satisfies our equation
 *
 *    22705 + 0  % 19 === 0
 *    22705 + 9  % 41 === 0
 *    22705 + 13 % 37 === 0
 *
 * Continue this pattern!
 */
