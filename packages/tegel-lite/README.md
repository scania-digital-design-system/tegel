# @scania/tegel-lite

![Status: Beta](https://img.shields.io/badge/status-beta-orange)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> Pure CSS implementation of Tegel Design System - no JavaScript required.

**⚠️ Beta Status:** This package is currently in beta. The API may change before stable 1.0.0. Report issues at [GitHub](https://github.com/scania-digital-design-system/tegel/issues).

## Installation

```bash
npm install @scania/tegel-lite
```

## Quick Start

### Option 1: Import Everything (Easiest)

```javascript
// All components + Scania variables
import '@scania/tegel-lite';
```

This imports `global.css` which includes all 35 components and Scania brand variables (fonts, colors, tokens).

### Option 2: Import Specific Components (Tree-shaking)

```javascript
// Scania brand
import '@scania/tegel-lite/scania-variables.css';
import '@scania/tegel-lite/tl-button.css';
import '@scania/tegel-lite/tl-card.css';

// TRATON brand
import '@scania/tegel-lite/traton-variables.css';
import '@scania/tegel-lite/tl-button.css';
```

> **Important:** Always import a brand variables file (`scania-variables.css` or `traton-variables.css`) first for design tokens and fonts.

**HTML Usage:**

```html
<button class="tl-button tl-button--primary">
  <span class="tl-button__label">Click me</span>
</button>
```

## Components (35 total)

**Layout:** header, footer, side-menu, breadcrumbs  
**Forms:** text-field, textarea, checkbox, radio-button, toggle, dropdown, datetime, slider  
**Buttons:** button, link, chip  
**Display:** card, table, accordion, stepper, step, badge, divider, block, icon  
**Overlays:** modal, toast, banner, message, tooltip, popover-menu, popover-canvas, spinner

## Framework Examples

### React/Next.js

**Option A: Import everything**
```jsx
import '@scania/tegel-lite';

export default function App() {
  return (
    <button className="tl-button tl-button--primary">
      <span className="tl-button__label">Click me</span>
    </button>
  );
}
```

**Option B: Import specific components**
```jsx
import '@scania/tegel-lite/scania-variables.css';
import '@scania/tegel-lite/tl-button.css';

export default function Button() {
  return (
    <button className="tl-button tl-button--primary">
      <span className="tl-button__label">Click me</span>
    </button>
  );
}
```

### Vue

**Option A: Import everything**
```vue
<template>
  <button class="tl-button tl-button--primary">
    <span class="tl-button__label">Click me</span>
  </button>
</template>

<style>
@import '@scania/tegel-lite';
</style>
```

**Option B: Import specific components**
```vue
<template>
  <button class="tl-button tl-button--primary">
    <span class="tl-button__label">Click me</span>
  </button>
</template>

<style>
@import '@scania/tegel-lite/scania-variables.css';
@import '@scania/tegel-lite/tl-button.css';
</style>
```

### Angular

**Option A: Import everything in styles.css**
```css
@import '@scania/tegel-lite';
```

**Option B: Import specific components in styles.css**
```css
@import '@scania/tegel-lite/scania-variables.css';
@import '@scania/tegel-lite/tl-button.css';
```

## Package Contents

```
dist/
├── global.css               # All components + variables
├── scania-variables.css     # Scania tokens + fonts
├── traton-variables.css     # TRATON tokens + fonts
├── tl-*.css                 # 35 individual components
└── assets/
    ├── fonts/               # Latin & Cyrillic fonts
    ├── icons/               # SVG icons
    └── logos/               # Brand logos
```

## BEM Naming Convention

```css
.tl-button              /* Block */
.tl-button__label       /* Element */
.tl-button--primary     /* Modifier */
```

All components use the `tl-` prefix.

## Documentation

Full documentation: **[tegel.scania.com](https://tegel.scania.com)**

## Related Packages

- [@scania/tegel](https://www.npmjs.com/package/@scania/tegel) - Web Components version
- [@scania/tegel-react](https://www.npmjs.com/package/@scania/tegel-react) - React wrappers
- [@scania/tegel-angular](https://www.npmjs.com/package/@scania/tegel-angular) - Angular wrappers

## Support

- **Issues:** [GitHub Issues](https://github.com/scania-digital-design-system/tegel/issues)
- **Discussions:** [GitHub Discussions](https://github.com/scania-digital-design-system/tegel/discussions)

## License

MIT © Scania Digital Design System

---

**Development:** See [README.dev.md](./README.dev.md) for build instructions.
