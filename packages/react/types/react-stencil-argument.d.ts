// Local compile-time augmentation to avoid tight coupling between
// generated React proxies' HTMLStencilElement constraint and the
// component element interfaces coming from @scania/tegel.
//
// By declaring `componentOnReady` on HTMLElement, any HTMLElement-like
// component element structurally satisfies the local `HTMLStencilElement`
// constraint used in the generated proxy without editing generated files.

declare global {
  interface HTMLElement {
    // Use a wide return type so it remains assignable to Promise<this>
    // in the local constraint used by the generated proxy.
    componentOnReady?: () => Promise<any>;

    autocorrect?: string | boolean;
  }
}

export {};