import type { Components, JSX } from "../dist/types/components";

interface TdsInlineTabs extends Components.TdsInlineTabs, HTMLElement {}
export const TdsInlineTabs: {
  prototype: TdsInlineTabs;
  new (): TdsInlineTabs;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
