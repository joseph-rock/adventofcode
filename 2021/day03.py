import numpy as np
from input_helper import str_list


def get_array() -> np.array:
    in_list = str_list("3")
    new_list = [list(map(int, [*line])) for line in in_list]
    return np.array(new_list)


def binary2int(binary) -> int: 
    int_val, i = 0, 0
    while(binary != 0): 
        a = binary % 10
        int_val = int_val + a * pow(2, i) 
        binary = binary//10
        i += 1
    return int_val


def pt_1(array) -> int:
    a = np.transpose(array)

    g = [round(np.mean(i)) for i in a]
    e = [abs(i-1) for i in g]

    gamma = int("".join(list(map(str, g))))
    epsilon = int("".join(list(map(str, e))))

    return binary2int(gamma) * binary2int(epsilon)


def pt_2(array) -> int:
    a = np.transpose(array)

    oxy_a = a.copy()
    co2_a = a.copy()

    # Oxygen Generator
    for i in range(len(a)):
        if len(oxy_a[i]) == 1:
            break
        else:
            avg = np.mean(oxy_a[i])
            if avg >= .5:
                keep_num = 1
            else:
                keep_num = 0

            delete_index = [index for index, bit in enumerate(oxy_a[i]) if bit != keep_num]
            oxy_a = np.delete(oxy_a, delete_index, 1)

    # CO2 Scrubber
    for i in range(len(a)):
        if len(co2_a[i]) == 1:
            break
        else:
            avg = np.mean(co2_a[i])
            if avg >= 0.5:
                keep_num = 0
            else:
                keep_num = 1

            delete_index = [index for index, bit in enumerate(co2_a[i]) if bit != keep_num]
            co2_a = np.delete(co2_a, delete_index, 1)

    oxy_a = oxy_a.flatten().tolist()
    oxygen_generator = int("".join(list(map(str, oxy_a))))

    co2_a = co2_a.flatten().tolist()
    co2_scrubber = int("".join(list(map(str, co2_a))))

    return binary2int(oxygen_generator) * binary2int(co2_scrubber)


def main():
    array = get_array()
    print("Part 1:", pt_1(array))
    print("Part 2:", pt_2(array))


main()
