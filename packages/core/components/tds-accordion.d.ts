import type { Components, JSX } from "../dist/types/components";

interface TdsAccordion extends Components.TdsAccordion, HTMLElement {}
export const TdsAccordion: {
  prototype: TdsAccordion;
  new (): TdsAccordion;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
