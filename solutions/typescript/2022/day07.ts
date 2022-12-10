import { input, print } from "common";

interface Node {
  name: string;
  type: FileType;
  size: number;
  parent?: Node;
  children: Record<string, Node>;
}

enum FileType {
  FILE,
  DIR,
}

function mkdir(name: string, parent: Node): Node {
  return {
    name: name,
    type: FileType.DIR,
    size: 0,
    parent: parent,
    children: {},
  };
}

function mkfile(name: string, size: number, parent: Node): Node {
  return {
    name: name,
    type: FileType.FILE,
    size: size,
    parent: parent,
    children: {},
  };
}

function root(output: string[]): Node {
  const home: Node = {
    name: "/",
    type: FileType.DIR,
    size: 0,
    children: {},
  };

  const root = home;
  let dir = home;

  for (const line of output) {
    if (line.includes("$ ls")) continue;

    if (line.includes("$ cd")) {
      if (line.includes("cd /")) {
        dir = root;
      } else if (line.includes("cd ..")) {
        dir = dir.parent || dir;
      } else {
        const subDir = line.replace("$ cd ", "");
        dir = dir.children[subDir] || dir;
      }
      continue;
    }

    const ls = line.split(" ");
    if (ls[0] === "dir") {
      const name = ls[1];
      const subDir = mkdir(name, dir);
      dir.children[subDir.name] = subDir;
    } else {
      const name = ls[1];
      const size = parseInt(ls[0]);
      const subDir = mkfile(name, size, dir);
      dir.children[subDir.name] = subDir;
    }
  }
  calcSize(root);
  return root;
}

function calcSize(node: Node): number {
  if (node.type === FileType.FILE) return node.size;
  for (const child of Object.keys(node.children)) {
    calcSize(node.children[child]);
    node.size += node.children[child].size;
  }
  return node.size;
}

function sumDirOfMaxSize(node: Node, max: number): number {
  if (node.type === FileType.FILE) return 0;
  let sum = 0;
  if (node.size <= max) sum += node.size;
  for (const child of Object.keys(node.children)) {
    sum += sumDirOfMaxSize(node.children[child], max);
  }
  return sum;
}

function fileToDeleteSize(node: Node, min: number, best: number): number {
  if (node.type === FileType.FILE) return best;
  if (node.size >= min && node.size < best) {
    best = node.size;
  }
  for (const child of Object.keys(node.children)) {
    const test = fileToDeleteSize(node.children[child], min, best);
    if (test >= min && test < best) {
      best = test;
    }
  }
  return best;
}

function pt1(raw: string): number {
  const output = raw.split("\n");
  const rootDir = root(output);

  const maxSize = 100000;
  return sumDirOfMaxSize(rootDir, maxSize);
}

function pt2(raw: string): number {
  const output = raw.split("\n");
  const rootDir = root(output);

  const totalSpace = 70000000;
  const reqSpace = 30000000;
  const minSpaceToFree = reqSpace - (totalSpace - rootDir.size);
  return fileToDeleteSize(rootDir, minSpaceToFree, totalSpace);
}

const raw = input(2022, 7);
print(pt1(raw), pt2(raw));
