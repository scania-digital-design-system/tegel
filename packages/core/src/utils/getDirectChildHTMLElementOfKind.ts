import { getPrefixedTagNames, paramCaseToCamelCase, getTagName } from './tagName';
import { TagName } from './tagNames';

export const getDirectChildHTMLElementOfKind = (
  element: HTMLElement,
  tagName: TagName,
): HTMLElement[] => {
  const children = Array.from(element.children) as HTMLElement[];
  const prefixedElementTagName = getPrefixedTagNames(element)[paramCaseToCamelCase(tagName)];
  return Array.from(children).filter((el) => getTagName(el) === prefixedElementTagName);
};
