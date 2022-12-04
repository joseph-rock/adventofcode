
def path(day_num: int) -> str:
    return f"./input/2021/day{str(day_num)}.txt"

def str_list(day_num: int) -> "list[str]":
    with open(path(day_num)) as f:
        str_list = f.read().splitlines()

    return str_list


def int_list(day_num: int) -> "list[int]":
    with open(path(day_num)) as f:
        int_list = list(map(int, f.readlines()))

    return int_list


def str_block(day_num: int) -> str:
    with open(path(day_num)) as f:
        file = f.read()

    return file


def print_ans(pt1="", pt2=""):
    print(f"Part 1: {pt1}")
    print(f"Part 2: {pt2}")