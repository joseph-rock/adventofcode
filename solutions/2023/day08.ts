import { input, print } from "common";

type Map = {
  instructions: string[];
  nodes: Record<string, Node>;
};

type Node = {
  id: string;
  left: string;
  right: string;
};

function main() {
  const raw = input(2023, 8);
  print(pt1(raw));
}

function pt1(raw: string): number {
  const map = parseInstructions(raw);

  let count = 0;
  let index = 0;
  let curr = map.nodes["AAA"];

  while (curr.id !== "ZZZ") {
    if (map.instructions[index] === "L") {
      curr = map.nodes[curr.left];
    } else {
      curr = map.nodes[curr.right];
    }
    count += 1;
    index = count % map.instructions.length;
  }

  return count;
}

function parseInstructions(raw: string): Map {
  const parts = raw.split("\n\n");
  const instructions = parts[0].split("");
  const lines = parts[1]
    .split("\n")
    .map((line) => parseNode(line));

  const nodes: Record<string, Node> = {};
  for (const line of lines) {
    nodes[line.id] = line;
  }

  return {
    instructions: instructions,
    nodes: nodes,
  };
}

function parseNode(line: string): Node {
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
