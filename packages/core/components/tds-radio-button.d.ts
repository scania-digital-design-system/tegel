import type { Components, JSX } from "../dist/types/components";

interface TdsRadioButton extends Components.TdsRadioButton, HTMLElement {}
export const TdsRadioButton: {
  prototype: TdsRadioButton;
  new (): TdsRadioButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
