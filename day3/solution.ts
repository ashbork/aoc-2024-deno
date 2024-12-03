import { join } from "@std/path/join";

export const mullOver = (input: string): number => {
  // A valid mul instruction is:
  // mul(XXX,YYY), where XXX and YYY are 1-3-digit positive numbers.

  // A regex will probably work for 1* and won't work for 2*, but let's do it anyway

  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

  return input
    .matchAll(regex)
    .map((match) => parseInt(match[1]) * parseInt(match[2]))
    .reduce((acc, curr) => acc + curr, 0);
};

export const mullOverWithDo = (input: string): number => {
  // I like my regex too much to let it go, so we'll just do more regexes. Regice? Regices?

  // update: tried lookarounds but couldn't wrap my head around them.

  const mulInstructionRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;

  const doOrDontRegex = /(do\(\)|don't\(\))/g;

  const doOrDontMatches = input.matchAll(doOrDontRegex);

  const doIndices: number[] = [];
  const dontIndices: number[] = [];

  doOrDontMatches.forEach((val) => {
    if (val[0] === "do()") {
      doIndices.push(val.index);
    } else {
      dontIndices.push(val.index);
    }
  });

  const isValidMulPlacement = (idx: number) => {
    const lastDontIdx = dontIndices.findLast((dontIdx) => dontIdx < idx);
    if (lastDontIdx === undefined) {
      return true; // if there are no don'ts prior to the idx we're fine
    }

    const lastDo = doIndices.findLast(
      (doIdx) => doIdx < idx && doIdx > lastDontIdx
    );

    return !!lastDo;
  };

  return input
    .matchAll(mulInstructionRegex)
    .filter((match) => isValidMulPlacement(match.index))
    .map((match) => parseInt(match[1]) * parseInt(match[2]))
    .reduce((acc, curr) => acc + curr, 0);
};

if (import.meta.main) {
  const path = join("day3", "input.txt");
  const input = Deno.readTextFileSync(path);

  console.log(mullOver(input));
  console.log(mullOverWithDo(input));
}
