
def str_list(day_num: str) -> list[str]:
    path = f"./input/2020day{day_num}.txt"
    with open(path) as f:
        str_list = f.read().splitlines()

    return str_list


def int_list(day_num: str) -> list[int]:
    path = f"./input/2020day{day_num}.txt"
    with open(path) as f:
        int_list = list(map(int, f.readlines()))

    return int_list


def str_block(day_num: str) -> str:
    path = f"./input/2020day{day_num}.txt"
    with open(path) as f:
        file = f.read()

    return file
