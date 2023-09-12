import type { Components, JSX } from "../dist/types/components";

interface TdsBreadcrumbs extends Components.TdsBreadcrumbs, HTMLElement {}
export const TdsBreadcrumbs: {
  prototype: TdsBreadcrumbs;
  new (): TdsBreadcrumbs;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
