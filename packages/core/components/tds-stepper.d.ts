import type { Components, JSX } from "../dist/types/components";

interface TdsStepper extends Components.TdsStepper, HTMLElement {}
export const TdsStepper: {
  prototype: TdsStepper;
  new (): TdsStepper;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
