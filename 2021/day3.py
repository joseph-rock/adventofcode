import numpy as np
from input_helper import str_list


def binary2int(binary): 
    int_val, i = 0, 0
    while(binary != 0): 
        a = binary % 10
        int_val = int_val + a * pow(2, i) 
        binary = binary//10
        i += 1
    return int_val


def pt_1(in_list):
    new_list = [list(map(int, [*line])) for line in in_list]
    a = np.array(new_list)
    a = np.transpose(a)

    g = [round(np.mean(i)) for i in a]
    e = [abs(i-1) for i in g]

    gamma = int("".join(list(map(str, g))))
    epsilon = int("".join(list(map(str, e))))

    return binary2int(gamma) * binary2int(epsilon)


def main():
    in_list = str_list("3")
    print("Part 1:", pt_1(in_list))


main()
