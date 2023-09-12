import type { Components, JSX } from "../dist/types/components";

interface TdsIcon extends Components.TdsIcon, HTMLElement {}
export const TdsIcon: {
  prototype: TdsIcon;
  new (): TdsIcon;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
