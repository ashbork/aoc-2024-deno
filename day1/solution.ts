import { splitLines } from "../common/split.ts";
import { runDay } from "../common/runDay.ts";

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

export const solveFirstStar = (input: string): number => {
  const lists = readData(input);
  const [left, right] = lists;

  const sortedRight = right.toSorted();
  return left
    .toSorted()
    .map((leftVal, idx) => Math.abs(leftVal - sortedRight[idx]))
    .reduce((acc, current) => acc + current);
};

export const solveSecondStar = (input: string): number => {
  const lists = readData(input);
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

export const day1 = () => runDay(1, solveFirstStar, solveSecondStar);
