import re
from common2020 import str_list, print_ans


class Instruction:

    def __init__(self, operation, argument):
        self.operation = operation
        self.argument = argument
        self.read = False


def read_instructions() -> list:
    input_list = str_list(8)
    instructions = [construct_instruction(line) for line in input_list]

    return instructions


def construct_instruction(line) -> Instruction:
    inst_re = re.compile(r'(^\w\w\w)(?:\s)([+|-]\d+)')
    inst_match = inst_re.match(line)

    operation = inst_match.group(1)
    argument = int(inst_match.group(2))

    return Instruction(operation, argument)


def reset():
    for instruction in instructions:
        instruction.read = False 


def is_acc(operation): 
    return operation == "acc"


def is_jmp(operation): 
    return operation == "jmp"


def is_nop(operation): 
    return operation == "nop"


def flip(operation):
    if is_jmp(operation):
        return "nop"
    if is_nop(operation):
        return "jmp"
    return operation


def run():
    accumulator = 0
    cursor_index = 0
    max_index = len(instructions)

    while cursor_index < max_index:
        if instructions[cursor_index].read:
            return accumulator, False

        operation = instructions[cursor_index].operation
        argument = instructions[cursor_index].argument

        instructions[cursor_index].read = True

        if is_acc(operation):
            accumulator += argument
        elif is_jmp(operation):
            cursor_index += argument
            continue

        cursor_index += 1

    return accumulator, True


def pt_1():
    return run()[0]


def pt_2():
    for instruction in instructions:
        reset()

        # Skip acc lines
        if is_acc(instruction.operation):
            continue

        # Flip instruction
        instruction.operation = flip(instruction.operation)

        # Test boot
        accumulator, boot_sucessful = run()

        if boot_sucessful: 
            return accumulator

        # Reset instruction if fails to boot
        instruction.operation = flip(instruction.operation)

    return accumulator


def main():
    pt1 = pt_1()
    pt2 = pt_2()
    print_ans(pt1, pt2)
    

instructions = read_instructions()
main()
