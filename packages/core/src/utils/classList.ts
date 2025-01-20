/**
 * Generates a string of class names by filtering out keys from the `classes` object
 * whose values evaluate to `false`. The keys that remain will be joined with a space.
 *
 * @param classes - An object where keys represent class names and values are boolean
 *                  flags indicating whether to include the class name.
 * @returns A string of class names separated by spaces.
 *
 * @example
 * const classes = {
 *   'active': true,
 *   'disabled': false,
 *   'highlighted': true,
 * };
 * const classList = generateClassList(classes);
 * console.log(classList); // Output: "active highlighted"
 */
export const generateClassList = (classes: Record<string, boolean>): string => {
  return Object.keys(classes)
    .filter((key) => classes[key])
    .join(' ');
};
