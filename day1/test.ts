import { assertEquals } from "@std/assert";
import { solveFirstStar, solveSecondStar } from "./solution.ts";

const exampleList = `3   4
4   3
2   5
1   3
3   9
3   3`;

Deno.test(function firstStarText() {
  assertEquals(solveFirstStar(exampleList), 11);
});

Deno.test(function secondStarText() {
  assertEquals(solveSecondStar(exampleList), 31);
});
