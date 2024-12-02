import { join } from "@std/path/join";
import { pairwise } from "../common/pairwise.ts";
import { splitLines } from "../common/split.ts";

type Input = Report[];
type Report = number[];

const readData = (text: string): Input =>
  splitLines(text).map((line) => line.split(" ").map((el) => parseInt(el)));

export const solveFirstStar = (input: Input) => {
  return input.filter(isReportSafe).length;
};

export const solveSecondStar = (input: Input) => {
  return input.filter(isReportSafeDampened).length;
};

const getSteps = (report: Report): number[] =>
  pairwise(report).map(([a, b]) => a - b);

export const isReportSafe = (report: Report): boolean => {
  const steps = getSteps(report);

  return (
    steps.every((step) => step <= 3 && step > 0) ||
    steps.every((step) => step >= -3 && step < 0)
  );
};

export const isReportSafeDampened = (report: Report): boolean => {
  if (isReportSafe(report)) {
    return true;
  } else {
    return report
      .map((_, idx, arr) => {
        return isReportSafe([...arr.slice(0, idx), ...arr.slice(idx + 1)]);
      })
      .some((v) => !!v);
  }
};

// Here's an attempt at a better solution - this one higher up sadly just goes removes items and sees if that makes the report safe.
// There's definitely a more optimal way to go about it, but I spent way too much time on it already.
// Let this be a memorial for those that once scoffed at 2nd day 2*s.

// export const isReportSafeDampened = (report: Report): boolean => {
//   // if (isReportSafe(report)) {
//   //   // Safe reports continue to be safe under the Problem Dampener
//   //   return true;
//   // }

//   const steps = getSteps(report);

//   const isMostlyAscending =
//     steps.filter((step) => step > 0).length >
//     steps.filter((step) => step < 0).length;
//   const isMostlyDescending = !isMostlyAscending;

//   let hasDampened = false;

//   for (let index = 0; index < steps.length - 1; index++) {
//     const thisStep = steps[index];
//     const nextStep = steps[index + 1];

//     if (thisStep === 0) {
//       if (hasDampened) return false;
//       else hasDampened = true;
//       continue;
//     }

//     if (
//       (isMostlyAscending && thisStep < 0) ||
//       (isMostlyDescending && thisStep > 0) ||
//       thisStep > 3 ||
//       thisStep < -3 ||
//       thisStep === 0
//     ) {
//       // -3 3 -3

//       const theoreticalStep = thisStep + nextStep;

//       if (Math.abs(theoreticalStep) < 3 && theoreticalStep !== 0) {
//         if (hasDampened) return false;
//         else hasDampened = true;
//       } else {
//         return false;
//       }
//     }
//   }

//   console.log("safe", steps);

//   return true;
// };

if (import.meta.main) {
  const path = join("day2", "input.txt");
  const input = Deno.readTextFileSync(path);
  const reports = readData(input);

  console.log(solveFirstStar(reports));
  console.log(solveSecondStar(reports));
}
