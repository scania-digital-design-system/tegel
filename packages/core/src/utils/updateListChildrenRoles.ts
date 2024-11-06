/**
 * Loop through the children and add the 'listitem' role if needed,
 * skipping elements that are assigned to named slots.
 * @param {Node} targetNode The node being updated.
 * */
const updateListChildrenRoles = (targetNode: Node): void => {
  targetNode.childNodes.forEach((node: Node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      // Skip elements that are assigned to a named slot
      if (!element.slot) {
        if (element.tagName.toLowerCase() !== 'li' && element.getAttribute('role') !== 'listitem') {
          element.setAttribute('role', 'listitem');
        }
      }
    }
  });
};

export default updateListChildrenRoles;
