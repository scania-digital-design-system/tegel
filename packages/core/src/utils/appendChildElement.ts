/**
 * Appends a child element to the supplied parentElement.
 * @param parentElement The element on which the child element with be appended.
 * @param tag Tag for the child element.
 * @param attributes List of attributes to be added on the child element.
 * @param slot Slot for the child element.
 * @param id Id for the child element.
 */
const appendChildElement = (
  parentElement: HTMLElement,
  tag: string,
  attributes: Array<{ key: string; value: string }>,
  slot: any,
  id: string,
) => {
  if (!parentElement.querySelector(`#${id}`)) {
    const childElement = parentElement.ownerDocument!.createElement(tag);
    attributes.forEach((attr) => {
      childElement.setAttribute(attr.key, attr.value);
    });
    childElement.innerHTML = slot;
    childElement.id = id;
    parentElement.appendChild(childElement);
  }
};

export default appendChildElement;
