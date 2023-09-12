import type { Components, JSX } from "../dist/types/components";

interface TdsTextarea extends Components.TdsTextarea, HTMLElement {}
export const TdsTextarea: {
  prototype: TdsTextarea;
  new (): TdsTextarea;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
