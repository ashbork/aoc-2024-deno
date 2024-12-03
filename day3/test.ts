import { parameterize } from "../common/test.ts";
import { mullOver, mullOverWithDo } from "./solution.ts";

Deno.test({
  name: "mullOver",
  fn() {
    parameterize(
      [
        "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))",
        "",
        "mul(1,1)",
        "mul(mul(3,4))",
      ] as const,
      [161, 0, 1, 12],
      mullOver
    );
  },
});

Deno.test({
  name: "mullOverWithDo",
  fn() {
    parameterize(
      [
        "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
        "",
        "do()mul(1,1)",
        "don't()do()mul(1,1)",
        "mul(mul(3,4))",
        "don't()mul(mul(3,4))",
        "do()don't()mul(mul(3,4))",
        "do()do()do()do()do()mul(1,3)", // baby shark
      ] as const,
      [48, 0, 1, 1, 12, 0, 0, 3],
      mullOverWithDo
    );
  },
});
