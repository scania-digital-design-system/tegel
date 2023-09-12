import type { Components, JSX } from "../dist/types/components";

interface TdsBadge extends Components.TdsBadge, HTMLElement {}
export const TdsBadge: {
  prototype: TdsBadge;
  new (): TdsBadge;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
