from common2020 import str_list, print_ans


class PasswordAndPolicy:
    def __init__(self, min, max, letter, password):
        self.min = min
        self.max = max
        self.letter = letter
        self.password = password


def build_PasswordAndPolicy(password_line) -> PasswordAndPolicy:
    rule, letter, password = password_line.split()

    min, max = rule.split("-")
    letter = letter.strip(":")

    return PasswordAndPolicy(int(min), int(max), letter, password)


def password_is_valid_pt1(obj):
    return obj.min <= obj.password.count(obj.letter) <= obj.max


def password_is_valid_pt2(obj):
    first_char = obj.password[obj.min - 1]
    second_char = obj.password[obj.max - 1]

    return (first_char == obj.letter or second_char == obj.letter) \
        and first_char != second_char


def main():
    passwords = str_list(2)
    pt1 = 0
    pt2 = 0

    for password in passwords:
        password_and_policy_obj = build_PasswordAndPolicy(password)

        if password_is_valid_pt1(password_and_policy_obj): pt1 += 1
        if password_is_valid_pt2(password_and_policy_obj): pt2 += 1
        
    print_ans(pt1, pt2)

main()