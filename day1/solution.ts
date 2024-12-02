import { join } from "@std/path";
import { splitLines } from "../common/split.ts";

export type Lists = [number[], number[]]; // left and right list
type Counter = Record<number, number>; // maps a number to its count

const readData = (text: string): Lists => {
  return splitLines(text).reduce(
    (accumulator: Lists, current) => {
      const [left, right] = current.split("   ");
      return [
        [...accumulator[0], parseInt(left)],
        [...accumulator[1], parseInt(right)],
      ];
    },
    [[], []]
  );
};

export const solveFirstStar = (lists: Lists): number => {
  const [left, right] = lists;

  const sortedRight = right.toSorted();
  return left
    .toSorted()
    .map((leftVal, idx) => Math.abs(leftVal - sortedRight[idx]))
    .reduce((acc, current) => acc + current);
};

export const solveSecondStar = (lists: Lists): number => {
  const [left, right] = lists;
  const counter: Counter = {};

  return left
    .map((leftValue) => {
      if (!(leftValue in counter)) {
        counter[leftValue] = right.filter(
          (rightValue) => leftValue === rightValue
        ).length;
      }
      return leftValue * counter[leftValue];
    })
    .reduce((acc, current) => acc + current);
};

if (import.meta.main) {
  const path = join("day1", "input.txt");
  const input = Deno.readTextFileSync(path);
  const lists = readData(input);

  console.log(solveFirstStar(lists));
  console.log(solveSecondStar(lists));
}
