import type { Components, JSX } from "../dist/types/components";

interface TdsHeaderLauncherListItem extends Components.TdsHeaderLauncherListItem, HTMLElement {}
export const TdsHeaderLauncherListItem: {
  prototype: TdsHeaderLauncherListItem;
  new (): TdsHeaderLauncherListItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
