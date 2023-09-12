import type { Components, JSX } from "../dist/types/components";

interface TdsInlineTab extends Components.TdsInlineTab, HTMLElement {}
export const TdsInlineTab: {
  prototype: TdsInlineTab;
  new (): TdsInlineTab;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
