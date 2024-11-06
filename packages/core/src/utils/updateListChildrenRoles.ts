/**
 * Loop through the children and add the 'listitem' role if needed.
 * @param {Node} targetNode The node being updated.
 * */
const updateListChildrenRoles = (targetNode: Node): void => {
  targetNode.childNodes.forEach((node: Node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      if (element.tagName.toLowerCase() !== 'li' && element.getAttribute('role') !== 'listitem') {
        element.setAttribute('role', 'listitem');
      }
    }
  });
};

export default updateListChildrenRoles;
