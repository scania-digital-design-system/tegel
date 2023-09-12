import type { Components, JSX } from "../dist/types/components";

interface TdsNavigationTabs extends Components.TdsNavigationTabs, HTMLElement {}
export const TdsNavigationTabs: {
  prototype: TdsNavigationTabs;
  new (): TdsNavigationTabs;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
