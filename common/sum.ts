export const sum = (arr: number[]): number =>
  arr.reduce((acc, curr) => {
    // console.log(acc, curr, typeof acc, typeof curr);

    return acc + curr;
  });
