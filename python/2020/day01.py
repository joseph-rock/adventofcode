from common2020 import int_list, print_ans

def part_one(expense_report):
    for expense in expense_report:
        if 2020 - expense in expense_report:
            return expense * (2020 - expense)
    return -1


def part_two(expense_report):
    for x in expense_report:
        for y in expense_report:
            if 2020 - (x + y) in expense_report:
                return x * y * (2020 - x - y)
    return -1


def main():
    expense_report = int_list(1)
    pt1 = part_one(expense_report)
    pt2 = part_two(expense_report)
    print_ans(pt1, pt2)


main()
