import type { Components, JSX } from "../dist/types/components";

interface TdsTableHeader extends Components.TdsTableHeader, HTMLElement {}
export const TdsTableHeader: {
  prototype: TdsTableHeader;
  new (): TdsTableHeader;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
