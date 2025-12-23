# tl-spinner

The Spinner component displays a loading indicator for ongoing processes.

## Usage

```html
<div class="tl-spinner tl-spinner--lg tl-spinner--standard">
  <svg class="tl-spinner__svg">
    <circle class="tl-spinner__circle"></circle>
  </svg>
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
| `.tl-spinner`        | `<div>`      | Main spinner container         |
| `.tl-spinner__svg`   | `<svg>`      | SVG element for the spinner    |
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
| `.tl-spinner--standard` | Standard variant for light backgrounds   |
| `.tl-spinner--inverted` | Inverted variant for dark backgrounds    |

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
