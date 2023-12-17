export function input(year: number, day: number): string {
  return Deno.readTextFileSync(`./input/${year}/day${day}.txt`);
}

export function print(pt1: string | number, pt2?: string | number): void {
  console.log(`Part 1: ${pt1}`);
  console.log(`Part 2: ${pt2}`);
}

export function toNumArray(input: string, deliminator = ""): number[] {
  return input
    .split(deliminator)
    .map((num) => parseInt(num))
    .filter((num) => !isNaN(num));
}

export function lowestCommonMultiple(nums: number[]): number {
  const factors = nums
    .map((num) => primeFactors(num))
    .flat();
  const unique = [...new Set(factors)];
  return unique
    .reduce((total, num) => total *= num, 1);
}

export function primeFactors(num: number): number[] {
  const factors: number[] = [];

  while (primeFactor(num) > 0) {
    factors.push(primeFactor(num));
    num = num / primeFactor(num);
  }
  factors.push(num);

  return factors;
}

function primeFactor(num: number): number {
  const truncatedNum: number = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= truncatedNum; i++) {
    if (num % i == 0) {
      return i;
    }
  }
  return 0;
}
