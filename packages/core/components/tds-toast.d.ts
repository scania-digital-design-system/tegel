import type { Components, JSX } from "../dist/types/components";

interface TdsToast extends Components.TdsToast, HTMLElement {}
export const TdsToast: {
  prototype: TdsToast;
  new (): TdsToast;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
