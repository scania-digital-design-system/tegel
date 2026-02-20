# tl-chip

The Chip component represents small blocks of information or actions, often used for tags or filters.

## Usage

```html
<button class="tl-chip tl-chip--lg">
  Chip label
</button>
```

### With Icon

```html
<button class="tl-chip tl-chip--lg tl-chip--prefix">
  <span class="tl-icon tl-icon--placeholder tl-icon--16"></span>
  Chip label
</button>
```

## Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-chip.css
```

## Optional Stylesheets

```
@scania/tegel-lite/tl-icon.css (if using icons)
```

## Elements

| Element           | HTML Element     | Description                      |
| ----------------- | ---------------- | -------------------------------- |
| `.tl-chip`        | `<button>`/`<a>` | Main chip element                |
| `.tl-icon`        | `<span>`         | Icon element (optional)          |

## Modifiers

### Chip Size Modifiers

Apply these classes to the `.tl-chip` element. A size modifier is required.

| Modifier        | Description              |
| --------------- | ------------------------ |
| `.tl-chip--sm`  | Small chip               |
| `.tl-chip--lg`  | Large chip               |

### Chip State Modifiers

Apply these classes to the `.tl-chip` element.

| Modifier              | Description                    |
| --------------------- | ------------------------------ |
| `.tl-chip--selected`  | Selected/active state          |

**Note:** Use the native `disabled` attribute on the `<button>` element for disabled state.

### Chip Icon Modifiers

Apply these classes to the `.tl-chip` element when using icons.

| Modifier           | Description                        |
| ------------------ | ---------------------------------- |
| `.tl-chip--prefix` | Chip has a prefix icon (adjusts padding) |
| `.tl-chip--suffix` | Chip has a suffix icon (adjusts padding) |

**Note:** Both `--prefix` and `--suffix` can be used together for chips with icons on both sides.

## JavaScript Required

The Chip component requires JavaScript to handle:
- Toggle `.tl-chip--selected` class when clicked
- Optional: Implement single-selection behavior (deselect other chips in group when one is selected)
