import type { Components, JSX } from "../dist/types/components";

interface TdsNavigationTab extends Components.TdsNavigationTab, HTMLElement {}
export const TdsNavigationTab: {
  prototype: TdsNavigationTab;
  new (): TdsNavigationTab;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
