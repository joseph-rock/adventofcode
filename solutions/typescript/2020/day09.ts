import { input, print } from "common";

function numberSeries(raw: string): number[] {
  return raw
  .split("\n")
  .map(num => Number.parseInt(num));
}

function isValidNumber(checkSeries: number[], nextNumber: number): boolean {
  for(const num of checkSeries) {
    if(checkSeries.includes(Math.abs(nextNumber - num))) {
      return true;
    }
  }
  return false;
}

function pt1(numSeries: number[], preambleLength: number): number {
  for (let i = preambleLength; i < numSeries.length; i++) {
    const checkSeries = numSeries.slice(i - preambleLength, i);
    const nextNumber = numSeries[i];

    if(!isValidNumber(checkSeries, nextNumber)) {
      return nextNumber;
    }
  }
  return -1;
}

function pt2(numSeries: number[], preambleLength: number): number {
  const invalidNumber = pt1(series, preambleLength);

  for(let startIdx = 0; startIdx < numSeries.length; startIdx++) {
    let sum = numSeries[startIdx];

    for(let endIdx = startIdx + 1; endIdx < numSeries.length; endIdx++) {
      sum += numSeries[endIdx];

      if(sum > invalidNumber) {
        break;
      }

      else if(sum === invalidNumber) {
        const contiguousSet = numSeries
          .slice(startIdx, endIdx + 1)
          .sort((a , b) => a - b);
        const lowestNumber = contiguousSet[0];
        const highestNumber = contiguousSet[contiguousSet.length-1];

        return lowestNumber + highestNumber;
      }
    }
  }

  return -1;
}

const series = numberSeries(input(2020, 9));
const preambleLength = 25;

print(pt1(series, preambleLength), pt2(series, preambleLength));
