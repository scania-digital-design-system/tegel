import type { Components, JSX } from "../dist/types/components";

interface TdsTableBody extends Components.TdsTableBody, HTMLElement {}
export const TdsTableBody: {
  prototype: TdsTableBody;
  new (): TdsTableBody;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
