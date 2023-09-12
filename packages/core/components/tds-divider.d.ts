import type { Components, JSX } from "../dist/types/components";

interface TdsDivider extends Components.TdsDivider, HTMLElement {}
export const TdsDivider: {
  prototype: TdsDivider;
  new (): TdsDivider;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
