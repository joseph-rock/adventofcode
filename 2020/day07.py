import re
from common import str_list, print_ans

class Bag:

    def __init__(self, color):
        self.color = color
        self.contents = {}
        self.checked = False
        self.has_bag = False


def file_parse() -> list:
    input_list = str_list(7)
    return [bag_constructor(line) for line in input_list]


def bag_constructor(line) -> Bag:
    parent_re = re.compile(r'(^\w+\s\w+)')
    child_re = re.compile(r'(\d)(?:\s)(\w+\s\w+)')

    parents = parent_re.finditer(line)
    children = child_re.finditer(line)

    for parent in parents:
        bag = Bag(parent.group(1))

        for child in children:
            bag_color = child.group(2)
            bag_count = int(child.group(1))
            bag.contents[bag_color] = bag_count
            
    return bag


def get_bag(color) -> Bag:
    for bag in bag_list:
        if bag.color == color:
            return bag

    exit("Fatal. Bag does not exist!")


def contains_bag(parent_bag, color) -> bool:
    # If the bag has already been checked
    if parent_bag.checked:
        return parent_bag.has_bag

    # If the bag is the color we are searching for
    if color == parent_bag.color:
        return True
    
    # Check the child bags
    for child in parent_bag.contents:
        child_bag = get_bag(child)

        if contains_bag(child_bag, color):
            child_bag.checked = True
            child_bag.has_bag = True
            return True

    # Bag cannot contain color searched for
    parent_bag.checked = True
    return False


def count_contents(bag) -> int:
    count = 1

    for child in bag.contents:
        bag_count = int(bag.contents[child])
        contents = get_bag(child)

        count += bag_count * count_contents(contents)

    return count


def pt1_ans(color):
    count = 0

    for bag in bag_list:
        if contains_bag(bag, color):
            count += 1

    return count - 1


def pt2_ans(color):
    bag = get_bag(color)
    count = count_contents(bag)

    return count - 1


def main():
    pt1 = pt1_ans("shiny gold")
    pt2 = pt2_ans("shiny gold")
    print_ans(pt1, pt2)


bag_list = file_parse()
main()
