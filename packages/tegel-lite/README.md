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

**You must import brand variables separately** - `global.css` only contains component styles.

### Scania Brand

```javascript
import '@scania/tegel-lite/scania-variables.css';
import '@scania/tegel-lite'; // All components
```

### TRATON Brand

```javascript
import '@scania/tegel-lite/traton-variables.css';
import '@scania/tegel-lite'; // All components
```

### Tree-shaking (Import Specific Components)

```javascript
import '@scania/tegel-lite/scania-variables.css'; // or traton-variables.css
import '@scania/tegel-lite/tl-button.css';
import '@scania/tegel-lite/tl-card.css';
```

> **Important:** Always import a brand variables file first (`scania-variables.css` or `traton-variables.css`) before any components.

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

## Package Contents

```
dist/
├── global.css               # All 35 components (no variables)
├── scania-variables.css     # Scania brand (colors, fonts, tokens)
├── traton-variables.css     # TRATON brand (colors, fonts, tokens)
├── tl-*.css                 # Individual components
└── assets/
    ├── fonts/               # Latin & Cyrillic fonts
    ├── icons/               # SVG icons
    └── logos/               # Brand logos
```

**Important:** `global.css` does NOT include brand variables. You must import `scania-variables.css` or `traton-variables.css` separately.

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
