import type { Components, JSX } from "../dist/types/components";

interface TdsModal extends Components.TdsModal, HTMLElement {}
export const TdsModal: {
  prototype: TdsModal;
  new (): TdsModal;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
