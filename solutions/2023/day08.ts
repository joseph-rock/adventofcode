import { input, print } from "common";

type Input = {
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
  print(pt1(raw), pt2(raw));
}

function pt1(raw: string): number {
  const map = parseInstructions(raw);
  return count(map, map.nodes["AAA"], map.nodes["ZZZ"]);
}

function pt2(raw: string): number {
  const map = parseInstructions(raw);

  const nodes = Object.keys(map.nodes)
    .filter((id) => id.charAt(2) === "A")
    .map((id) => map.nodes[id])
    .map((node) => countToZ(map, node));

  const factors = nodes
    .map((node) => primeFactors(node.count))
    .flat();

  return [...new Set(factors)].reduce((total, num) => total *= num, 1);
}

function count(map: Input, start: Node, end: Node): number {
  let count = 0;
  let index = 0;
  let node = start;

  while (node !== end) {
    node = next(map, node, map.instructions[index]);
    count += 1;
    index = count % map.instructions.length;
  }

  return count;
}

function countToZ(map: Input, start: Node) {
  let count = 1;
  let index = 1;
  let node = next(map, start, map.instructions[0]);

  while (node.id.charAt(2) !== "Z") {
    node = next(map, node, map.instructions[index]);
    count += 1;
    index = count % map.instructions.length;
  }
  return { node: node, count: count };
}

function next(map: Input, node: Node, dir: string): Node {
  if (dir === "L") {
    return map.nodes[node.left];
  }
  return map.nodes[node.right];
}

function parseInstructions(raw: string): Input {
  const parts = raw.split("\n\n");
  const instructions = parts[0].split("");
  const nodes = parts[1]
    .split("\n")
    .map((line) => parseNode(line))
    .reduce((nodes, node) => ({ ...nodes, [node.id]: node }), {});

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

function primeFactor(num: number): number {
  const truncatedNum: number = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= truncatedNum; i++) {
    if (num % i == 0) {
      return i;
    }
  }
  return 0;
}

function primeFactors(num: number): number[] {
  const factors: number[] = [];

  while (primeFactor(num) > 0) {
    factors.push(primeFactor(num));
    num = num / primeFactor(num);
  }
  factors.push(num);

  return factors;
}

main();
