import { assert } from "@std/assert";

type Output<T extends readonly unknown[], V> = {
  readonly [P in keyof T]: V;
};

/**
 * Takes all of the items of `input` and runs them through `func`, `assert`ing that
 * they are equal to their expected outputs. Similar to `pytest.mark.parameterize`.
 *
 * @param input a tuple of inputs
 * @param output a tuple of outputs
 * @param func function mapping from the input to the output.
 */
export const parameterize = <Input extends readonly unknown[], Value>(
  input: [...Input],
  output: Output<Input, Value>,
  func: (input: Input[number]) => Value
): void => {
  input.forEach((inputValue, idx) => {
    const actual = func(inputValue);
    assert(
      actual === output[idx],
      `Parameterize failed on run ${idx} - expected ${output[idx]}, got ${actual}`
    );
  });
};
