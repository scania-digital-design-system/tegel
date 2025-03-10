/**
 * Converts a value (string or number) to string
 * @param value - The value to convert
 * @returns The string representation of the value, or empty string if null/undefined
 */
export const convertToString = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined) return '';
  return value.toString();
};

// Optional: If we need array conversion often
export const convertArrayToStrings = (values: (string | number)[]): string[] => {
  return values.map((value) => convertToString(value));
};
