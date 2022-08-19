import re
from common import str_block, print_ans


def row_calc(inst):
    row_total = 128
    row_max = 127
    row_min = 0

    for i in inst:
        row_total /= 2
        if i == "F":
            row_max -= row_total
        else:
            row_min += row_total

    return row_max


def col_calc(inst):
    col_total = 8
    col_max = 7
    col_min = 0

    for i in inst:
        col_total /= 2
        if i == "L":
            col_max -= col_total
        else:
            col_min += col_total    

    return col_max


def boarding_pass_id(row, col):
    return (row * 8) + col


def open_seats(manifest):
    manifest.sort()
    plane_seats = []
    for row in range(127):
        for col in range(7):
            plane_seats.append([row, col])

    for i in manifest:
        if i in plane_seats:
            plane_seats.remove(i)

    open_seats_ = []
    for i in plane_seats:
        open_seats_.append(boarding_pass_id(i[0], i[1]))

    for i in open_seats_:
        if i - 1 not in open_seats_ and i + 1 not in open_seats_:
            return i



def main():
    inst_list = str_block(5)
    highest = 0

    inst_RE = re.compile(r'(\w\w\w\w\w\w\w)(\w\w\w)(\n|$)')
    m = inst_RE.finditer(inst_list)

    manifest = []

    for i in m:
        row = row_calc(i.group(1))
        col = col_calc(i.group(2))
        bpid = boarding_pass_id(row, col)
        if bpid > highest:
            highest = bpid
        manifest.append([row, col])

    pt1 = highest
    pt2 = open_seats(manifest)

    print_ans(pt1, pt2)


main()


