/**
 * Checks if the provided element has a slotted element
 * in the slot with the corresponding slotName
 * @param slotName the name of the slot.
 * @param element the element to look for the slot within.
 */
const hasSlot = (slotName: string, element: HTMLElement) =>
  !!element.querySelector(`[slot="${slotName}"]`);

export default hasSlot;
