import type { Components, JSX } from "../dist/types/components";

interface TdsHeader extends Components.TdsHeader, HTMLElement {}
export const TdsHeader: {
  prototype: TdsHeader;
  new (): TdsHeader;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
