import type { Components, JSX } from "../dist/types/components";

interface TdsDatetime extends Components.TdsDatetime, HTMLElement {}
export const TdsDatetime: {
  prototype: TdsDatetime;
  new (): TdsDatetime;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
