import type { Components, JSX } from "../dist/types/components";

interface TdsFooter extends Components.TdsFooter, HTMLElement {}
export const TdsFooter: {
  prototype: TdsFooter;
  new (): TdsFooter;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
