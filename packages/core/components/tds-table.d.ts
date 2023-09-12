import type { Components, JSX } from "../dist/types/components";

interface TdsTable extends Components.TdsTable, HTMLElement {}
export const TdsTable: {
  prototype: TdsTable;
  new (): TdsTable;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
