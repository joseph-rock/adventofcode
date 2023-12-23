import { input, leastCommonMultiple, print } from "common";

type Network = {
  inst: string[];
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
  return stepsToNode(network, network.nodes["AAA"], ["ZZZ"]);
}

function pt2(raw: string): number {
  const network = parseNetwork(raw);
  const startIds = Object.keys(network.nodes)
    .filter((id) => id.charAt(2) === "A");
  const endIds = Object.keys(network.nodes)
    .filter((id) => id.charAt(2) === "Z");
  const stepCounts = startIds
    .map((id) => stepsToNode(network, network.nodes[id], endIds));
  return leastCommonMultiple(stepCounts);
}

function parseNetwork(raw: string): Network {
  const parts = raw.split("\n\n");
  const inst = parts[0].split("");
  const nodes = parts[1]
    .split("\n")
    .map((line) => parseNode(line))
    .reduce((nodes, node) => ({ ...nodes, [node.id]: node }), {});

  return {
    inst,
    nodes,
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

function stepsToNode(
  map: Network,
  start: Node,
  end: string[],
): number {
  let count = 0;
  let index = 0;
  let node = start;

  while (!end.includes(node.id)) {
    const nextID = map.inst[index] === "L" ? node.left : node.right;
    node = map.nodes[nextID];
    count += 1;
    index = count % map.inst.length;
  }

  return count;
}

main();
