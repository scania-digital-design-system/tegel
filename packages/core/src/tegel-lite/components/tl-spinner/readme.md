# tl-spinner

The Spinner component displays a loading indicator for ongoing processes.

## Usage

### Basic Usage

```html
<svg class="tl-spinner tl-spinner--lg tl-spinner--default" aria-hidden="true">
  <circle class="tl-spinner__circle"></circle>
</svg>
```

### Accessible Usage (Recommended)

For better accessibility, wrap the spinner with a visually hidden label:

```html
<div>
  <svg class="tl-spinner tl-spinner--lg tl-spinner--default" aria-hidden="true">
    <circle class="tl-spinner__circle"></circle>
  </svg>
  <span class="tds-u-visually-hidden">Loading...</span>
</div>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-spinner.css
```

## Elements

| Element              | HTML Element | Description                    |
| -------------------- | ------------ | ------------------------------ |
| `.tl-spinner`        | `<svg>`      | Main spinner SVG element       |
| `.tl-spinner__circle`| `<circle>`   | Circle element inside the SVG  |

## Modifiers

### Spinner Size Modifiers

A size modifier is required. Apply these classes to the `.tl-spinner` element.

| Modifier            | Description                |
| ------------------- | -------------------------- |
| `.tl-spinner--xs`   | Extra small spinner        |
| `.tl-spinner--sm`   | Small spinner              |
| `.tl-spinner--md`   | Medium spinner             |
| `.tl-spinner--lg`   | Large spinner              |

### Spinner Variant Modifiers

A variant modifier is required. Apply these classes to the `.tl-spinner` element.

| Modifier                | Description                              |
| ----------------------- | ---------------------------------------- |
| `.tl-spinner--default`  | Default variant for light backgrounds    |
| `.tl-spinner--inverted` | Inverted variant for dark backgrounds    |

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
