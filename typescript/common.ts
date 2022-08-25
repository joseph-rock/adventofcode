export function input(year: number, day: number): string {
  return Deno.readTextFileSync(`../../input/${year}/day${day}.txt`);
}
