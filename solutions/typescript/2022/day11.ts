import { input, print } from "common";
import { add, clone, multiply } from "ramda";

interface Monkey {
  name: string;
  items: number[];
  itemsInspected: number;
  op: Op;
  test: Test;
}

interface Op {
  amt: number;
  op: typeof add | typeof multiply;
}

interface Test {
  divby: number;
  trueTarget: string;
  falseTarget: string;
}

function operation(block: string): typeof add | typeof multiply {
  if (block[0] === "*") {
    return multiply;
  }
  return add;
}

function monkey(block: string): Monkey {
  const sections = block.split("\n");

  const name = sections[0].replace(":", "").replace("Monkey ", "");
  const items = sections[1]
    .trim()
    .replace("Starting items: ", "")
    .split(", ")
    .map((num) => parseInt(num));

  const opRaw = sections[2]
    .trim()
    .replace("Operation: new = old ", "")
    .split(" ");
  const op: Op = { op: operation(opRaw[0]), amt: parseInt(opRaw[1]) };

  const divby = sections[3].trim().replace(
    "Test: divisible by ",
    "",
  );
  const trueTarget = sections[4].trim().replace(
    "If true: throw to monkey ",
    "",
  );
  const falseTarget = sections[5].trim().replace(
    "If false: throw to monkey ",
    "",
  );
  const test: Test = {
    divby: parseInt(divby),
    trueTarget: trueTarget,
    falseTarget: falseTarget,
  };

  return { name: name, items: items, itemsInspected: 0, op: op, test: test };
}

function cycle(monkeys: Record<string, Monkey>) {
  const next = clone(monkeys);

  for (const monkey of Object.keys(next)) {
    while (next[monkey].items.length > 0) {
      next[monkey].itemsInspected += 1;
      const item = next[monkey].items.shift();
      const testNum = next[monkey].test.divby;
      const trueTarget = next[monkey].test.trueTarget;
      const falseTarget = next[monkey].test.falseTarget;

      let worry = !isNaN(next[monkey].op.amt)
        ? next[monkey].op.op(next[monkey].op.amt, item)
        : next[monkey].op.op(item, item);

      worry = Math.floor(worry / 3);
      worry % testNum === 0
        ? next[trueTarget].items.push(worry)
        : next[falseTarget].items.push(worry);
    }
  }
  return next;
}

function pt1(raw: string) {
  const rawMonkeys = raw.split("\n\n");
  const monkeys: Record<string, Monkey> = {};
  rawMonkeys.forEach((rawMonkey) => {
    const monk = monkey(rawMonkey);
    monkeys[monk.name] = monk;
  });
  const rounds = 20;

  let next = clone(monkeys);

  for (let i = 0; i < rounds; i++) {
    const prev = clone(next);
    next = cycle(prev);
  }

  const inspected = [];
  for (const monkey of Object.keys(next)) {
    inspected.push(next[monkey].itemsInspected);
  }
  inspected.sort((a, b) => b - a);
  return inspected[0] * inspected[1];
}

const raw = input(2022, 11);
print(pt1(raw));
