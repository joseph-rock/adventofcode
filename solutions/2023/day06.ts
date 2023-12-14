import { input, print, toNumArray } from "common";

type Record = {
  time: number;
  distance: number;
};

function main() {
  const raw = input(2023, 6);
  print(pt1(raw), pt2(raw));
}

function pt1(raw: string) {
  const records = inputToRecordList(raw);
  const counts: number[] = [];

  for (const record of records) {
    let count = 0;
    for (let holdTime = 1; holdTime < record.time; holdTime++) {
      if (holdTime * (record.time - holdTime) > record.distance) count++;
    }
    counts.push(count);
  }

  return counts.reduce(
    (total, num) => total *= num,
    1,
  );
}

function pt2(raw: string) {
  const record = inputToRecord(raw);
  let count = 0;

  for (let holdTime = 0; holdTime < record.time; holdTime++) {
    if (holdTime * (record.time - holdTime) > record.distance) count += 1;
  }

  return count;
}

function inputToRecordList(raw: string): Record[] {
  const records = raw
    .split("\n")
    .map((line) => line.split(":"));
  const time = toNumArray(records[0][1], " ");
  const distance = toNumArray(records[1][1], " ");

  return time.map((time, index) => {
    return {
      time: time,
      distance: distance[index],
    };
  });
}

function inputToRecord(raw: string): Record {
  const records = raw.replaceAll(" ", "").split("\n");
  const time = records[0].split(":")[1];
  const distance = records[1].split(":")[1];
  return {
    time: parseInt(time),
    distance: parseInt(distance),
  };
}

main();
