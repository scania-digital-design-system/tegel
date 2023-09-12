import type { Components, JSX } from "../dist/types/components";

interface TdsTextField extends Components.TdsTextField, HTMLElement {}
export const TdsTextField: {
  prototype: TdsTextField;
  new (): TdsTextField;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
