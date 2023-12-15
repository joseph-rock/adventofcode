import { input, print } from "common";

type Hand = {
  cards: string[];
  bet: number;
  handType: number;
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

const CARDS = [
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

function main() {
  const raw = input(2023, 7);
  print(pt1(raw));
}

function pt1(raw: string) {
  const hands = raw
    .split("\n")
    .map((line) => parseHand(line));

  return hands
    .sort((a, b) => sortHands(b, a))
    .reduce((total, hand, i) => total += hand.bet * (i + 1), 0);
}

function parseHand(line: string): Hand {
  const hand = line.split(" ");
  const cards = hand[0].split("");
  const bet = parseInt(hand[1]);
  const handType = getHandType(cards);
  return {
    cards: cards,
    bet: bet,
    handType: handType,
  };
}

function sortCards(cards: string[]): string[] {
  const copy = [...cards];
  const sorted = copy.sort((a, b) => CARDS.indexOf(a) - CARDS.indexOf(b));
  return orderBestHand(sorted);
}

const sortHands = (a: Hand, b: Hand) => {
  if (a.handType !== b.handType) return a.handType - b.handType;
  for (let i = 0; i < 5; i++) {
    if (a.cards[i] !== b.cards[i]) {
      return CARDS.indexOf(a.cards[i]) - CARDS.indexOf(b.cards[i]);
    }
  }
  return 0;
};

function orderBestHand(
  cards: string[],
  ordered: string[] = [],
  windowOffset = 4,
): string[] {
  if (windowOffset === 0 || cards.length === 1) {
    ordered.push(...cards);
    return ordered;
  }

  if (windowOffset > cards.length) {
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

function getHandType(cards: string[]): HANDTYPE {
  const sorted = sortCards(cards);
  if (isFiveofaKind(sorted)) return HANDTYPE.FiveofaKind;
  if (isFourofaKind(sorted)) return HANDTYPE.FourofaKind;
  if (isFullHouse(sorted)) return HANDTYPE.FullHouse;
  if (isThreeofaKind(sorted)) return HANDTYPE.ThreeofaKind;
  if (isTwoPair(sorted)) return HANDTYPE.TwoPair;
  if (isOnePair(sorted)) return HANDTYPE.OnePair;
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
