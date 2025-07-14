# Tegel CLI

A command-line tool for copying and transforming Tegel components with custom prefixes, enabling version isolation in microfrontend architectures.

## Overview

The Tegel CLI provides a shadcn-style approach to using Tegel components. Instead of installing components as dependencies, components are copied directly into your project with automatic transformation of all references (component tags, DOM queries, CSS classes) to use your custom prefix.

This solves the Web Components registration conflict when multiple versions of Tegel are used in the same page.

## Features

- 🎯 **Component Copying**: Copy only the components you need
- 🔄 **Automatic Transformation**: All references are updated with your prefix
- 🌳 **Dependency Resolution**: Automatically includes component dependencies
- 🎨 **Style Support**: Full SCSS/CSS transformation
- 📦 **Version Isolation**: No conflicts between different Tegel versions
- 🚀 **Tree Shaking**: Only includes what you use
- 🛡️ **Type Safety**: Full TypeScript support

## Installation

```bash
npm install -g @scania/tegel-cli
```

Or use directly with npx:

```bash
npx @scania/tegel-cli init
```

## Quick Start

1. **Initialize Tegel in your project:**
   ```bash
   tegel-cli init
   ```

2. **Add components:**
   ```bash
   tegel-cli add button dropdown
   ```

3. **Use the components with your prefix:**
   ```html
   <mf1-button text="Click me"></mf1-button>
   <mf1-dropdown placeholder="Select option">
     <mf1-dropdown-option value="1">Option 1</mf1-dropdown-option>
   </mf1-dropdown>
   ```

## Commands

### `init`

Initialize Tegel configuration in your project.

```bash
tegel-cli init [options]

Options:
  -p, --prefix <prefix>    Component prefix (default: "tds")
  -d, --dir <path>         Target directory (default: "./src/components/tegel")
  -s, --style <type>       Style format: scss|css (default: "scss")
  --no-typescript          Disable TypeScript
  -f, --force              Overwrite existing configuration
  --skip-prompts           Skip interactive prompts
```

### `add`

Add Tegel components to your project.

```bash
tegel-cli add [components...] [options]

Options:
  -p, --prefix <prefix>    Override default prefix
  -v, --version <version>  Tegel version to use
  -a, --all                Add all available components
  --no-deps                Skip dependency installation
  --dry-run                Preview changes without writing files
  -f, --force              Overwrite existing files
```

### `update` (Coming Soon)

Update components to a newer version.

```bash
tegel-cli update [components...] [options]
```

### `remove` (Coming Soon)

Remove components from your project.

```bash
tegel-cli remove [components...] [options]
```

## Configuration

The CLI uses a `tegel.config.json` file for configuration:

```json
{
  "version": "1.33.0",
  "prefix": "mf1",
  "targetDir": "./src/components/tegel",
  "style": "scss",
  "typescript": true,
  "transforms": {
    "enabled": true
  },
  "aliases": {
    "@tegel/utils": "@/lib/tegel/utils",
    "@tegel/mixins": "@/styles/tegel/mixins"
  }
}
```

## How It Works

1. **Component Analysis**: The CLI scans the Tegel source to understand component structure and dependencies
2. **Dependency Resolution**: Automatically identifies and includes required dependencies
3. **Code Transformation**: Updates all references to use your custom prefix:
   - Component tags: `tds-button` → `mf1-button`
   - DOM queries: `querySelector('tds-modal')` → `querySelector('mf1-modal')`
   - CSS classes: `.tds-button__text` → `.mf1-button__text`
   - Type definitions: `HTMLTdsButtonElement` → `HTMLMf1ButtonElement`
4. **File Generation**: Copies transformed files to your project

## Development

This package is part of the Tegel monorepo. To work on the CLI:

```bash
# Install dependencies
cd packages/tegel-cli
npm install

# Build
npm run build

# Watch mode
npm run dev

# Run tests
npm test
```

## Roadmap

- [x] Basic project structure
- [x] Component scanning and analysis
- [x] Dependency resolution
- [ ] TypeScript transformation engine
- [ ] SCSS transformation engine
- [ ] File copying with transformations
- [ ] Update command
- [ ] Remove command
- [ ] Migration tools
- [ ] Plugin system

## License

MIT