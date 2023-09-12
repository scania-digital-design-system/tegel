import type { Components, JSX } from "../dist/types/components";

interface TdsDropdownOption extends Components.TdsDropdownOption, HTMLElement {}
export const TdsDropdownOption: {
  prototype: TdsDropdownOption;
  new (): TdsDropdownOption;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
