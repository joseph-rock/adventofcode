from common2021 import str_list


def read_input() -> list:
    file = str_list("2")

    sep_input = [i.split() for i in file]
    inst_list = [[dir, int(value)] for dir, value in sep_input]

    return inst_list


def pt_1(inst):
    x = 0
    depth = 0

    for dir, value in inst:
        if dir == "forward":
            x += value
        elif dir == "down":
            depth += value
        elif dir == "up":
            depth -= value

    print(x * depth)


def pt_2(inst):
    x = 0
    depth = 0
    aim = 0

    for dir, value in inst:
        if dir == "forward":
            x += value
            depth += (aim * value)
        elif dir == "down":
            aim += value
        elif dir == "up":
            aim -= value

    print(x * depth)


inst_list = read_input()
pt_1(inst_list)
pt_2(inst_list)
