import re
from input_helper import str_block


def formatted_notes() -> list:
    my_notes = str_block("6")

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

    print("Part 1:", total)


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

    print("Part 2:", total)


def main():
    group_ans = formatted_notes()
    ans_1(group_ans)
    ans_2(group_ans)


main()
