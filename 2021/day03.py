import numpy as np
from input_helper import str_list

import sys
np.set_printoptions(threshold=sys.maxsize)


def get_array():
    in_list = str_list("3")
    new_list = [list(map(int, [*line])) for line in in_list]
    return np.array(new_list)


def binary2int(binary): 
    int_val, i = 0, 0
    while(binary != 0): 
        a = binary % 10
        int_val = int_val + a * pow(2, i) 
        binary = binary//10
        i += 1
    return int_val


def pt_1(array):
    a = np.transpose(array)

    g = [round(np.mean(i)) for i in a]
    e = [abs(i-1) for i in g]

    gamma = int("".join(list(map(str, g))))
    epsilon = int("".join(list(map(str, e))))

    return binary2int(gamma) * binary2int(epsilon)


def pt_2(array):
    oxy_a = np.transpose(array)
    co2_a = oxy_a.copy()

    bit_pos = len(oxy_a)

    for i in range(bit_pos):
        most_common = round(np.mean(oxy_a[i]))
        indices = [index for index, bit in enumerate(oxy_a[i]) if bit != most_common]
        oxy_a = np.delete(oxy_a, indices, 1)

        print()
        print(i, most_common)
        print()
        print(oxy_a)

    for i in range(bit_pos):
        if len(co2_a[i]) == 1:
            break
        else:
            most_common = round(np.mean(co2_a[i]))
            indices = [index for index, bit in enumerate(co2_a[i]) if bit == most_common]
            co2_a = np.delete(co2_a, indices, 1)

    oxy_gen = int("".join(list(map(str, map(int, oxy_a)))))
    co2_scrubber = int("".join(list(map(str, map(int, co2_a)))))

    print(oxy_gen, binary2int(oxy_gen))
    print(binary2int(co2_scrubber))

    return binary2int(oxy_gen) * binary2int(co2_scrubber)





def main():
    array = get_array()
    print("Part 1:", pt_1(array))
    print(pt_2(array))


main()
