from input_helper import int_list

def part_one(expense_report):
    for expense in expense_report:
        if 2020 - expense in expense_report:
            print_part_one([expense, 2020 - expense])
            return


def part_two(expense_report):
    for x in expense_report:
        for y in expense_report:
            if 2020 - (x + y) in expense_report:
                print_part_two([x, y, (2020 - (x + y))])
                return


def print_part_one(ans):
    print("Part 1")
    print("Numbers are:", ans)
    print("Sum:", ans[0] + ans[1])
    print("Product:", ans[0] * ans[1])
    print()


def print_part_two(ans):
    print("Part 2")
    print("Numbers are:", ans)
    print("Sum:", ans[0] + ans[1] + ans[2])
    print("Product:", ans[0] * ans[1] * ans[2])
    print()


def main():
    expense_report = int_list("1")
    part_one(expense_report)
    part_two(expense_report)


main()
