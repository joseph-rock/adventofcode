import { input, print } from "common";

enum RPS {
  ROCK = 1,
  PAPER = 2,
  SCISSORS = 3,
}

enum Outcome {
  WIN = 6,
  DRAW = 3,
  LOSS = 0,
}

function strategyGuide(raw: string): string[] {
  return raw.split("\n");
}

function rps(char: string): RPS {
  switch (char.toUpperCase()) {
    case "A":
    case "X":
      return RPS.ROCK;
    case "B":
    case "Y":
      return RPS.PAPER;
    case "C":
    case "Z":
      return RPS.SCISSORS;

    default:
      return -1;
  }
}

function outcome(char: string): Outcome {
  switch (char.toUpperCase()) {
    case "X":
      return Outcome.LOSS;
    case "Y":
      return Outcome.DRAW;
    case "Z":
      return Outcome.WIN;

    default:
      return -1;
  }
}

function result(player: string, opp: string): Outcome {
  if (rps(player) === rps(opp)) {
    return Outcome.DRAW;
  }
  if (
    rps(player) === RPS.ROCK && rps(opp) === RPS.SCISSORS ||
    rps(player) === RPS.PAPER && rps(opp) === RPS.ROCK ||
    rps(player) === RPS.SCISSORS && rps(opp) === RPS.PAPER
  ) {
    return Outcome.WIN;
  }
  return Outcome.LOSS;
}

function fixResult(opponent: string, target: Outcome): RPS {
  for (const choice of ["X", "Y", "Z"]) {
    const r = result(choice, opponent);
    if (target === r) {
      return rps(choice);
    }
  }
  return -1;
}

function pt1(raw: string): number {
  const guide = strategyGuide(raw);

  let total = 0;
  for (const round of guide) {
    const a = round.split(" ");
    const oppChoice = a[0];
    const playerChoice = a[1];
    total += rps(playerChoice) + result(playerChoice, oppChoice);
  }
  return total;
}

function pt2(raw: string): number {
  const guide = strategyGuide(raw);

  let total = 0;
  for (const round of guide) {
    const a = round.split(" ");
    const oppChoice = a[0];
    const result = outcome(a[1]);
    const playerChoice = fixResult(oppChoice, result);
    total += playerChoice + result;
  }
  return total;
}

const raw = input(2022, 2);
print(pt1(raw), pt2(raw));
