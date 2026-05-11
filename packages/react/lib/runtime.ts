/**
 * Custom runtime wrapper for @stencil/react-output-target.
 *
 * In JSDOM/HappyDOM (vitest / jest), Stencil's lazy-loaded property-to-attribute
 * reflection never fires, so props set as JS properties via @lit/react's
 * createComponent are invisible to getAttribute(). This wrapper detects
 * JSDOM/HappyDOM and adds a useLayoutEffect that explicitly syncs primitive props
 * to DOM attributes. In real browsers, the original component is returned
 * unchanged — zero runtime cost.
 */

import type { Options, EventName } from '@lit/react';
import { createComponent as litCreateComponent } from '@lit/react';
import React from 'react';

export type { EventName } from '@lit/react';
export type { StencilReactComponent } from '@stencil/react-output-target/runtime';

// ---------- Test DOM detection ----------

const isTestDom = typeof navigator !== 'undefined' && /(jsdom|happydom)/i.test(navigator.userAgent);

// ---------- Attribute helpers ----------

const reservedProps = new Set(['children', 'localName', 'ref', 'style', 'className']);

function camelToDash(str: string): string {
  return str.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}

function syncAttribute(node: Element, name: string, value: unknown): void {
  const attrName = camelToDash(name);
  if (typeof value === 'string') {
    node.setAttribute(attrName, value);
  } else if (typeof value === 'number') {
    node.setAttribute(attrName, String(value));
  } else if (typeof value === 'boolean') {
    if (value) {
      node.setAttribute(attrName, '');
    } else {
      node.removeAttribute(attrName);
    }
  } else if (value === undefined || value === null) {
    node.removeAttribute(attrName);
  }
  // Objects, arrays, functions — not serializable, skip.
}

// ---------- createComponent ----------

type EventNames = Record<string, EventName | string>;

export const createComponent = <I extends HTMLElement, E extends EventNames = {}>({
  defineCustomElement,
  tagName,
  transformTag,
  ...rest
}: Options<I, E> & {
  defineCustomElement?: () => void;
  transformTag?: (tag: string) => string;
}): any => {
  if (defineCustomElement !== undefined) {
    defineCustomElement();
  }

  const resolvedTagName = transformTag ? transformTag(tagName) : tagName;

  const OriginalComponent = litCreateComponent({
    ...rest,
    tagName: resolvedTagName,
  });

  // In real browsers Stencil's proxy handles reflection — return as-is.
  if (!isTestDom) {
    return OriginalComponent;
  }

  // --- Test DOM wrapper ---
  const { elementClass, events } = rest;
  const eventKeys = new Set(Object.keys(events ?? {}));

  const WrappedComponent = React.forwardRef<HTMLElement, Record<string, any>>((props, ref) => {
    const innerRef = React.useRef<HTMLElement | null>(null);

    // Sync primitive props as DOM attributes after every render.
    React.useLayoutEffect(() => {
      const el = innerRef.current;
      if (!el) return;

      for (const [key, value] of Object.entries(props)) {
        if (reservedProps.has(key)) continue;
        if (eventKeys.has(key)) continue;
        if (typeof value === 'function') continue;

        // Only sync props that belong to the custom element, not generic
        // HTML attributes (which React already handles).
        if (key in elementClass.prototype && !(key in HTMLElement.prototype)) {
          syncAttribute(el, key, value);
        }
      }
    });

    const mergedRef = React.useCallback(
      (node: HTMLElement | null) => {
        innerRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        }
      },
      [ref],
    );

    return React.createElement(OriginalComponent as any, {
      ...props,
      ref: mergedRef,
    });
  });

  WrappedComponent.displayName = (OriginalComponent as any).displayName ?? elementClass.name;

  return WrappedComponent;
};
