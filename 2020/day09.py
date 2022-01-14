from common import int_list, print_ans


def get_cursor(preamble_start) -> list:
    preamble_max = preamble_start + 25
    return [in_list[i] for i in range(preamble_start, preamble_max)]


def get_number(preamble_start) -> int:
    return in_list[preamble_start + 25]


def invalid_num(preamble, num) -> bool:
    invalid_num = True

    for i in preamble:
        if abs(num - i) in preamble:
            invalid_num = False

    return invalid_num

def pt_1() -> int:
    preamble_start = 0
    preamble_final = len(in_list) - 25

    while preamble_start < preamble_final:
        preamble = get_cursor(preamble_start)
        num = get_number(preamble_start)

        if invalid_num(preamble, num):
            return num

        preamble_start += 1

    return -1


def pt_2(num) -> int:

    for index, _ in enumerate(in_list):
        count = 0
        found_list = []

        for i in range(index, len(in_list)):
            if count > num:
                break

            found_list.append(in_list[i])
            count += in_list[i]

            if count == num and len(found_list) >= 2:
               min_num = min(found_list) 
               max_num = max(found_list)
               return min_num + max_num

    return -1


def main():
    pt1 = pt_1()
    pt2 = pt_2(pt1)
    print_ans(pt1, pt2)  


in_list = int_list("9")
main()
