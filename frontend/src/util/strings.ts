export const sliceString = (input: string) => {
  const midpoint = Math.ceil(input.length / 2);
  const firstHalf = input.slice(0, midpoint);
  const secondHalf = input.slice(midpoint);
  return {firstHalf, secondHalf};
};