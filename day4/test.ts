import { assert } from "@std/assert";
import { parameterize } from "../common/test.ts";
import { wordSearch, xshapeSearch } from "./solution.ts";

Deno.test({
  name: "wordSearch",
  fn() {
    parameterize(
      [
        "XMASXMAS", // horizontal
        "XX\nMM\nAA\nSS", // vertical
        "X000\n0M00\n00A0\n000S", // diagonal
        // backwards
        "S000\n0A00\n00M0\n000X",
        "SAMXSAMX",
        "SS\nAA\nMM\nXX",
        `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
      ],
      [2, 2, 1, 1, 2, 2, 18],

      wordSearch
    );
  },
});

Deno.test({
  name: "xshapeSearch",
  fn() {
    assert(
      xshapeSearch(`MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`) === 9,
      "expected 9"
    );
  },
});
