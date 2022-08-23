import numpy as np
from common2021 import str_list


def get_array() -> np.array:
    in_list = str_list("3")
    new_list = [list(map(int, line)) for line in in_list]
    return np.array(new_list)


def binary_to_int(binary: int) -> int: 
    int_val, i = 0, 0
    while(binary != 0): 
        a = binary % 10
        int_val = int_val + a * pow(2, i) 
        binary = binary//10
        i += 1
    return int_val


def list_to_binary(l: list) -> int:
    return int("".join(list(map(str, l))))


def pt_1(array: np.array) -> int:
    a = np.transpose(array)

    g = [round(np.mean(i)) for i in a]
    e = [abs(i-1) for i in g]

    gamma_binary = list_to_binary(g)
    epsilon_binary = list_to_binary(e)

    return binary_to_int(gamma_binary) * binary_to_int(epsilon_binary)


def pt_2(array: np.array) -> int:
    # Oxygen Generator
    oxy_arr = np.transpose(array)
    for i in range(len(oxy_arr)):
        if len(oxy_arr[i]) == 1:
            break
        else:
            avg = np.mean(oxy_arr[i])
            if avg >= .5:
                keep_num = 1
            else:
                keep_num = 0

            delete_index = [index for index, bit in enumerate(oxy_arr[i]) if bit != keep_num]
            oxy_arr = np.delete(oxy_arr, delete_index, 1)

    oxy_list = oxy_arr.flatten().tolist()
    oxy_binary = list_to_binary(oxy_list)

    # CO2 Scrubber
    co2_arr = np.transpose(array)
    for i in range(len(co2_arr)):
        if len(co2_arr[i]) == 1:
            break
        else:
            avg = np.mean(co2_arr[i])
            if avg >= 0.5:
                keep_num = 0
            else:
                keep_num = 1

            delete_index = [index for index, bit in enumerate(co2_arr[i]) if bit != keep_num]
            co2_arr = np.delete(co2_arr, delete_index, 1)

    co2_list = co2_arr.flatten().tolist()
    co2_binary = list_to_binary(co2_list)

    return binary_to_int(oxy_binary) * binary_to_int(co2_binary)


def main():
    array = get_array()
    print("Part 1:", pt_1(array))
    print("Part 2:", pt_2(array))


main()
