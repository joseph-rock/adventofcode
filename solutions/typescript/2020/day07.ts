import { input, print } from "../common.ts";

interface Bag {
  bag: string;
  contents: Record<string, number>;
}

function ruleList(raw: string): Bag[] {
  return raw.split("\n").map((line) => bagRule(line));
}

function bagRule(raw: string): Bag {
  const sections = raw.split(/\sbags\scontain\s/);
  const key = sections[0];
  const values: Record<string, number> = {};

  sections[1].includes("no") ? values : sections[1]
    .split(", ")
    .map((rule) => rule.replace(/\sbags?.?/, ""))
    .map((rule) => values[rule.slice(2)] = parseInt(rule));

  return { bag: key, contents: values };
}

function getBag(
  target: string,
  rl: Bag[],
): Bag {
  for (const b of rl) {
    if (b.bag === target) {
      return b;
    }
  }
  return { bag: "", contents: {} };
}

function containsBag(current: string, target: string, rl: Bag[]): boolean {
  const bag = getBag(current, rl);
  if (!bag.contents) return false;
  if (bag.contents[target]) return true;

  for (const b of Object.keys(bag.contents)) {
    if (containsBag(b, target, rl)) {
      return true;
    }
  }
  return false;
}

function countContents(bag: Bag, rl: Bag[]): number {
  let count = 1;

  for (const child of Object.keys(bag.contents)) {
    const bagCount = bag.contents[child];
    const contents = getBag(child, rl);

    count += bagCount * countContents(contents, rl);
  }

  return count;
}

function pt1(target: string, rl: Bag[]): number {
  return rl.reduce(
    (count, b) => containsBag(b.bag, target, rl) ? count += 1 : count,
    0,
  );
}

function pt2(target: string, rl: Bag[]): number {
  const bag = getBag(target, rl);
  const count = countContents(bag, rl);

  return count - 1;
}

const rules = ruleList(input(2020, 7));
print(pt1("shiny gold", rules), pt2("shiny gold", rules));
