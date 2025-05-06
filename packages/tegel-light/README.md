## **Tegel Light (POC)**

Tegel Light is a pure CSS alternative to Tegel’s component library, providing the same design system without relying on Web Components or Stencil.

### What It Is

Tegel Light is:

- A **styles-only** component system.
- Built using **SCSS**, compiled to CSS files.
- Aligned to the same design tokens & variables as the original Tegel.

### How It Works

Tegel Light’s styles reside in the Tegel Core package, ensuring consistency with existing global styles and enabling Storybook documentation. 

To **generate** the `@scania/tegel-light` library, first navigate to project root and run: 

```bash
npm i
```
then navigate to `packages/core` and run: 

```bash
npm run build:tegel-light
```

This command will compile all scss files related to Tegel Light and output the compiled css to the `packages/tegel-light/dist` folder. It will also copy assets that are needed and add neccessary exports to the `packages/tegel-light/package.json` .

The files used as source for `@scania/tegel-light` library are located in `packages/core/src` and are structured as follows:

- **packages/core/src/global/tegel-light-components.scss**: All Tegel Light component styles are imported here. This file is imported in the `packages/core/global/global.scss` file and thus enables Storybook documentation for tegel light components.

- **packages/core/src/global/tegel-light-global.scss**: All global styles and variables are imported here. This file is compiled into a single `global.css` file in the `packages/tegel-light/dist` folder.

- **packages/core/src/tegel-light/components**: Each component (e.g., tl-button, tl-header) lives in its own folder with `.scss` files. Each component will be compiled into a separate CSS file in the `packages/tegel-light/dist` folder. An export will be added to the `packages/tegel-light/package.json` file to enable importing of the components in the consuming project.

The following scripts are used during build of `Tegel Light`:

- **packages/core/scripts/compile-tegel-light-components.js**: Handling compilation of scss files & output css to `packages/tegel-light/dist`.

- **packages/core/scripts/update-tegel-light-exports.js**: Handling update of exports in `packages/tegel-light/package.json`

-**packages/core/scripts/copy-tegel-light-assets.js**: Handling copy and output of assets neccessary for the `Tegel Light` library.

- All global styles, variables etc are compiled into a single `global.css` file.
- Each component (e.g., tl-button, tl-header) lives in its own folder with `.scss` files and is compiled into a separate CSS file.
- Components classes are prefixed with `tl-` to avoid conflicts with other styles.
- Classes follow BEM convention: `tl-button`, `tl-button__label`, `tl-button--primary` etc.


### Example usage in consumer app (Examples from Next.js application)

- For globals you import the `global.css` file:

  ```tsx
  // layout.tsx
  import "@scania/tegel-light/global.css"
  ```

- For components you import only the styles you need:

```tsx
  // TegelButton.tsx
import clsx from "clsx"
import "@scania/tegel-light/tl-button.css"

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

## Installation

If published to NPM:

```bash
pnpm add @scania/tegel-light
```

Otherwise, symlink the local package directly into your app:

Using npx link:

In the root of your app, create a `link.config.json` file with the following content:

```json
{
  "packages": ["@scania/tegel-light", "../tegel/packages/tegel-light"] // Make sure to add the correct path to the Tegel Light package on your machine
}
```

Then run:

```bash
npx link
```

### OR

Using npm link:

In the `tegel/packages/tegel-light` package:

```bash
npm link
```

In your app:

```bash
npm link @scania/tegel-light
```

The above command will symlink the Tegel Light package into your app. Check node_modules to see if the package is linked correctly.
You will now be able to import Tegel Light components in your app.

