# @scania/tegel-lite

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> Pure CSS implementation of Tegel Design System - no JavaScript required.

## Installation

```bash
npm install @scania/tegel-lite
```

## Quick Start

**You must import brand variables separately** - component files only contain component styles.

### Option 1: All Components (Recommended for most apps)

```javascript
import '@scania/tegel-lite/scania-variables.css'; // or traton-variables.css
import '@scania/tegel-lite/global.css'; // Component tokens (required)
import '@scania/tegel-lite/components.css'; // All components
```

### Option 2: Tree-shaking (Import Specific Components)

```javascript
import '@scania/tegel-lite/scania-variables.css'; // or traton-variables.css
import '@scania/tegel-lite/global.css'; // Component tokens (required)
import '@scania/tegel-lite/tl-button.css';
import '@scania/tegel-lite/tl-card.css';
import '@scania/tegel-lite/tl-message.css';
```

> **Important:** You must import three files in order:
> 1. Brand variables (`scania-variables.css` or `traton-variables.css`)
> 2. Component tokens (`global.css`)
> 3. Component styles (`components.css` or individual `tl-*.css` files)

**HTML Usage:**

```html
<button class="tl-button tl-button--primary">
  <span class="tl-button__label">Click me</span>
</button>
```

## Components

This beta ships only the components migrated to the new design-token
variable structure. Additional components will be added as their migration
lands on `develop`.

**Layout:** footer, breadcrumbs
**Forms:** text-field, textarea
**Buttons:** button, link
**Display:** card, divider, icon
**Overlays:** modal, toast, banner, message, tooltip

## Package Contents

```
dist/
├── global.css               # Component tokens
├── components.css           # All components 
├── scania-variables.css     # Scania brand (colors, fonts, tokens)
├── traton-variables.css     # TRATON brand (colors, fonts, tokens)
├── tl-*.css                 # Individual components for tree-shaking
└── assets/
    ├── fonts/               # Latin & Cyrillic fonts
    ├── icons/               # SVG icons
    └── logos/               # Brand logos
```

**Import Order:**
1. Brand variables (`scania-variables.css` or `traton-variables.css`)
2. Component tokens (`global.css`)
3. Component styles (`components.css` or individual `tl-*.css` files)

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
