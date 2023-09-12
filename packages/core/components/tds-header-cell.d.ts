import type { Components, JSX } from "../dist/types/components";

interface TdsHeaderCell extends Components.TdsHeaderCell, HTMLElement {}
export const TdsHeaderCell: {
  prototype: TdsHeaderCell;
  new (): TdsHeaderCell;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
