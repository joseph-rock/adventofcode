from input_helper import int_list

def solve(readings, window_size) -> int:
    return sum(b > a for a, b in zip(readings, readings[window_size:]))


def main():
    readings = int_list("1")
    pt1 = solve(readings, 1)
    print(f"Part 1: {pt1}")
    pt2 = solve(readings, 3)
    print(f"Part 2: {pt2}")


main()
