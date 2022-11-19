import re
from common2020 import str_block, print_ans


def formatted_notes(my_notes) -> list:
    groups_RE = re.compile(r'(\w+\n?)+(\n|$)')
    organized_notes = groups_RE.finditer(my_notes)
    
    all_group_ans = [individual_ans(group) for group in organized_notes]

    return all_group_ans


def individual_ans(group) -> list:
    individual_RE =re.compile(r'(\w)+')
    individuals_ans = individual_RE.finditer(group.group())
    return [i.group() for i in individuals_ans]


def ans_1(group_ans):

    combined_ans = ""
    total = 0

    for i in group_ans:
        for j in i:
            combined_ans += j

        total += len(set(combined_ans))
        combined_ans = ""

    return total


def ans_2(group_ans):

    total = 0
    combined_ans = ""

    for people in group_ans:
        if len(people) == 1:
            total += len(people[0])
        else:
            for ind in people:
                combined_ans += ind

            unique_ans = set(combined_ans)

            for i in unique_ans:
                if combined_ans.count(i) == len(people):
                    total += 1
            
            combined_ans = ""

    return total


def main():
    my_notes = str_block(6)
    group_ans = formatted_notes(my_notes)
    pt1 = ans_1(group_ans)
    pt2 = ans_2(group_ans)
    print_ans(pt1, pt2)


main()
