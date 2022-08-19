import re
from common import str_block, print_ans


def parse_passports(batch) -> list:
    passport_RE = re.compile(r'(.+\n?)+(\n|$)')
    all_passports = passport_RE.finditer(batch)
    passports_list = [formatted_fields(passport) for passport in all_passports]

    return passports_list


def formatted_fields(passport) -> dict:
    field_RE = re.compile(r'(\w{3})(:)(\S+)(\n|\s|$)')
    field_items = field_RE.finditer(passport.group())

    return {field.group(1) : field.group(3) for field in field_items}



def date_in_range(date, min, max)-> bool:
    return min <= int(date) <= max


def height_in_range(height)-> bool:
    height_RE = re.compile(r'(\d+)(\w+)')

    x = re.match(height_RE, height)
    
    if x.group(2) == "cm":
        return 150 <= int(x.group(1)) <= 193
    elif x.group(2) == "in":
        return 59 <= int(x.group(1)) <= 76

    return False


def correct_hair_color(hair_color)-> bool:
    hair_color_RE = re.compile(r'(#)([0-9a-fA-F]{6})($)')
    return re.match(hair_color_RE, hair_color)


def correct_eye_color(eye_color)-> bool:
    correct_colors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]
    return eye_color in correct_colors


def correct_passport_id(passport_id) -> bool:
    pid_RE = re.compile(r'((^)[0-9]{9})($)')
    return re.match(pid_RE, passport_id)


def all_fields_present(passport_raw)-> bool:
    field_list = {"byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"}

    check_list = set(passport_raw.keys())
    check_list.add("cid")

    return check_list == field_list


def all_fields_correct(passport)-> bool:
    return \
            date_in_range(passport["byr"], 1920, 2002) and \
            date_in_range(passport["iyr"], 2010, 2020) and \
            date_in_range(passport["eyr"], 2020, 2030) and \
            height_in_range(passport["hgt"]) and \
            correct_hair_color(passport["hcl"]) and \
            correct_eye_color(passport["ecl"]) and \
            correct_passport_id(passport["pid"])


def check_passports(all_passports):
    pt1 = 0
    pt2 = 0

    for passport in all_passports:

        if all_fields_present(passport):
            pt1 += 1
            
            if all_fields_correct(passport):
                pt2 += 1

    return pt1, pt2


def main():
    batch = str_block(4)
    passports = parse_passports(batch)
    pt1, pt2 = check_passports(passports)
    print_ans(pt1, pt2)


main()
