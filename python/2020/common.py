
def str_list(day_num: int) -> "list[str]":
    path = f"./input/2020day{str(day_num)}.txt"
    with open(path) as f:
        str_list = f.read().splitlines()

    return str_list


def int_list(day_num: int) -> "list[int]":
    path = f"./input/2020day{str(day_num)}.txt"
    with open(path) as f:
        int_list = list(map(int, f.readlines()))

    return int_list


def str_block(day_num: int) -> str:
    path = f"./input/2020day{str(day_num)}.txt"
    with open(path) as f:
        file = f.read()

    return file


def print_ans(pt1="", pt2=""):
    print(f"Part 1: {pt1}")
    print(f"Part 2: {pt2}")