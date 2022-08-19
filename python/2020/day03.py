from common import str_list, print_ans


def skip_line_check(y_pos, yn):
    return y_pos % yn != 0


def is_tree(pos):
    return pos == "#"


def update_x_pos(x_pos, xn, x_len):
    x_pos += xn
    if x_pos >= x_len:
        x_pos -= x_len

    return x_pos


def sled_with_slope(xn, yn):
    sled_map = str_list(3)
    tree_count = 0
    x_pos = 0

    for y_pos, map_line in enumerate(sled_map):
        if skip_line_check(y_pos, yn):
            continue

        if is_tree(map_line[x_pos]):
            tree_count+= 1
        
        x_pos = update_x_pos(x_pos, xn, len(map_line))

    return tree_count


def main():
    pt1 = sled_with_slope(3, 1)

    b1 = sled_with_slope(1, 1)
    b2 = sled_with_slope(3, 1)
    b3 = sled_with_slope(5, 1)
    b4 = sled_with_slope(7, 1)
    b5 = sled_with_slope(1, 2)
    pt2 = b1 * b2 * b3 * b4 * b5

    print_ans(pt1, pt2)


main()