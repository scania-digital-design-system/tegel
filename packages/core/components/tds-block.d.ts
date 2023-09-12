import type { Components, JSX } from "../dist/types/components";

interface TdsBlock extends Components.TdsBlock, HTMLElement {}
export const TdsBlock: {
  prototype: TdsBlock;
  new (): TdsBlock;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
