import type { Components, JSX } from "../dist/types/components";

interface TdsDropdown extends Components.TdsDropdown, HTMLElement {}
export const TdsDropdown: {
  prototype: TdsDropdown;
  new (): TdsDropdown;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
