# tl-checkbox

The Checkbox component allows users to select one or more options from a set.

## Usage

```html
<div class="tl-checkbox">
  <input type="checkbox" id="checkbox-1" />
  <label for="checkbox-1">Checkbox label</label>
</div>
```

### Disabled State

```html
<div class="tl-checkbox">
  <input type="checkbox" id="checkbox-disabled" disabled />
  <label for="checkbox-disabled">Disabled checkbox</label>
</div>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-checkbox.css
```

## Elements

| Element         | HTML Element              | Description                    |
| --------------- | ------------------------- | ------------------------------ |
| `.tl-checkbox`  | `<div>`                   | Main checkbox container        |
| `input`         | `<input type="checkbox">` | Checkbox input element (no class needed) |
| `label`         | `<label>`                 | Label text for the checkbox (no class needed) |

## States

### Disabled State

Use the native `disabled` attribute on the `<input>` element. The container automatically detects disabled state using `:has(:disabled)` and applies appropriate styling to both the checkbox and label.

### Indeterminate State

The indeterminate state (mixed/partial) cannot be set via HTML attribute. It must be set via JavaScript:

```javascript
const checkbox = document.getElementById('checkbox-1');
checkbox.indeterminate = true;
```

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
