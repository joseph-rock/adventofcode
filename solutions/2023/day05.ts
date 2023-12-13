import { input, print } from "common";

type Almanac = {
  seeds: number[];
  seedToSoil: SeedMap[];
  soilToFertilizer: SeedMap[];
  fertilizerToWater: SeedMap[];
  waterToLight: SeedMap[];
  lightToTemperature: SeedMap[];
  temperatureToHumidity: SeedMap[];
  humidityToLocation: SeedMap[];
};

type SeedMap = {
  destination: number;
  source: number;
  rangeLength: number;
};

function main() {
  const raw = input(2023, 5);
  print(pt1(raw));
}

function pt1(raw: string): number {
  const almanac = parseAlmanac(raw);
  return Math.min(...solve(almanac));
}

function pt2(raw: string) {
}

function parseAlmanac(raw: string): Almanac {
  const sections = raw
    .split("\n\n")
    .map((section) => parseSection(section));
  const seeds = sections.shift()!.mapList.flat();
  const seedMaps = sections
    .map((section) =>
      section.mapList
        .map((list) => {
          return {
            destination: list[0],
            source: list[1],
            rangeLength: list[2],
          };
        })
    );

  return {
    seeds: seeds,
    seedToSoil: seedMaps[0],
    soilToFertilizer: seedMaps[1],
    fertilizerToWater: seedMaps[2],
    waterToLight: seedMaps[3],
    lightToTemperature: seedMaps[4],
    temperatureToHumidity: seedMaps[5],
    humidityToLocation: seedMaps[6],
  };
}

function parseSection(section: string) {
  const traits = section.split(":");
  const id = traits[0];
  const mapList = traits[1]
    .trim()
    .split("\n")
    .map((entry) =>
      entry
        .split(" ")
        .map((num) => parseInt(num))
        .filter((num) => !isNaN(num))
    );
  return {
    id: id,
    mapList: mapList,
  };
}

function nextSeedNumber(seedMaps: SeedMap[], seed: number): number {
  for (const seedMap of seedMaps) {
    const diff = seed - seedMap.source;
    if (diff >= 0 && diff < seedMap.rangeLength) {
      return seedMap.destination + diff;
    }
  }
  return seed;
}

function solve(almanac: Almanac): number[] {
  const seeds = [];
  for (const seed of almanac.seeds) {
    let s = seed;
    s = nextSeedNumber(almanac.seedToSoil, s);
    s = nextSeedNumber(almanac.soilToFertilizer, s);
    s = nextSeedNumber(almanac.fertilizerToWater, s);
    s = nextSeedNumber(almanac.waterToLight, s);
    s = nextSeedNumber(almanac.lightToTemperature, s);
    s = nextSeedNumber(almanac.temperatureToHumidity, s);
    s = nextSeedNumber(almanac.humidityToLocation, s);
    seeds.push(s);
  }
  return seeds;
}

main();
