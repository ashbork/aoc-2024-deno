export const pairwise = <T>(iterable: T[]): [T, T][] => {
  return iterable.flatMap((value, idx) =>
    idx + 1 !== iterable.length ? [[value, iterable[idx + 1]]] : []
  );
};
