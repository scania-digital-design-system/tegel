import type { Components, JSX } from "../dist/types/components";

interface TdsPopoverCanvas extends Components.TdsPopoverCanvas, HTMLElement {}
export const TdsPopoverCanvas: {
  prototype: TdsPopoverCanvas;
  new (): TdsPopoverCanvas;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
