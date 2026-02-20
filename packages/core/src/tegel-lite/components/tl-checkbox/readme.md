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

Apply these classes to the `.tl-checkbox__input` element.

| Modifier                            | Description                                |
| ----------------------------------- | ------------------------------------------ |
| `.tl-checkbox__input--indeterminate`| Indeterminate state (mixed/partial state)  |

**Note:** Use the native `disabled` attributes on the `<input>` element for disabled state. The component will automatically style this state.

## JavaScript Required

The Checkbox component requires JavaScript to handle:
- Indeterminate state functionality
- Toggle `.tl-checkbox__input--indeterminate` class for indeterminate state

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
