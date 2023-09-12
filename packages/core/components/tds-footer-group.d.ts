import type { Components, JSX } from "../dist/types/components";

interface TdsFooterGroup extends Components.TdsFooterGroup, HTMLElement {}
export const TdsFooterGroup: {
  prototype: TdsFooterGroup;
  new (): TdsFooterGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
