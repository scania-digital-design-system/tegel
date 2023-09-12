import type { Components, JSX } from "../dist/types/components";

interface TdsPopoverMenu extends Components.TdsPopoverMenu, HTMLElement {}
export const TdsPopoverMenu: {
  prototype: TdsPopoverMenu;
  new (): TdsPopoverMenu;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
