import type { Components, JSX } from "../dist/types/components";

interface TdsAccordionItem extends Components.TdsAccordionItem, HTMLElement {}
export const TdsAccordionItem: {
  prototype: TdsAccordionItem;
  new (): TdsAccordionItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
