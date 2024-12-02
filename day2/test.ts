import { assert, assertFalse } from "@std/assert";
import { isReportSafe, isReportSafeDampened } from "./solution.ts";
import { describe, it } from "@std/testing/bdd";

describe("isReportSafe", () => {
  it("identifies safe decreasing sequence", () => {
    const data = [7, 6, 4, 2, 1];
    assert(isReportSafe(data));
  });

  it("identifies safe increasing sequence", () => {
    const data = [1, 3, 6, 7, 9];
    assert(isReportSafe(data));
  });

  it("identifies unsafe increasing sequence with excessive increase", () => {
    const data = [1, 2, 7, 8, 9];
    assertFalse(isReportSafe(data));
  });

  it("identifies unsafe decreasing sequence with excessive decrease", () => {
    const data = [9, 7, 6, 2, 1];
    assertFalse(isReportSafe(data));
  });

  it("identifies unsafe sequence with inconsistent monotonicity", () => {
    const data = [1, 3, 2, 4, 5];
    assertFalse(isReportSafe(data));
  });

  it("identifies unsafe sequence with inconsistent strict monotonicity (no increase or decrease)", () => {
    const data = [8, 6, 4, 4, 1];
    assertFalse(isReportSafe(data));
  });
});

describe("isReportSafeDampened", () => {
  it("identifies safe decreasing sequence", () => {
    const data = [7, 6, 4, 2, 1];
    assert(isReportSafeDampened(data));
  });

  it("identifies safe increasing sequence", () => {
    const data = [1, 3, 6, 7, 9];
    assert(isReportSafeDampened(data));
  });

  it("identifies unsafe increasing sequence with excessive increase", () => {
    const data = [1, 2, 7, 8, 9];
    assertFalse(isReportSafeDampened(data));
  });

  it("identifies unsafe decreasing sequence with excessive decrease", () => {
    const data = [9, 7, 6, 2, 1];
    assertFalse(isReportSafeDampened(data));
  });

  it("identifies safe (dampened) sequence with inconsistent monotonicity", () => {
    const data = [1, 3, 2, 4, 5];
    assert(isReportSafeDampened(data));
  });

  it("identifies safe (dampened) sequence with inconsistent strict monotonicity (no increase or decrease)", () => {
    const data = [8, 6, 4, 4, 1];
    assert(isReportSafeDampened(data));
  });
});
