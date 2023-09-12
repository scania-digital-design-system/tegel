import type { Components, JSX } from "../dist/types/components";

interface TdsLink extends Components.TdsLink, HTMLElement {}
export const TdsLink: {
  prototype: TdsLink;
  new (): TdsLink;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
