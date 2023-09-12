import type { Components, JSX } from "../dist/types/components";

interface TdsSideMenu extends Components.TdsSideMenu, HTMLElement {}
export const TdsSideMenu: {
  prototype: TdsSideMenu;
  new (): TdsSideMenu;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
