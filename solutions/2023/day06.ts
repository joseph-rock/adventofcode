import { input, print } from "common";

type Record = {
  time: number;
  distance: number;
};

function main() {
  const raw = input(2023, 6);
  print(pt1(raw));
}

function pt1(raw: string) {
  const records = parseInput(raw);
  const counts: number[] = [];

  for (const record of records) {
    let count = 0;
    for (let i = 1; i < record.time; i++) {
      if (i * (record.time - i) > record.distance) count++;
    }
    counts.push(count);
  }
  return counts.reduce(
    (total, num) => total *= num,
    1,
  );
}

function parseInput(raw: string): Record[] {
  const records = raw
    .split("\n")
    .map((line) => line.split(":"));
  const time = records[0][1]
    .split(" ")
    .map((num) => parseInt(num))
    .filter((num) => !isNaN(num));
  const distance = records[1][1]
    .split(" ")
    .map((num) => parseInt(num))
    .filter((num) => !isNaN(num));

  return time.map((time, index) => {
    return {
      time: time,
      distance: distance[index],
    };
  });
}

main();
