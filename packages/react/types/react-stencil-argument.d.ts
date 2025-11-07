// Local compile-time augmentation to avoid tight coupling between
// generated React proxies' HTMLStencilElement constraint and the
// component element interfaces coming from @scania/tegel.
//
// By declaring `componentOnReady` on HTMLElement, any HTMLElement-like
// component element structurally satisfies the local `HTMLStencilElement`
// constraint used in the generated proxy without editing generated files.
//
// Fix the autocorrect property type mismatch: generated types from @scania/tegel
// use string, but DOM types use boolean. This augmentation allows both.

declare global {
  interface HTMLElement {
    // Use a wide return type so it remains assignable to Promise<this>
    // in the local constraint used by the generated proxy.
    componentOnReady?: () => Promise<any>;
  }
}

// Separate augmentation to override autocorrect property
// This fixes the type mismatch between generated types (string) and DOM types (boolean)
declare global {
  interface HTMLElement {
    // Override autocorrect to accept both string and boolean to fix type mismatch
    // between generated types (string) and DOM types (boolean)
    // Making it required (not optional) ensures proper override of DOM type
    autocorrect: string | boolean;
  }
}

export {};