import { input, print } from "../common.ts";
import { add, clone, multiply } from "../deps.ts";

function op(char: string): typeof add | typeof multiply {
  if (char === "+") {
    return add;
  }
  return multiply;
}

function subGroup(arr: string[]): string[] {
  let lCount = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "(") {
      lCount += 1;
    } else if (arr[i] === ")") {
      lCount -= 1;
    }
    if (lCount === 0) {
      return arr.slice(1, i);
    }
  }
  return [...arr];
}

function evaluate(arr: string[]): number {
  const a = clone(arr);

  let operator: typeof add | typeof multiply = add;
  let total = 0;

  while (a.length > 0) {
    const char = a.shift();
    if (char === undefined) return total;

    if (char === "+" || char === "*") {
      operator = op(char);
    } else if (parseInt(char)) {
      total = operator(total, parseInt(char));
    } else if (char === "(") {
      a.unshift(char);
      const group = subGroup(a);
      total = operator(total, evaluate(group));
      for (let i = 0; i < group.length + 2; i++) {
        a.shift();
      }
    }
  }

  return total;
}

function prioritizeAdd(arr: string[]): number {
  const a: string[] = clone(arr);

  while (a.includes("(")) {
    const idx = a.indexOf("(");
    const group = subGroup(a.slice(idx));
    const value = prioritizeAdd(group);
    a.splice(idx, group.length + 2, value.toString());
  }

  while (a.includes("+")) {
    const idx = a.indexOf("+");
    const sum = add(parseInt(a[idx - 1]), parseInt(a[idx + 1]));
    a.splice(idx - 1, 3, sum.toString());
  }

  return evaluate(a);
}

function pt1(raw: string): number {
  const instructions = raw.split("\n");
  return instructions.reduce((total, line) => {
    const ans = line.replaceAll(" ", "").split("");
    return total += evaluate(ans);
  }, 0);
}

function pt2(raw: string): number {
  const instructions = raw.split("\n");
  return instructions.reduce((total, line, idx) => {
    const ans = line.replaceAll(" ", "").split("");
    if (prioritizeAdd(ans) === 0) console.log(idx);
    return total += prioritizeAdd(ans);
  }, 0);
}

const raw = input(2020, 18);
print(pt1(raw), pt2(raw));
