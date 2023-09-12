import type { Components, JSX } from "../dist/types/components";

interface TdsBanner extends Components.TdsBanner, HTMLElement {}
export const TdsBanner: {
  prototype: TdsBanner;
  new (): TdsBanner;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
