import type { Components, JSX } from "../dist/types/components";

interface TdsCard extends Components.TdsCard, HTMLElement {}
export const TdsCard: {
  prototype: TdsCard;
  new (): TdsCard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
