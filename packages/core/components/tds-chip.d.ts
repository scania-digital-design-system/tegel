import type { Components, JSX } from "../dist/types/components";

interface TdsChip extends Components.TdsChip, HTMLElement {}
export const TdsChip: {
  prototype: TdsChip;
  new (): TdsChip;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
