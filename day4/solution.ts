import { splitLines } from "../common/split.ts";
import { runDay } from "../common/runDay.ts";

const searchXmas = (lines: string[]): number => {
  return lines
    .map(
      (line) =>
        line
          // unholy lookahead to prevent consuming the matches.
          .matchAll(/(?=(XMAS)|(SAMX))/g)
          .map((match) => match[1])
          .toArray().length
    )
    .reduce((acc, curr) => acc + curr, 0);
};
export const wordSearch = (input: string) => {
  const lines = splitLines(input);

  let found = 0;

  // easiest, search horizontally
  found += searchXmas(lines);

  const transposed = lines[0]
    .split("")
    .map((_, i) => lines.map((row) => row[i]).join(""));

  // search vertically
  found += searchXmas(transposed);

  for (let lineIdx = 0; lineIdx < lines.length - 3; lineIdx++) {
    if (lines[lineIdx].length < 4) {
      // no chance for a diagonal
      break;
    }
    const checkedLines = [0, 1, 2, 3].map((idx) => lines[idx + lineIdx]);

    for (let charIdx = 0; charIdx < checkedLines[0].length - 3; charIdx++) {
      if (
        checkedLines[0][charIdx] === "X" &&
        checkedLines[1][charIdx + 1] === "M" &&
        checkedLines[2][charIdx + 2] === "A" &&
        checkedLines[3][charIdx + 3] === "S"
      ) {
        found += 1;
      }

      if (
        checkedLines[0][charIdx] === "S" &&
        checkedLines[1][charIdx + 1] === "A" &&
        checkedLines[2][charIdx + 2] === "M" &&
        checkedLines[3][charIdx + 3] === "X"
      ) {
        found += 1;
      }

      if (
        checkedLines[0][charIdx + 3] === "S" &&
        checkedLines[1][charIdx + 2] === "A" &&
        checkedLines[2][charIdx + 1] === "M" &&
        checkedLines[3][charIdx + 0] === "X"
      ) {
        found += 1;
      }

      if (
        checkedLines[0][charIdx + 3] === "X" &&
        checkedLines[1][charIdx + 2] === "M" &&
        checkedLines[2][charIdx + 1] === "A" &&
        checkedLines[3][charIdx + 0] === "S"
      ) {
        found += 1;
      }
      // I refuse to make this prettier, suffer as I did
    }
  }

  return found;
};

export const xshapeSearch = (input: string) => {
  const lines = splitLines(input);
  let found = 0;

  for (let lineIdx = 0; lineIdx < lines.length - 2; lineIdx++) {
    if (lines[lineIdx].length < 3) {
      // no chance for an x
      break;
    }
    const checkedLines = [0, 1, 2].map((idx) => lines[idx + lineIdx]);

    for (let charIdx = 0; charIdx < checkedLines[0].length - 2; charIdx++) {
      if (
        ((checkedLines[0][charIdx] === "S" &&
          checkedLines[1][charIdx + 1] === "A" &&
          checkedLines[2][charIdx + 2] === "M") ||
          (checkedLines[0][charIdx] === "M" &&
            checkedLines[1][charIdx + 1] === "A" &&
            checkedLines[2][charIdx + 2] === "S")) &&
        ((checkedLines[0][charIdx + 2] === "S" &&
          checkedLines[1][charIdx + 1] === "A" &&
          checkedLines[2][charIdx + 0] === "M") ||
          (checkedLines[0][charIdx + 2] === "M" &&
            checkedLines[1][charIdx + 1] === "A" &&
            checkedLines[2][charIdx + 0] === "S"))
      ) {
        found += 1;
      }

      // don't let my coworkers see this
    }
  }
  return found;
};

export const day4 = () => runDay(4, wordSearch, xshapeSearch);
