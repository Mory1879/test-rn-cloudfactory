export const getColorForValueChange = (
  value: number,
  previousValue?: number,
) => {
  if (previousValue === undefined) return 'black';
  if (value > previousValue) return 'green';
  if (value < previousValue) return 'red';
  if (value === previousValue) return 'black';
  return 'black';
};
