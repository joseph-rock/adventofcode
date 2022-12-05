import { input, print } from "../common.ts";

function priority(char: string): number {
  const all = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return all.indexOf(char) + 1;
}

function common(a: string, b: string) {
  const c = new Set<string>();
  const compare = [...b];

  for (const char of [...a]) {
    if (compare.includes(char)) {
      c.add(char);
    }
  }
  return Array.from(c);
}

function commonThree(a: string, b: string, c: string): string {
  return common(common(a, b).join(""), c).toString();
}

function pt1(raw: string) {
  const supplies = raw.split("\n");
  const commonList: string[] = [];

  for (const bag of supplies) {
    const mid = bag.length / 2;
    const compA = bag.slice(0, mid);
    const compB = bag.slice(mid);
    commonList.push(...common(compA, compB));
  }

  return commonList.reduce((total, char) => total += priority(char), 0);
}

function pt2(raw: string) {
  const supplies = raw.split("\n");
  const badgeList: string[] = [];
  let group: string[] = [];

  for (const bag of supplies) {
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
