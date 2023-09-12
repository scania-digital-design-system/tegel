import type { Components, JSX } from "../dist/types/components";

interface TdsButton extends Components.TdsButton, HTMLElement {}
export const TdsButton: {
  prototype: TdsButton;
  new (): TdsButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
