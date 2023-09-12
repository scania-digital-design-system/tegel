import type { Components, JSX } from "../dist/types/components";

interface TdsFolderTab extends Components.TdsFolderTab, HTMLElement {}
export const TdsFolderTab: {
  prototype: TdsFolderTab;
  new (): TdsFolderTab;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
