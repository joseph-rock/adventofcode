import { input, print } from "common";

type instruction = {
  operation: string,
  argument: number
}

type bootLog = {
  accumulator: number,
  terminates: boolean
}

function instructionList(raw: string): instruction[] {
  return raw
    .split("\n")
    .map((line: string) => formatInstruction(line));
}

function formatInstruction(rawInst: string): instruction {
  const inst = rawInst.split(" ");
  const op = inst[0];
  const arg = Number.parseInt(inst[1]);
  return {
    operation: op,
    argument: arg
  };
}

function flipInstruction(inst: instruction): instruction {
  let op = inst.operation;
  const arg = inst.argument;

  if (op === "jmp") {
    op = "nop";
  }
  else if (op === "nop") {
    op = "jmp";
  }
  return {
    operation: op,
    argument: arg
  };
}

function boot(instructions: instruction[]): bootLog {
  let accumulator = 0;
  let cursorIndex = 0;
  let terminates = true;
  const cache: Record<number, instruction> = {};
  const maxIndex = instructions.length;

  while (cursorIndex < maxIndex) {
    if (cache[cursorIndex] !== undefined) {
      terminates = false;
      break;
    }

    cache[cursorIndex] = instructions[cursorIndex];

    if (cache[cursorIndex].operation === "acc") {
      accumulator += cache[cursorIndex].argument;
      cursorIndex += 1;
    }
    else if (cache[cursorIndex].operation === "jmp") {
      cursorIndex += cache[cursorIndex].argument;
    }
    else { // "nop"
      cursorIndex += 1;
    }
  }

  return {
    accumulator: accumulator,
    terminates: terminates
  };
}

function pt1(instructions: instruction[]): number {
  return boot(instructions).accumulator;
}

function pt2(instructions: instruction[]): number {
  for (let i = 0; i < instructions.length; i++) {
    if (instructions[i].operation === "acc") {
      continue;
    }

    instructions[i] = flipInstruction(instructions[i]);
    const bootLog = boot(instructions);

    if (bootLog.terminates) {
      return bootLog.accumulator;
    }
    instructions[i] = flipInstruction(instructions[i]);
  }
  return -1;
}

const instructions = instructionList(input(2020, 8));
print(pt1(instructions), pt2(instructions));
