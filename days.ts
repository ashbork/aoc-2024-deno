import { day1 } from "./day1/solution.ts";
import { day2 } from "./day2/solution.ts";
import { day3 } from "./day3/solution.ts";
import { day4 } from "./day4/solution.ts";
import { day5 } from "./day5/solution.ts";

export const DAYS_MAP = {
  1: day1,
  2: day2,
  3: day3,
  4: day4,
  5: day5,
} as const;

export type ValidDay = keyof typeof DAYS_MAP;
