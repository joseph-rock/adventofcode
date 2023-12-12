import { input, print } from "common";

type Card = {
  id: string;
  elfNums: number[];
  winningNums: number[];
};

function main() {
  const raw = input(2023, 4);
  print(pt1(raw));
}

function pt1(raw: string) {
  const cards = parseCards(raw);
  const matchedNumbers = cards.map((card) => matchedNums(card));
  const scores = matchedNumbers.map((matchedNums) => score(matchedNums.length));
  return scores.reduce((total, score) => total += score);
}

function parseCards(raw: string): Card[] {
  const cards = raw.split("\n");
  const cardRegex =
    /(?<id>^.+)(?:\:\s+)(?<winningNums>\d.+)(?:\s+\|\s+)(?<elfNums>\d.+)/;

  return cards.map((card) => {
    const match = card.match(cardRegex);
    const id = match!.groups!.id;
    const winningNums = toNumArray(match!.groups!.winningNums);
    const elfNums = toNumArray(match!.groups!.elfNums);
    return {
      id: id,
      winningNums: winningNums,
      elfNums: elfNums,
    };
  });
}

function toNumArray(string: string): number[] {
  return string
    .split(" ")
    .map((obj) => parseInt(obj))
    .filter((obj) => !isNaN(obj));
}

function matchedNums(card: Card): number[] {
  return card.winningNums.filter((num) => card.elfNums.includes(num));
}

function score(n: number): number {
  return Math.floor(2 ** (n - 1));
}

main();
