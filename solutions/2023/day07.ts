import { input, print } from "common";

type Hand = {
  cards: string[];
  bet: number;
  handType: HANDTYPE;
};

enum HANDTYPE {
  FiveofaKind = 0,
  FourofaKind = 1,
  FullHouse = 2,
  ThreeofaKind = 3,
  TwoPair = 4,
  OnePair = 5,
  HighCard = 6,
}

function main() {
  const raw = input(2023, 7);
  print(pt1(raw), pt2(raw));
}

function pt1(raw: string): number {
  const order = [
    "A",
    "K",
    "Q",
    "J",
    "T",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
  ];

  const hands = raw
    .split("\n")
    .map((line) => parseHand(line, order));

  return hands
    .sort((a, b) => sortHands(a, b, order))
    .reduce((total, hand, i) => total += hand.bet * (i + 1), 0);
}

function pt2(raw: string): number {
  const order = [
    "A",
    "K",
    "Q",
    "T",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
    "J",
  ];

  const hands = raw
    .split("\n")
    .map((line) => parseHandWildCard(line, order));

  return hands
    .sort((a, b) => sortHands(a, b, order))
    .reduce((total, hand, i) => total += hand.bet * (i + 1), 0);
}

function parseHand(line: string, order: string[]): Hand {
  const hand = line.split(" ");
  const cards = hand[0].split("");
  const bet = parseInt(hand[1]);

  const sortedCards = sortCards(cards, order);
  const handType = getHandType(sortedCards);
  return {
    cards: cards,
    bet: bet,
    handType: handType,
  };
}

function parseHandWildCard(line: string, order: string[]): Hand {
  const hand = line.split(" ");
  const cards = hand[0].split("");
  const bet = parseInt(hand[1]);

  const sortedCards = sortCards(cards, order);
  const converted = convertWildCard(sortedCards);
  const handType = getHandType(converted);
  return {
    cards: cards,
    bet: bet,
    handType: handType,
  };
}

function sortCards(cards: string[], order: string[]): string[] {
  const copy = [...cards];
  const sorted = copy.sort((a, b) => order.indexOf(a) - order.indexOf(b));
  return orderBestHand(sorted);
}

function sortHands(a: Hand, b: Hand, order: string[]): number {
  if (a.handType !== b.handType) return b.handType - a.handType;
  for (let i = 0; i < 5; i++) {
    if (a.cards[i] !== b.cards[i]) {
      return order.indexOf(b.cards[i]) - order.indexOf(a.cards[i]);
    }
  }
  return 0;
}

function orderBestHand(
  cards: string[],
  ordered: string[] = [],
  windowOffset = 4,
): string[] {
  if (windowOffset === 0 || cards.length === 1) {
    ordered.push(...cards);
    return ordered;
  }

  if (windowOffset >= cards.length) {
    return orderBestHand(cards, ordered, windowOffset - 1);
  }

  const copy = [...cards];
  for (let i = 0; i < copy.length - windowOffset; i++) {
    if (copy[i] === copy[i + windowOffset]) {
      const best = copy.splice(i, windowOffset + 1);
      ordered.push(...best);
      return orderBestHand(copy, ordered, windowOffset);
    }
  }
  return orderBestHand(copy, ordered, windowOffset - 1);
}

function convertWildCard(cards: string[]): string[] {
  if (!cards.includes("J")) return cards;

  const copy = [...cards];
  let first = copy[0];
  if (first === "J") first = copy.find((c) => c !== "J") ?? first;

  for (let i = 0; i < copy.length; i++) {
    if (copy[i] === "J") {
      copy.splice(i, 1);
      copy.unshift(first);
    }
  }

  return copy;
}

function getHandType(cards: string[]): HANDTYPE {
  if (isFiveofaKind(cards)) return HANDTYPE.FiveofaKind;
  if (isFourofaKind(cards)) return HANDTYPE.FourofaKind;
  if (isFullHouse(cards)) return HANDTYPE.FullHouse;
  if (isThreeofaKind(cards)) return HANDTYPE.ThreeofaKind;
  if (isTwoPair(cards)) return HANDTYPE.TwoPair;
  if (isOnePair(cards)) return HANDTYPE.OnePair;
  return HANDTYPE.HighCard;
}

function isFiveofaKind(cards: string[]): boolean {
  return isPairOfSize(cards, 4);
}

function isFourofaKind(cards: string[]): boolean {
  return isPairOfSize(cards, 3);
}

function isFullHouse(cards: string[]): boolean {
  return isPairOfSize(cards, 2) &&
    isPairOfSize(cards.slice(3, 5));
}

function isThreeofaKind(cards: string[]): boolean {
  return isPairOfSize(cards, 2);
}

function isTwoPair(cards: string[]): boolean {
  return isPairOfSize(cards.slice(2)) &&
    isPairOfSize(cards.slice(2, 4));
}

function isOnePair(cards: string[]): boolean {
  return isPairOfSize(cards);
}

function isPairOfSize(cards: string[], windowOffset = 1): boolean {
  for (let i = 0; i < cards.length - windowOffset; i++) {
    if (cards[i] === cards[i + windowOffset]) {
      return true;
    }
  }
  return false;
}

main();
