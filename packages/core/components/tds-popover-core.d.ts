import type { Components, JSX } from "../dist/types/components";

interface TdsPopoverCore extends Components.TdsPopoverCore, HTMLElement {}
export const TdsPopoverCore: {
  prototype: TdsPopoverCore;
  new (): TdsPopoverCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
