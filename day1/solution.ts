import { join } from "@std/path";

export type Lists = [number[], number[]]; // left and right tuple

const readData = (text: string): Lists => {
  const lines = text.split("\r\n");

  const [left, right] = lines.reduce(
    (accumulator: [number[], number[]], current) => {
      const [left, right] = current.split("   ");
      return [
        [...accumulator[0], parseInt(left)],
        [...accumulator[1], parseInt(right)],
      ] as [number[], number[]];
    },
    [[], []] as [number[], number[]]
  );

  return [left, right];
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
  const counter: Record<number, number> = {};

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
