import { DAYS_MAP, ValidDay } from "./days.ts";
import { parseArgs } from "@std/cli";
import { plural } from "./common/plural.ts";

const usage = () => {
  console.log(`Ashley's AoC 2024

Usage: 
  main.ts -h | --help
  main.ts
  main.ts <day>...

Options:
  -h, --help  Shows this message

Arguments:
  <day>...    One or more days to run, separated by spaces (example: 1,2,3). When not present, all available days will run

Examples: 
  main.ts 1 2 3 # Runs days 1, 2 and 3
  main.ts       # Runs all available days
`);
};

const runDay = async (day: ValidDay): Promise<void> => {
  if (!(day in DAYS_MAP)) {
    console.error("❌ Day not done yet or not added to days.DAYS_MAP");
  }
  await DAYS_MAP[day]();
};

if (import.meta.main) {
  const args = parseArgs(Deno.args, {
    alias: {
      h: "help",
    },
  });

  if (args.help) {
    usage();
    Deno.exit(0);
  }

  const days = args._.length
    ? args._.map((value) =>
        typeof value === "number" ? value : parseInt(value)
      ).toSorted()
    : Object.keys(DAYS_MAP).map((days) => parseInt(days));

  if (days.some(isNaN)) {
    console.error("❌ Non-number argument passed, exiting.");
    usage();
    Deno.exit(1);
  }

  const unfinishedDays = days.filter((day) => !(day in DAYS_MAP));

  const areAllDaysValid = (_days: number[]): _days is ValidDay[] =>
    !unfinishedDays.length;

  if (!areAllDaysValid(days)) {
    console.error(
      `❌ ${plural(
        unfinishedDays.length,
        "One of the days provided is not",
        "Some of the days are not"
      )} done yet: ${unfinishedDays.join(",")}`
    );
    Deno.exit(1);
  }
  let result = Promise.resolve();

  days.forEach((day) => {
    result = result.then(async () => await runDay(day));
    return result;
  });
}
