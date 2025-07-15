# Tegel CLI

⚠️ **Warning**: This tool is currently in development. Use with caution in production environments. This is only intended for use in microfrontends built with stencil.js


A command-line tool for copying and transforming Tegel design system components with custom prefixes. This tool enables microfrontend teams to use Tegel components with their own naming conventions to avoid Web Component registration conflicts.

## Overview

The Tegel CLI provides a shadcn-style approach to using Tegel components. Instead of installing components as dependencies, components are copied directly into your project with automatic transformation of all references (component tags, DOM queries, CSS classes) to use your custom prefix.

This solves the Web Components registration conflict when multiple versions of Tegel are used in the same page.

## Features

- 🎯 **Custom Prefixes**: Transform Tegel components to use your own prefix (e.g., `tds-button` → `my-button`)
- 📦 **Smart Dependencies**: Automatically includes required utilities, mixins, and assets
- 🔄 **Version Management**: Keep components up-to-date with automatic version checking
- 🎨 **Style Support**: Full SCSS support with proper import path transformations
- 🔍 **Type Safety**: Includes TypeScript definitions with proper transformations
- ⚡ **Selective Installation**: Choose only the components you need
- 🔄 **Update Support**: Update existing components to newer versions
- 📋 **Multi-select File Overrides**: Batch selection for file overrides when adding existing components

## Installation

```bash
npm install -D @scania/tegel-cli
# or
yarn add -D @scania/tegel-cli
# or
pnpm add -D @scania/tegel-cli
```

Or use directly with npx:

```bash
npx @scania/tegel-cli init
```

## Quick Start

1. **Initialize Tegel in your project:**
   ```bash
   npx @scania/tegel-cli init
   ```

2. **Add components:**
   ```bash
   # Interactive selection
   npx @scania/tegel-cli add
   
   # Add specific components
   npx @scania/tegel-cli add button dropdown modal
   ```

3. **Use the components with your prefix:**
   ```html
   <!-- Assuming prefix is 'my' -->
   <my-button variant="primary">Click me</my-button>
   <my-dropdown placeholder="Select option">
     <my-dropdown-option value="1">Option 1</my-dropdown-option>
   </my-dropdown>
   ```

## Commands

### `init`

Initialize Tegel configuration in your project.

```bash
npx @scania/tegel-cli init [options]

Options:
  -f, --force              Overwrite existing configuration
```

Creates a `.tegelrc.json` configuration file with interactive prompts for:
- Component prefix
- Target directory

### `add`

Add Tegel components to your project.

```bash
npx @scania/tegel-cli add [components...] [options]

Options:
  -p, --prefix <prefix>    Override default prefix
  -a, --all                Add all available components
  --no-deps                Skip dependency installation
  --dry-run                Preview changes without writing files
  -f, --force              Overwrite existing files without prompting
```

Examples:
```bash
# Interactive component selection
npx @scania/tegel-cli add

# Add specific components
npx @scania/tegel-cli add button card modal

# Add all components
npx @scania/tegel-cli add --all

# Preview what would be added
npx @scania/tegel-cli add button --dry-run
```

When adding components that already exist, the CLI will show a multi-select prompt allowing you to choose which files to override.

### `update`

Update existing components to the latest version.

```bash
npx @scania/tegel-cli update [components...] [options]

Options:
  -a, --all                Update all installed components
  --dry-run                Preview changes without writing files
  -f, --force              Skip confirmation prompts
```

Examples:
```bash
# Update all components
npx @scania/tegel-cli update --all

# Update specific components
npx @scania/tegel-cli update button card

# Interactive selection
npx @scania/tegel-cli update
```

## Configuration

The CLI uses a `.tegelrc.json` file for configuration:

```json
{
  "prefix": "my",
  "targetDir": "src/lib/tegel",
  "transforms": {
    "customRules": []
  },
  "aliases": {
    "@/lib/tegel": "./lib/tegel"
  },
  "includeTests": false,
  "version": "1.33.0"
}
```

### Configuration Options

- **prefix**: Your custom prefix for components (default: `"tds"`)
- **targetDir**: Where to copy components (default: `"src/lib/tegel"`)
- **transforms.customRules**: Custom transformation rules (optional)
- **aliases**: Path aliases for imports (default: standard Tegel aliases)
- **includeTests**: Include component test files (default: `false`)
- **version**: Tegel version (automatically set from bundled source)

## How It Works

1. **Component Scanning**: The CLI scans the Tegel package to find all available components
2. **Dependency Resolution**: Analyzes component dependencies (utilities, mixins, sub-components)
3. **Transformation**: Applies prefix changes and updates import paths:
   - Component tags: `<tds-button>` → `<my-button>`
   - CSS classes: `.tds-button` → `.my-button`
   - Event names: `tdsClick` → `myClick`
   - DOM queries: `querySelector('tds-modal')` → `querySelector('my-modal')`
   - Type definitions: `HTMLTdsButtonElement` → `HTMLMyButtonElement`
   - Import paths: Updated to use configured aliases
4. **File Copying**: Copies transformed files to your project directory

## Component Structure

Components are copied with the following structure:

```
src/lib/tegel/
├── components/
│   ├── button/
│   │   ├── button.tsx
│   │   ├── button.scss
│   │   └── button-vars.scss
│   └── card/
│       ├── card.tsx
│       ├── card.scss
│       └── card-vars.scss
├── utils/
│   └── (shared utilities)
├── mixins/
│   └── (SCSS mixins)
├── types/
│   └── (TypeScript definitions)
└── global/
    └── (global styles)
```

## Version Management

The CLI tracks the Tegel version used for your components:

1. When running `tegel add`, if a newer version is available, you'll be prompted to update
2. Use `tegel update` to manually update components
3. Version information is stored in `.tegelrc.json`

## File Override Handling

When adding components that already exist:

1. The CLI shows a multi-select list of all existing files
2. Select which files to override (Space to select, Enter to confirm)
3. Use `--force` to override all files without prompting

## Framework Integration

The transformed components work with any framework that supports Web Components:

### React
```jsx
import '@/lib/tegel/components/button/button';

function App() {
  return <my-button variant="primary">Click me</my-button>;
}
```

### Vue
```vue
<template>
  <my-button variant="primary">Click me</my-button>
</template>

<script>
import '@/lib/tegel/components/button/button';
</script>
```

### Angular
```typescript
import '@/lib/tegel/components/button/button';

@Component({
  template: '<my-button variant="primary">Click me</my-button>'
})
export class AppComponent {}
```

## Troubleshooting

### Components not rendering
- Ensure you've imported the component file
- Check that your bundler handles `.tsx` files (StencilJS components)
- Verify the prefix matches your configuration

### Style issues
- Global styles are only copied on first component installation
- Import global styles: `@import '@/lib/tegel/global/global';`
- Ensure SCSS is properly configured in your build tool

### TypeScript errors
- Make sure TypeScript is enabled in configuration
- Add path mapping to `tsconfig.json`:
  ```json
  {
    "compilerOptions": {
      "paths": {
        "@/lib/tegel/*": ["./src/lib/tegel/*"]
      }
    }
  }
  ```

## Development

This package is part of the Tegel monorepo. To work on the CLI:

```bash
# Install dependencies
cd packages/tegel-cli
pnpm install

# Build
pnpm build

# Development mode
pnpm dev

# Run tests
pnpm test

# Lint
pnpm lint
```

## License

This tool is part of the Tegel Design System by Scania.

MIT License