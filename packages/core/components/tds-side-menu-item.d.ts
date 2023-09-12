import type { Components, JSX } from "../dist/types/components";

interface TdsSideMenuItem extends Components.TdsSideMenuItem, HTMLElement {}
export const TdsSideMenuItem: {
  prototype: TdsSideMenuItem;
  new (): TdsSideMenuItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
