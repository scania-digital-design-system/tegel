import type { Components, JSX } from "../dist/types/components";

interface TdsFolderTabs extends Components.TdsFolderTabs, HTMLElement {}
export const TdsFolderTabs: {
  prototype: TdsFolderTabs;
  new (): TdsFolderTabs;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
