import type { Components, JSX } from "../dist/types/components";

interface TdsSideMenuUser extends Components.TdsSideMenuUser, HTMLElement {}
export const TdsSideMenuUser: {
  prototype: TdsSideMenuUser;
  new (): TdsSideMenuUser;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
