export const identityWithLog = <T>(val: T): T => {
  console.log(val);
  return val;
};
