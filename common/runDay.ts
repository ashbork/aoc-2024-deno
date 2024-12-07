import { join } from "@std/path/join";

const runWithMeasuredTime = <T>(cb: () => T): [T, number] => {
  const t0 = performance.now();
  const result = cb();
  const tdelta = performance.now() - t0;

  return [result, tdelta];
};

const formatTime = (millis: number) => {
  if (millis >= 100) {
    return (millis / 100).toPrecision(2).padStart(3) + "s";
  }
  if (millis < 1) {
    return (millis * 100).toPrecision(2).padStart(3) + "µs";
  }
  return millis.toPrecision(2).padStart(3) + "ms";
};

const rejectWithError = (error?: string) => {
  if (error) {
    console.error(error);
  }
  console.groupEnd();
  return Promise.reject();
};

export const runDay = async (
  day: number,
  oneStarCallback: (input: string) => unknown,
  twoStarCallback?: (input: string) => unknown
): Promise<void> => {
  console.group(`✨ Day ${day}`);
  const path = join(`day${day}`, "input.txt");
  let input;

  try {
    input = await Deno.readTextFile(path);
  } catch {
    return rejectWithError(
      `❌ Failed to read file: ${path}. You might be missing input.txt - it's not in the Git repo per the author's wishes. Get it from https://adventofcode.com/2024/day/${day}/input`
    );
  }

  try {
    const [result, time] = runWithMeasuredTime(() => oneStarCallback(input));
    console.log(
      `⭐️   ${String(result).padEnd(20)} %c(${formatTime(time)})`,
      time < 100 ? "color: grey" : "color: red"
    );
  } catch (e) {
    return rejectWithError(`❌ Error running the ⭐️:\n${e}`);
  }

  if (!twoStarCallback) {
    return console.log("%c⭐️⭐️ not done", "color: grey");
  }
  try {
    const [result, time] = runWithMeasuredTime(() => twoStarCallback(input));

    console.log(
      `%c⭐️⭐️ ${String(result).padEnd(20)} %c(${formatTime(time)})`,
      "color: yellow",
      "color: grey"
    );
  } catch (e) {
    return rejectWithError(`❌ Error running the ⭐️⭐️:\n${e}`);
  }

  console.groupEnd();
  return Promise.resolve();
};
