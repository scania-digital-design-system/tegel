import type { Components, JSX } from "../dist/types/components";

interface TdsMessage extends Components.TdsMessage, HTMLElement {}
export const TdsMessage: {
  prototype: TdsMessage;
  new (): TdsMessage;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
