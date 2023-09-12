import type { Components, JSX } from "../dist/types/components";

interface TdsToggle extends Components.TdsToggle, HTMLElement {}
export const TdsToggle: {
  prototype: TdsToggle;
  new (): TdsToggle;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
