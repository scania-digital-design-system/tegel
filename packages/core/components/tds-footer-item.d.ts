import type { Components, JSX } from "../dist/types/components";

interface TdsFooterItem extends Components.TdsFooterItem, HTMLElement {}
export const TdsFooterItem: {
  prototype: TdsFooterItem;
  new (): TdsFooterItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
