import { input, print } from "../common.ts";
import { equals } from "../deps.ts";

function createPassport(list: string[]): Record<string, string> {
  const passport: Record<string, string> = {};
  for (const field of list) {
    const fieldElem = field.split(":");
    passport[fieldElem[0]] = fieldElem[1];
  }
  return passport;
}

function passportList(): Record<string, string>[] {
  return input(2020, 4)
    .split("\n\n")
    .map((word) => word.replaceAll("\n", " ").split(" "))
    .map((passport) => createPassport(passport));
}

function validPassport(
  passport: Record<string, string>,
  requiredFields: string[],
): boolean {
  const keys = Object.keys(passport);
  keys.includes("cid") ? keys : keys.push("cid");
  return equals(keys.sort(), requiredFields);
}

function validField(key: string, value: string): boolean {
  switch (key) {
    case "byr":
      return isByr(value);
    case "iyr":
      return isIyr(value);
    case "eyr":
      return isEyr(value);
    case "hgt":
      return isHgt(value);
    case "hcl":
      return isHcl(value);
    case "ecl":
      return isEcl(value);
    case "pid":
      return isPid(value);
    case "cid":
      return true;
    default:
      return false;
  }
}

function isByr(byr: string): boolean {
  return parseInt(byr) >= 1920 && parseInt(byr) <= 2002;
}

function isIyr(iyr: string): boolean {
  return parseInt(iyr) >= 2010 && parseInt(iyr) <= 2020;
}

function isEyr(eyr: string): boolean {
  return parseInt(eyr) >= 2020 && parseInt(eyr) <= 2030;
}

function isHgt(hgt: string): boolean {
  if (hgt.includes("cm")) {
    return parseInt(hgt) >= 150 && parseInt(hgt) <= 193;
  } else if (hgt.includes("in")) {
    return parseInt(hgt) >= 59 && parseInt(hgt) <= 76;
  }
  return false;
}

function isHcl(hcl: string): boolean {
  const strHexVal = hcl.slice(1);
  if (hcl.startsWith("#") && strHexVal.length === 6) {
    for (const char of [...strHexVal]) {
      if (isNaN(parseInt(char, 16))) {
        return false;
      }
    }
    return true;
  }
  return false;
}

function isEcl(ecl: string): boolean {
  return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(ecl);
}

function isPid(pid: string): boolean {
  if (pid.length !== 9) return false;

  for (const char of [...pid]) {
    if (isNaN(parseInt(char))) {
      return false;
    }
  }

  return true;
}

function partOne(passports: Record<string, string>[]): number {
  const requiredFields = [
    "byr",
    "cid",
    "ecl",
    "eyr",
    "hcl",
    "hgt",
    "iyr",
    "pid",
  ];

  return passports.reduce(
    (total, passport) =>
      validPassport(passport, requiredFields) ? total += 1 : total,
    0,
  );
}

function partTwo(passports: Record<string, string>[]): number {
  const requiredFields = [
    "byr",
    "cid",
    "ecl",
    "eyr",
    "hcl",
    "hgt",
    "iyr",
    "pid",
  ];

  return passports.reduce(
    (total, passport) =>
      validPassport(passport, requiredFields) &&
        !Object.keys(passport)
          .map((key: string) => validField(key, passport[key]))
          .includes(false)
        ? total += 1
        : total,
    0,
  );
}

print(partOne(passportList()), partTwo(passportList()));
