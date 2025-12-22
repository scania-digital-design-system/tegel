# tl-chip

The Chip component represents small blocks of information or actions, often used for tags or filters.

## Usage

```html
<button class="tl-chip tl-chip--lg">
  Chip label
</button>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-chip.css
```

## Elements

| Element    | HTML Element | Description          |
| ---------- | ------------ | -------------------- |
| `.tl-chip` | `<button>`/`<a>` | Main chip element |

## Modifiers

### Chip Size Modifiers

Apply these classes to the `.tl-chip` element.

| Modifier        | Description              |
| --------------- | ------------------------ |
| `.tl-chip--sm`  | Small chip (24px)        |
| `.tl-chip--lg`  | Large chip (32px)        |

### Chip State Modifiers

Apply these classes to the `.tl-chip` element.

| Modifier              | Description                    |
| --------------------- | ------------------------------ |
| `.tl-chip--selected`  | Selected/active state          |
| `.tl-chip--disabled`  | Disabled state                 |

### Chip Icon Modifiers

Apply these classes to the `.tl-chip` element when using icons.

| Modifier           | Description                        |
| ------------------ | ---------------------------------- |
| `.tl-chip--prefix` | Chip has a prefix icon             |
| `.tl-chip--suffix` | Chip has a suffix icon             |

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
