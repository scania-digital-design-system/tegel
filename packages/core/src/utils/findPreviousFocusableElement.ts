/**
 * Find the previous focusable element index in a list of focusable elements.
 *
 * @param items List of focusable elements, element with a attribute of disabled that is true will be skipped over.
 * @param nextItemIndex The index in the list to start the search on.
 */
const findPreviousFocusableElement = (items: any[], previousItemIndex: number) => {
  if (items[previousItemIndex] === undefined) {
    return items.length - 1;
  }
  for (let index = previousItemIndex; index >= 0; index--) {
    if (!items[index].disabled) {
      return index;
    }
  }
};

export default findPreviousFocusableElement;
