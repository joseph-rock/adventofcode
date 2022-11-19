from common2020 import int_list, print_ans


def pt_1():
    diff1 = 0
    diff3 = 1
    current = 0
    target = max(joltage_list)

    while current < target:
        if(current + 1 in joltage_list):
            current += 1
            diff1 += 1
        elif(current + 2 in joltage_list):
            current += 2
        elif(current + 3 in joltage_list):
            current += 3
            diff3 += 1
        else:
            return -1

    return diff1 * diff3


def pt_2():
    sol = {0:1}
    for line in sorted(joltage_list):
        sol[line] = 0
        if line - 1 in sol:
            sol[line] += sol[line-1]
        if line - 2 in sol:
            sol[line] += sol[line-2]
        if line - 3 in sol:
            sol[line] += sol[line-3]
    
    return sol[max(joltage_list)]


def main():
    pt1 = pt_1()
    pt2 = pt_2()
    print_ans(pt1, pt2)


joltage_list = int_list(10)
main()