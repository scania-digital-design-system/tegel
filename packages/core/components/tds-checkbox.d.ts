import type { Components, JSX } from "../dist/types/components";

interface TdsCheckbox extends Components.TdsCheckbox, HTMLElement {}
export const TdsCheckbox: {
  prototype: TdsCheckbox;
  new (): TdsCheckbox;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
