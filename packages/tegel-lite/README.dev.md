# @scania/tegel-lite

![Status: Beta](https://img.shields.io/badge/status-beta-orange)

> Pure CSS implementation of Tegel Design System - no JavaScript required.

**⚠️ Beta Status:** This package is currently in beta. While functional and ready for testing, the API and structure may change before the stable 1.0.0 release.

Tegel Lite is a **styles-only** component library that provides the same design system as Tegel without relying on Web Components or Stencil.

## 📦 Installation

```bash
npm install @scania/tegel-lite
```

## 🚀 Quick Start

### Import all styles (global)

```javascript
import '@scania/tegel-lite/global.css';
```

### Import specific components (recommended)

```javascript
// Import brand variables (Scania or Traton)
import '@scania/tegel-lite/scania-variables.css';

// Import individual components
import '@scania/tegel-lite/tl-button.css';
import '@scania/tegel-lite/tl-header.css';
```

### HTML Usage

```html
<button class="tl-button tl-button--primary">
  <span class="tl-button__label">Click me</span>
</button>
```

## 📚 Documentation

For detailed documentation and examples, visit **[tegel.scania.com](https://tegel.scania.com)**

---

## What It Is

Tegel Lite is:

- A **styles-only** component system.
- Built using **SCSS**, compiled to **CSS** files.
- Aligned to the same design tokens & variables as the original Tegel.

### How It Works

Tegel Lite’s styles reside in the Tegel Core package, ensuring consistency with existing global styles and enabling Storybook documentation. 

To **generate** the `@scania/tegel-lite` library, first navigate to project root and run: 

```bash
npm i
```
then navigate to `packages/core` and run: 

```bash
npm i
```

```bash
npm run build:tegel-lite
```

This command will compile all scss files related to Tegel Lite and output the compiled css to the `packages/tegel-lite/dist` folder. It will also copy assets that are needed and add neccessary exports to the `packages/tegel-lite/package.json` .

The files used as source for `@scania/tegel-lite` library are located in `packages/core/src` and are structured as follows:

- **packages/core/src/global/tegel-lite-components.scss**: All Tegel Lite component styles are imported here. This file is imported in the `packages/core/global/global.scss` file and thus enables Storybook documentation for Tegel Lite components.

- **packages/core/src/global/tegel-lite-global.scss**: All global styles and variables are imported here. This file is compiled into a single `global.css` file in the `packages/tegel-lite/dist` folder.

- **packages/core/src/tegel-lite/components**: Each component (e.g., tl-button, tl-header) lives in its own folder with `.scss` files. Each component will be compiled into a separate CSS file in the `packages/tegel-lite/dist` folder. An export will be added to the `packages/tegel-lite/package.json` file to enable importing of the components in the consuming project.

The following scripts are used during build of `Tegel Lite`:

- **packages/core/scripts/compile-tegel-lite-components.js**: Handling compilation of scss files & output css to `packages/tegel-lite/dist`.

- **packages/core/scripts/update-tegel-lite-exports.js**: Handling update of exports in `packages/tegel-lite/package.json`

- **packages/core/scripts/copy-tegel-lite-assets.js**: Handling copy and output of assets neccessary for the `Tegel Lite` library.

- All global styles, variables etc are compiled into a single `global.css` file.
- Each component (e.g., tl-button, tl-header) lives in its own folder with `.scss` files and is compiled into a separate CSS file.
- Components classes are prefixed with `tl-` to avoid conflicts with other styles.
- Classes follow BEM convention: `tl-button`, `tl-button__label`, `tl-button--primary` etc. [Read more about Tegel Lite **Scss** conventions here](#tegel-lite-scss-conventions)


### Example usage in consumer app (Examples from Next.js application)

- For globals you import the `global.css` file:

  ```tsx
  // layout.tsx
  import "@scania/tegel-lite/global.css"
  ```

- For components you import only the styles you need:

  ```tsx
    // TegelButton.tsx
  import clsx from "clsx"
  import "@scania/tegel-lite/tl-button.css"

  const TegelButton = ({
    type = "primary",
    size = "md",
    fullBleed = false,
    disabled = false,
    label = "Label",
    className,
    onClick = () => {}
  }: {
    type: "primary" | "secondary" | "ghost" | "danger"
    size: "xs" | "sm" | "md" | "lg"
    fullBleed?: boolean
    disabled?: boolean
    label: string
    onClick?: () => void
  }) => {
    return (
      <button
        disabled={disabled}
        className={clsx(
          `tl-button tl-button--${type} tl-button--${size}`,
          `${fullBleed ? "tl-button--fullbleed" : ""}`,
          `${disabled ? "tl-button--disabled" : ""}`
        )}
        onClick={onClick}
      >
        <span className="tl-button__label">{label}</span>
      </button>
    )
  }

  export default TegelButton
  ```

Checkout the Tegel Storybook documentation for more examples and usage.

---

## Development Setup (Local Development Only)

If you're developing Tegel Lite locally and want to test changes in your app, you can symlink the package:

### Using npx link:

In the root of your app, create a `link.config.json` file with the following content:

```json
{
  "packages": ["../tegel/packages/tegel-lite"] // Make sure to add the correct path to the Tegel Lite package on your machine
}
```

Then run:

```bash
npx link
```

### OR

Using npm link:

In the `tegel/packages/tegel-lite` package:

```bash
npm link
```

In your app:

```bash
npm link @scania/tegel-lite
```

The above command will symlink the Tegel Lite package into your app. Check node_modules to see if the package is linked correctly.
You will now be able to import Tegel Lite components in your app.

---

## Tegel Lite SCSS Conventions

These conventions define a clear, maintainable, and scalable SCSS structure for the Tegel Lite design system, using BEM principles and Sass features to support consistency and readability.


## JavaScript Requirements for Styling Effects

Some Tegel Lite components require JavaScript to achieve certain styling effects that cannot be accomplished with pure CSS. These components need special handling to ensure their visual effects work correctly.

### Rules for JavaScript-Dependent Styling

1. **Documentation Requirement**: Components that need JavaScript for certain styles must clearly communicate this requirement in their documentation and stories.

2. **Graceful Degradation**: Components should never be completely broken without JavaScript. They should provide a basic, functional state even without JS.

3. **Demo Examples**: Stories must include working JavaScript examples that demonstrate the styling effects.

---

### BEM Structure & Naming

We use strict BEM naming for class structure:

* `.block`
* `.block__element`
* `.block--modifier`
* `.block__element--modifier`

No abbreviations or non-BEM patterns allowed.

---

### Selector Conventions

#### Base Selectors

```scss
.tl-button {
  ...
  }
.tl-button__icon { 
  ...
  }
```

* Always define base classes as **flat selectors**.
* Avoid using `&__element` — write elements as top-level selectors for better searchability and clarity.

```scss
// ❌ Avoid
.tl-button {
  &__icon { 
    ...
  }
}

// ✅ Instead
.tl-button__icon { 
    ...
  }

```

#### Class usage
BEM modifiers like `.tl-button--primary` are not standalone - they must always be used together with the base class (`.tl-button`)

##### ✅ Correct Usage

```html
<button class="tl-button tl-button--primary">
  <span class="tl-button__label">Label</span>
</button>

```

##### ❌ Incorrect Usage

```html
<button class="tl-button--primary">Label</button>
```

Always include the base class (.tl-button) when using a modifier like --primary, --disabled, --lg, etc. Modifiers are designed to extend or tweak the base styling, not replace it.

#### Modifiers

Use `&--modifier` **only when the modifier affects the current scope** (block or element itself):

```scss
.tl-button {
  &--primary {
    background-color: var(--primary);
  }
}

.tl-button__icon {
  &--small {
    font-size: 0.75rem;
  }
}
```

If the modifier affects **other parts** of the component (e.g., an element inside a block), write it in the **affected element's** selector:

```scss
.tl-button__icon {
  .tl-button--primary & {
    fill: currentColor;
  }
}
```

This keeps side effects localized and improves traceability.

##### ❌ Avoid nesting element selectors inside modifiers

```scss
.tl-button {
  &--primary {
    &__icon { // ❌ avoid this
      ... 
    } 
  }
}
```

##### ✅ Instead, do this -- place modifier styles in the affected element's selector

```scss
.tl-button__icon {
  .tl-button--primary & {
    ...
  }
}

```

---

##  Nesting Rules


### ✅ Allowed Uses of `&`

* `&--modifier` (when scoped to self)
* `&:hover`, `&:focus-visible`, `&:disabled`
* `&::before`, `&::after`, `&::placeholder`, etc.
* `&:has(...)` or similar pseudo-classes
* Media queries (if nested inside a rule)

### ❌ Disallowed

* `&__element` nesting
* Modifier selectors that affect other scopes



---

##  TL;DR

| Type                   | Style                         | Example                 |
| ---------------------- | ----------------------------- | ----------------------- |
| Block                  | Flat                          | `.tl-button {}`         |
| Element                | Flat                          | `.tl-button__icon {}`   |
| Modifier (self-scoped) | `&--mod` inside block/element | `&--primary {}`         |
| Modifier (cross-scope) | Contextual selector           | `.tl-button--primary &` |
| Pseudo/state           | Nested with `&`               | `&:hover {}`            |

---

This convention aims to ensure SCSS is maintainable, consistent, and intuitive across all of Tegel Lite.


Let us know if you find edge cases that challenge these conventions — this is a living document.

## Creating a New Tegel Lite Component

Follow these steps to create a new component in Tegel Lite.

### 1. Set Up SCSS
Inside `packages/core/src/tegel-lite/components/`, create a folder matching your component name (use kebab-case and prefix with `tl-`). Add the main SCSS file and any optional partials:

<pre>
packages/core/src/tegel-lite/components/ 

└── tl-alert/
    ├── tl-alert.scss # main entrypoint (includes partials) 
    ├── _variables.scss # optional: internal tokens or values 
</pre>


All **partial files** (helpers) should be prefixed with an underscore (`_`) and be **imported** into the main SCSS file (`tl-alert.scss`). These partials will **not be compiled individually**.

Example main file:

```scss
// packages/core/src/tegel-lite/components/tl-alert/tl-alert.scss

@import './variables';

.tl-alert {
  background-color: blue;

  &--success {
    background-color: green;
  }

  &--error {
    background-color: red;
  }
}
```

### 2. Register SCSS to components folder
Open `core/src/global/tegel-lite-components.scss` and import your new SCSS file there to include it in the build and Storybook.

```scss
@import '../tegel-lite/components/tl-alert/tl-alert';
```

This ensures your component is available in Storybook.

### 3. Create a Storybook Story

To document and test the component, create a `.stories.tsx` file in inside the component’s folder. Match the style of existing stories, like `tl-button` or `tl-message`.

```tsx

import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (CSS)/Alert',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      name: 'Variant',
      description: 'Visual variant of the alert',
      control: {
        type: 'radio',
      },
      options: ['info', 'success', 'error'],
      table: {
        defaultValue: { summary: 'info' },
      },
    },
    message: {
      name: 'Message',
      description: 'Text content of the alert',
      control: 'text',
      table: {
        defaultValue: { summary: 'Hello World' },
      },
    },
  },
  args: {
    variant: 'info',
    message: 'Hello World',
  },
};

const Template = ({ variant, message }) =>
  formatHtmlPreview(`
      <!-- Required stylesheet 
    "@scania/tegel-lite/tl-alert.css"
  -->

    <span class="tl-alert tl-alert--${variant}">${message}</span>
  `);

export const Default = Template.bind({});

```

### 4. Verify the build
Once your SCSS are in place, verify that the component compiles correctly.

In the `packages/core` directory, run:

```bash
npm run build:tegel-lite
```

This will:

- Compile all Tegel Lite SCSS files.

- Output the compiled .css files into the `packages/tegel-lite/dist/` directory.

- Automatically copy required assets and update the exports in `packages/tegel-lite/package.json`.

After the build, check `packages/tegel-lite/dist/`: You should see a CSS file for your new component (e.g., `tl-alert.css`).



