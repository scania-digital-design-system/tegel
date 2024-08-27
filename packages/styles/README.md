# tegel-styles

@tegel-styles is a package that provides the foundational styles for the Tegel Design System. 
User can choose to import all foundational styles or only the ones they need.
Beside the styles, it also includes a `ag-grid-styles.css` file that serves as Tegel theme for the AG-Grid table library.

## Contents


```
@tegel-styles/
    ├── dist/
        ├── ag-grid/
        │   └── ag-grid-styles.css
        └── foundations/
            ├── colors.css
            ├── foundation.css
            ├── grid.css
            ├── logotype.css
            ├── spacing.css
            └── typography.css
```

<code>foundation.css</code> imports all other files found under the <code>foundations</code> folder. 
Using it eliminates the need to import all other files.     

## Installation

You can install the package via npm:

```sh
npm install @tegel-styles
```

## Usage

To use the styles in your project, simply import the CSS file in your main stylesheet.
Here is an exmaple of importing the foundation styles file:

```css
import '@tegel-styles/dist/foundations/foundation.css';
```

## Contributing

We welcome contributions to improve the package. Please follow the guidelines in the [CONTRIBUTING.md](../../CONTRIBUTING.md) file.

## License

This project is licensed under the MIT License. See the [LICENSE](../../LICENSE) file for details.