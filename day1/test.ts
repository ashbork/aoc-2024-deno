import { assertEquals } from "@std/assert";
import { Lists, solveFirstStar, solveSecondStar } from "./solution.ts";

const exampleList: Lists = [
  [3, 4, 2, 1, 3, 3],
  [4, 3, 5, 3, 9, 3],
];

Deno.test(function firstStarText() {
  assertEquals(solveFirstStar(exampleList), 11);
});

Deno.test(function secondStarText() {
  assertEquals(solveSecondStar(exampleList), 31);
});
