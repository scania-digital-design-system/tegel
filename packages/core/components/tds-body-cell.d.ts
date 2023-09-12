import type { Components, JSX } from "../dist/types/components";

interface TdsBodyCell extends Components.TdsBodyCell, HTMLElement {}
export const TdsBodyCell: {
  prototype: TdsBodyCell;
  new (): TdsBodyCell;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
