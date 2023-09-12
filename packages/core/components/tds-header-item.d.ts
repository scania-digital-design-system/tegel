import type { Components, JSX } from "../dist/types/components";

interface TdsHeaderItem extends Components.TdsHeaderItem, HTMLElement {}
export const TdsHeaderItem: {
  prototype: TdsHeaderItem;
  new (): TdsHeaderItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
