import type { Components, JSX } from "../dist/types/components";

interface TdsSideMenuOverlay extends Components.TdsSideMenuOverlay, HTMLElement {}
export const TdsSideMenuOverlay: {
  prototype: TdsSideMenuOverlay;
  new (): TdsSideMenuOverlay;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
