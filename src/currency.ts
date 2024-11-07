/* eslint-disable @typescript-eslint/no-explicit-any */
export const currency = (num: any) => {
  return parseFloat(num)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
};
