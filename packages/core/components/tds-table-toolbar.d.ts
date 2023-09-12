import type { Components, JSX } from "../dist/types/components";

interface TdsTableToolbar extends Components.TdsTableToolbar, HTMLElement {}
export const TdsTableToolbar: {
  prototype: TdsTableToolbar;
  new (): TdsTableToolbar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
