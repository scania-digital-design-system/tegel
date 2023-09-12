import type { Components, JSX } from "../dist/types/components";

interface TdsHeaderTitle extends Components.TdsHeaderTitle, HTMLElement {}
export const TdsHeaderTitle: {
  prototype: TdsHeaderTitle;
  new (): TdsHeaderTitle;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
