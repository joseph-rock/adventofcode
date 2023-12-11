import { Command } from "cliffy";
import { run } from "run_simple";

async function main() {
  const { options } = await new Command()
    .name("deno run --allow-run aoc.ts")
    .description("Run specific Advent of Code solutions.")
    .option("-y, --year <year:string>", "Year of solution.", {
      required: true,
    })
    .option("-d, --day <day:string>", "Day of solution.", {
      required: true,
    })
    .parse(Deno.args);

  if (options.day.length < 2) options.day = `0${options.day}`;
  const target = `./solutions/${options.year}/day${options.day}.ts`;

  await run(`deno run --allow-read ${target}`)
    .then((output) => printOutput(output, options.year, options.day))
    .catch((error) => {
      console.log(error);
      printError(error.stderr, options.year, options.day);
    });
}

function printOutput(output: string, year: string, day: string) {
  console.log(`Advent of Code ${year} - Day ${day}`);
  console.log(output);
}

function printError(stderr: string, year: string, day: string) {
  console.log(stderr);
  console.log(`No solution found for year ${year} day ${day}`);
}

main();
