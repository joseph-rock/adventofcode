import { input, print } from "common";

type Game = {
  id: number;
  sets: SetCubes[];
};

type SetCubes = {
  red: number;
  green: number;
  blue: number;
};

function main() {
  const raw = input(2023, 2);
  print(pt1(raw), pt2(raw));
}

function pt1(raw: string): number {
  const games = parseRecords(raw);
  return games.reduce(
    (total, game) =>
      game.sets.some((set) => isImpossible(set)) ? total : total += game.id,
    0,
  );
}

function pt2(raw: string): number {
  const games = parseRecords(raw);
  return games.reduce((total, game) => total += powerLevel(game), 0);
}

function parseRecords(raw: string): Game[] {
  const games = raw.split("\n");
  return games.map((line) => {
    const game = line.split(":");
    const id = parseGameID(game[0]);
    const sets = parseSets(game[1]);
    return { id: id, sets: sets };
  });
}

function parseGameID(gameID: string): number {
  const parts = gameID.split(" ");
  return parseInt(parts[1]);
}

function parseSets(rawSets: string): SetCubes[] {
  const sets = rawSets.split(";");
  return sets.map((set) => parseSet(set));
}

function parseSet(set: string): SetCubes {
  let red = 0;
  let green = 0;
  let blue = 0;
  const cubes = set.split(",");
  for (const cube of cubes) {
    const traits = cube.trim().split(" ");
    if (traits[1] === "red") red += parseInt(traits[0]);
    if (traits[1] === "green") green += parseInt(traits[0]);
    if (traits[1] === "blue") blue += parseInt(traits[0]);
  }

  return {
    red: red,
    green: green,
    blue: blue,
  };
}

function isImpossible(cubes: SetCubes): boolean {
  return cubes.red > 12 ||
    cubes.green > 13 ||
    cubes.blue > 14;
}

function powerLevel(game: Game): number {
  let red = 0;
  let green = 0;
  let blue = 0;

  for (const set of game.sets) {
    if (set.red > red) red = set.red;
    if (set.green > green) green = set.green;
    if (set.blue > blue) blue = set.blue;
  }
  return red * green * blue;
}

main();
