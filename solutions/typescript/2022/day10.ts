import { input, print } from "common";

function drawPixel(pixels: string, cursor: number): string {
  const window = [cursor - 1, cursor, cursor + 1];
  return window.includes(pixels.length) ? pixels + "#" : pixels + ".";
}

function pt1(raw: string) {
  const instructions = raw.split("\n");
  const checkIdx = [20, 60, 100, 140, 180, 220];
  const result: number[] = [];

  let cycle = 0;
  let strength = 1;

  for (const inst of instructions) {
    cycle += 1;
    if (checkIdx.includes(cycle)) result.push(cycle * strength);
    if (!inst.includes("noop")) {
      cycle += 1;
      if (checkIdx.includes(cycle)) result.push(cycle * strength);
      const value = parseInt(inst.split(" ")[1]);
      strength += value;
    }
  }
  return result.reduce((total, value) => total += value);
}

function pt2(raw: string) {
  const instructions = raw.split("\n");
  const result: string[] = [];
  let line = "";

  let cycle = 0;
  let spritePos = 1;

  for (const inst of instructions) {
    cycle += 1;
    if (cycle > 40) {
      result.push(line);
      line = "";
      cycle = 1;
    }
    line = drawPixel(line, spritePos);
    if (!inst.includes("noop")) {
      cycle += 1;
      if (cycle > 40) {
        result.push(line);
        line = "";
        cycle = 1;
      }
      line = drawPixel(line, spritePos);
      const value = parseInt(inst.split(" ")[1]);
      spritePos += value;
    }
  }
  result.push(line);
  return result;
}

const raw = input(2022, 10);
print(pt1(raw), "-");
console.log(pt2(raw));
