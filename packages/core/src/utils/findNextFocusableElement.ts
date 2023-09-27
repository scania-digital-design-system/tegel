/**
 * Find the next focusable element index in a list of focusable elements.
 * @param items List of focusable elements, element with a attribute of disabled that is true will be skipped over.
 * @param nextItemIndex The index in the list to start the search on.
 */

const findNextFocusableElement = (items: any[], nextItemIndex: number) => {
  if (items[nextItemIndex] === undefined) {
    return 0;
  }
  for (let index = nextItemIndex; index < items.length; index++) {
    if (!items[index].disabled) {
      return index;
    }
  }
};

export default findNextFocusableElement;
