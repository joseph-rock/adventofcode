import { input, print } from "common";
import { intersection } from "ramda";

function priority(char: string): number {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet.indexOf(char) + 1;
}

function commonThree(a: string, b: string, c: string): string {
  return intersection(intersection(a, b).join(""), c).toString();
}

function pt1(raw: string): number {
  const rucksacks = raw.split("\n");
  const commonList: string[] = [];

  for (const rucksack of rucksacks) {
    const mid = rucksack.length / 2;
    const compA = rucksack.slice(0, mid);
    const compB = rucksack.slice(mid);
    commonList.push(...intersection(compA, compB));
  }

  return commonList.reduce((total, char) => total += priority(char), 0);
}

function pt2(raw: string): number {
  const rucksacks = raw.split("\n");
  const badgeList: string[] = [];
  let group: string[] = [];

  for (const bag of rucksacks) {
    if (group.length === 3) {
      badgeList.push(commonThree(group[0], group[1], group[2]));
      group = [];
    }
    group.push(bag);
  }

  badgeList.push(commonThree(group[0], group[1], group[2]));
  return badgeList.reduce((total, char) => total += priority(char), 0);
}

const raw = input(2022, 3);
print(pt1(raw), pt2(raw));
