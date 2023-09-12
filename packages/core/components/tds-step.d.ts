import type { Components, JSX } from "../dist/types/components";

interface TdsStep extends Components.TdsStep, HTMLElement {}
export const TdsStep: {
  prototype: TdsStep;
  new (): TdsStep;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
