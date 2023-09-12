import type { Components, JSX } from "../dist/types/components";

interface TdsSlider extends Components.TdsSlider, HTMLElement {}
export const TdsSlider: {
  prototype: TdsSlider;
  new (): TdsSlider;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
