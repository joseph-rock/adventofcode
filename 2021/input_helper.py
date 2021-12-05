
def str_list(day: str) -> list[str]:
    path = f"./input/2021day{day}.txt"
    with open(path) as f:
        str_list = f.read().splitlines()

    return str_list


def int_list(day: str) -> list[int]:
    path = f"./input/2021day{day}.txt"
    with open(path) as f:
        int_list = list(map(int, f.readlines()))

    return int_list


def str_block(day: str) -> str:
    path = f"./input/2021day{day}.txt"
    with open(path) as f:
        file = f.read()

    return file
