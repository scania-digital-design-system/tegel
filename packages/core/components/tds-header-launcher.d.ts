import type { Components, JSX } from "../dist/types/components";

interface TdsHeaderLauncher extends Components.TdsHeaderLauncher, HTMLElement {}
export const TdsHeaderLauncher: {
  prototype: TdsHeaderLauncher;
  new (): TdsHeaderLauncher;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
