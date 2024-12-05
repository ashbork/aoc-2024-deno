import { splitLines } from "../common/split.ts";

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

export const processUpdates = (input: string): number => {
  const lines = splitLines(input);

  const sectionBoundary = lines.findIndex((value) => value === "");

  const instructionsSection = lines.slice(0, sectionBoundary);

  const updatesSection = lines.slice(sectionBoundary + 1);

  const instructions: Instruction[] = instructionsSection.map(
    (val) => val.split("|").map((v) => parseInt(v)) as Instruction
  );

  const updates = updatesSection.map((val) =>
    val.split(",").map((v) => parseInt(v))
  );

  console.log(instructions);
  console.log(updates);

  // console.log(getCenterMember(updates[0]));

  console.log(getRelevantInstructions(updates[0], instructions));

  return 0;
};
