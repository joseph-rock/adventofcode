import { input, print } from "common";

type Instructions = {
  list: string[];
  elements: Record<string, Element>;
};

type Element = {
  id: string;
  left: string;
  right: string;
};

function main() {
  const raw = input(2023, 8);
  print(pt1(raw));
}

function pt1(raw: string): number {
  const instructions = parseInstructions(raw);

  let count = 0;
  let index = 0;
  let curr = instructions.elements["AAA"];

  while (curr.id !== "ZZZ") {
    if (instructions.list[index] === "L") {
      curr = instructions.elements[curr.left];
    } else {
      curr = instructions.elements[curr.right];
    }
    count += 1;
    index = count % instructions.list.length;
  }

  return count;
}

function parseInstructions(raw: string): Instructions {
  const parts = raw.split("\n\n");
  const list = parts[0].split("");
  const elements = parts[1]
    .split("\n")
    .map((line) => parseElement(line));

  const record: Record<string, Element> = {};
  for (const element of elements) {
    record[element.id] = element;
  }

  return {
    list: list,
    elements: record,
  };
}

function parseElement(line: string): Element {
  const regex =
    /^(?<id>\w+)(?:\s\=\s\()(?<left>\w+)(?:\,\s)(?<right>\w+)(?:\))/;
  const match = line.match(regex);
  return {
    id: match!.groups!.id,
    left: match!.groups!.left,
    right: match!.groups!.right,
  };
}

main();
