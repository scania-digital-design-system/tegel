# @scania/tegel-lite

![Status: Beta](https://img.shields.io/badge/status-beta-orange)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> Pure CSS implementation of Tegel Design System - no JavaScript required.

**⚠️ Beta Status:** This package is currently in beta. The API may change before stable 1.0.0. Report issues at [GitHub](https://github.com/scania-digital-design-system/tegel/issues).

## Installation

```bash
npm install @scania/tegel-lite@0.0.1-beta.10
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
import '@scania/tegel-lite/tl-header.css';
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

**Layout:** header, footer, side-menu, breadcrumbs  
**Forms:** text-field, textarea, checkbox, radio-button, toggle, dropdown, datetime, slider  
**Navigation:** folder-tabs, inline-tabs, navigation-tabs  
**Buttons:** button, link, chip  
**Display:** card, table, accordion, stepper, step, badge, divider, block, icon  
**Overlays:** modal, toast, banner, message, tooltip, popover-menu, popover-canvas, spinner

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

## AI Coding Rules

This package ships with AI-aware coding rules that help AI assistants (Cursor, Claude Code, GitHub Copilot, OpenAI Codex) write correct tegel-lite markup.

After installing the package, run:

```bash
npx tegel-lite-setup-rules
```

An interactive CLI will let you choose which AI tools to configure:

| AI Tool | Files installed |
| --- | --- |
| **Cursor** | `.cursor/rules/tegel-lite/*.mdc` |
| **Claude Code** | `CLAUDE.md` at project root |
| **GitHub Copilot** | `.github/copilot-instructions.md` |
| **OpenAI Codex** | `AGENTS.md` at project root |

All options are selected by default. Use arrow keys to navigate, space to toggle, and enter to confirm.

To skip the interactive prompt and install all formats at once:

```bash
npx tegel-lite-setup-rules --all
```

Re-running the command will update existing rules in place (using section markers) without duplicating content.

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
