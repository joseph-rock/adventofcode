import { input, primeFactors, print } from "common";

type Network = {
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
  const network = parseNetwork(raw);
  return countToZZZ(network, network.nodes["AAA"]);
}

function pt2(raw: string): number {
  const network = parseNetwork(raw);

  const stepCounts = Object.keys(network.nodes)
    .filter((id) => id.charAt(2) === "A")
    .map((id) => countToAnyZ(network, network.nodes[id]));
  const allPrimeFactors = stepCounts
    .map((count) => primeFactors(count))
    .flat();
  const uniqueFactors = [...new Set(allPrimeFactors)];
  const LCM = uniqueFactors
    .reduce((total, num) => total *= num, 1);

  return LCM;
}

function parseNetwork(raw: string): Network {
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

function countToZZZ(map: Network, start: Node): number {
  let count = 0;
  let index = 0;
  let node = start;

  while (node.id !== "ZZZ") {
    node = next(map, node, map.instructions[index]);
    count += 1;
    index = count % map.instructions.length;
  }

  return count;
}

function countToAnyZ(map: Network, start: Node) {
  let count = 0;
  let index = 0;
  let node = start;

  while (node.id.charAt(2) !== "Z") {
    node = next(map, node, map.instructions[index]);
    count += 1;
    index = count % map.instructions.length;
  }

  return count;
}

function next(map: Network, node: Node, dir: string): Node {
  if (dir === "L") {
    return map.nodes[node.left];
  }
  return map.nodes[node.right];
}

main();
