import type { Components, JSX } from "../dist/types/components";

interface TdsTableFooter extends Components.TdsTableFooter, HTMLElement {}
export const TdsTableFooter: {
  prototype: TdsTableFooter;
  new (): TdsTableFooter;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
