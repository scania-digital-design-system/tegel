import type { Components, JSX } from "../dist/types/components";

interface TdsTooltip extends Components.TdsTooltip, HTMLElement {}
export const TdsTooltip: {
  prototype: TdsTooltip;
  new (): TdsTooltip;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
