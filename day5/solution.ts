import { splitLines } from "../common/split.ts";
import { runDay } from "../common/runDay.ts";

type Instruction = [number, number];

const getCenterMember = (update: number[]): number => {
  if (update.length % 2 === 0) {
    throw Error("Even arrays don't have a single center member");
  }
  return update[Math.floor(update.length / 2)];
};

const getRelevantInstructions = (
  update: number[],
  instructions: Instruction[]
): Instruction[] => {
  return instructions.filter(
    (instruction) =>
      update.includes(instruction[0]) && update.includes(instruction[1])
  );
};

const satisfiesInstructions = (
  update: number[],
  instructions: Instruction[]
): boolean => {
  if (!instructions) return true;

  const findBeforeAndAfter = (
    before: number,
    after: number
  ): [number, number] => {
    return [
      update.findIndex((val) => val === before),
      update.findIndex((val) => val === after),
    ];
  };

  return instructions
    .map((instruction) => {
      const [before, after] = findBeforeAndAfter(...instruction);

      if (before < after) {
        return true;
      }
      return false;
    })
    .every(Boolean);
};

export const processUpdates = (input: string): number => {
  const lines = splitLines(input);

  const sectionBoundary = lines.findIndex((value) => value === "");

  const instructionsSection = lines.slice(0, sectionBoundary);

  const updatesSection = lines.slice(sectionBoundary + 1);

  const instructions: Instruction[] = instructionsSection.map(
    (val) => val.split("|").map((v) => parseInt(v)) as Instruction
  );

  const updates = updatesSection.map((val) =>
    val
      .trim()
      .split(",")
      .map((v) => parseInt(v))
  );

  return updates
    .filter((val) =>
      satisfiesInstructions(val, getRelevantInstructions(val, instructions))
    )
    .map(getCenterMember)
    .reduce((acc, curr) => acc + curr, 0);
};

export const day5 = () => runDay(5, processUpdates);
