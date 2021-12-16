import numpy as np
from input_helper import str_list


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
    a = np.transpose(array)
    bit_pos = len(a)

    oxy_a = a.copy()
    co2_a = a.copy()

    # Oxygen Generator
    for i in range(bit_pos):
        rnd = np.mean(oxy_a[i])
        if rnd >= .5:
            keep_num = 1
        else:
            keep_num = 0

        indices = [index for index, bit in enumerate(oxy_a[i]) if bit != keep_num]
        oxy_a = np.delete(oxy_a, indices, 1)

    # CO2 Scrubber
    for i in range(bit_pos):
        if len(co2_a[i]) == 1:
            break
        else:
            rnd = np.mean(co2_a[i])
            if rnd >= 0.5:
                keep_num = 0
            else:
                keep_num = 1

            indices = [index for index, bit in enumerate(co2_a[i]) if bit != keep_num]
            co2_a = np.delete(co2_a, indices, 1)

    # TODO Make less gross
    oxy_gen =      int("".join(list(map(str, oxy_a.flatten().tolist()))))
    co2_scrubber = int("".join(list(map(str, co2_a.flatten().tolist()))))

    return binary2int(oxy_gen) * binary2int(co2_scrubber)


def main():
    array = get_array()
    print("Part 1:", pt_1(array))
    print("Part 2:", pt_2(array))


main()
