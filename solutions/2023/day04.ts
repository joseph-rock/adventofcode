import { input, print } from "common";

type Card = {
  id: string;
  elfNums: number[];
  winningNums: number[];
};

function main() {
  const raw = input(2023, 4);
  print(pt1(raw), pt2(raw));
}

function pt1(raw: string): number {
  const cards = parseCards(raw);
  return cards
    .map((card) => matchedNums(card))
    .map((matchedNums) => score(matchedNums.length))
    .reduce((total, score) => total += score);
}

function pt2(raw: string): number {
  const cards = parseCards(raw);
  const queue: number[] = [];
  let total = 0;

  for (const card of cards) {
    const copies = queue.shift() ?? 1;
    total += copies;

    const totalMatched = matchedNums(card).length;
    for (let i = 0; i < totalMatched; i++) {
      queue[i] ? queue[i] += copies : queue[i] = copies + 1;
    }
  }
  return total;
}

function parseCards(raw: string): Card[] {
  const cards = raw.split("\n");
  const cardRegex =
    /(?<id>^.+)(?:\:\s+)(?<winningNums>\d.+)(?:\s+\|\s+)(?<elfNums>\d.+)/;

  return cards.map((card) => {
    const match = card.match(cardRegex);
    return {
      id: match!.groups!.id,
      winningNums: toNumArray(match!.groups!.winningNums),
      elfNums: toNumArray(match!.groups!.elfNums),
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
