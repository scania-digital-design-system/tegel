import type { Components, JSX } from "../dist/types/components";

interface TdsSpinner extends Components.TdsSpinner, HTMLElement {}
export const TdsSpinner: {
  prototype: TdsSpinner;
  new (): TdsSpinner;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
