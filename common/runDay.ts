import { join } from "@std/path/join";

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
      `❌ Failed to read file: ${path}. You might be missing input.txt - it's not in the Git repo per the author's wishes.`
    );
  }

  try {
    console.log(`⭐️   ${oneStarCallback(input)}`);
  } catch (e) {
    return rejectWithError(`❌ Error running the ⭐️:\n${e}`);
  }

  if (!twoStarCallback) {
    return console.log("⭐️⭐️ not done");
  }
  try {
    console.log(`⭐️⭐️ ${twoStarCallback(input)}`);
  } catch (e) {
    return rejectWithError(`❌ Error running the ⭐️⭐️:\n${e}`);
  }

  console.groupEnd();
  return Promise.resolve();
};
