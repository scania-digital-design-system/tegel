import type { Components, JSX } from "../dist/types/components";

interface TdsSideMenuDropdownListItem extends Components.TdsSideMenuDropdownListItem, HTMLElement {}
export const TdsSideMenuDropdownListItem: {
  prototype: TdsSideMenuDropdownListItem;
  new (): TdsSideMenuDropdownListItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
