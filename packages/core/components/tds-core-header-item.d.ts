import type { Components, JSX } from "../dist/types/components";

interface TdsCoreHeaderItem extends Components.TdsCoreHeaderItem, HTMLElement {}
export const TdsCoreHeaderItem: {
  prototype: TdsCoreHeaderItem;
  new (): TdsCoreHeaderItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
