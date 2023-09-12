import type { Components, JSX } from "../dist/types/components";

interface TdsPopoverMenuItem extends Components.TdsPopoverMenuItem, HTMLElement {}
export const TdsPopoverMenuItem: {
  prototype: TdsPopoverMenuItem;
  new (): TdsPopoverMenuItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
