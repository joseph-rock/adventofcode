import { input, print } from "common";

type Game = {
  id: number;
  sets: Cube[][];
};

type Cube = {
  amount: number;
  color: string;
};

function main() {
  const raw = input(2023, 2);
  print(pt1(raw), pt2(raw));
}

function pt1(raw: string): number {
  const games = parseRecords(raw);
  return games.reduce((total, game) =>
    game.sets
        .some((set) =>
          set
            .some((cube) => isImpossible(cube))
        )
      ? total
      : total += game.id, 0);
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

function isImpossible(cube: Cube): boolean {
  if (cube.color === "red") return cube.amount > 12;
  if (cube.color === "green") return cube.amount > 13;
  if (cube.color === "blue") return cube.amount > 14;
  return true;
}

function powerLevel(game: Game): number {
  let red = 0;
  let green = 0;
  let blue = 0;

  for (const set of game.sets) {
    for (const cube of set) {
      if (cube.color === "red" && cube.amount > red) red = cube.amount;
      if (cube.color === "green" && cube.amount > green) green = cube.amount;
      if (cube.color === "blue" && cube.amount > blue) blue = cube.amount;
    }
  }
  return red * green * blue;
}

main();
