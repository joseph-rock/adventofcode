import { input, print } from "common";

type Game = {
  id: string;
  sets: Cube[][];
};

type Cube = {
  amount: number;
  color: string;
};

function parseRecords(raw: string): Game[] {
  const foo = raw.split("\n");
  return foo.map((line) => {
    const game = line.split(":");
    const id = game[0];
    const sets = parseSets(game[1]);
    return { id: id, sets: sets };
  });
}

function parseSets(rawSets: string): Cube[][] {
  const sets = rawSets.split(";");
  return sets.map((set) => parseCubes(set));
}

function parseCubes(set: string): Cube[] {
  return set
    .split(",")
    .map((cube) => {
      const traits = cube
        .trim()
        .split(" ");
      return { amount: parseInt(traits[0]), color: traits[1] };
    });
}

function pt1(raw: string) {
  const foo = parseRecords(raw);
  console.log(foo[0]);
  // return raw;
}

const raw = input(2023, 2);
pt1(raw);
// print(pt1(raw));
