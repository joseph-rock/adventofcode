import re
from input_helper import str_block


class Game:
    def __init__(self) -> None:
        self.boards = []
        self.numbers = []


def parse_input():
    file = str_block("4")
    game = Game

    # get the number list
    number_re = re.compile(r'(\d+,?){6,}(\n)')
    number = number_re.match(file).group().strip().split(",")
    game.numbers = list(map(int, number))

    # get all the boards
    board_re = re.compile(r'(\d+\s+){25}(\n|$)')
    board = board_re.finditer(file)

    boards = []
    for i in board:
        board = i.group().split()
        boards.append((list(map(int, board))))

    game.boards = boards

    return game    


def pt_1(game):
    for board in game.boards:
        # iter through numbers
        for num in game.numbers:
            # replace match with -1
            # check if winner
            pass


def main():
    game = parse_input()
    pt_1(game)


main()