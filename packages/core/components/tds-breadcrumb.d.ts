import type { Components, JSX } from "../dist/types/components";

interface TdsBreadcrumb extends Components.TdsBreadcrumb, HTMLElement {}
export const TdsBreadcrumb: {
  prototype: TdsBreadcrumb;
  new (): TdsBreadcrumb;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
