import type { Components, JSX } from "../dist/types/components";

interface TdsTableBodyRow extends Components.TdsTableBodyRow, HTMLElement {}
export const TdsTableBodyRow: {
  prototype: TdsTableBodyRow;
  new (): TdsTableBodyRow;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
