# tl-radio-button

The Radio Button component allows users to select a single option from a set of mutually exclusive choices.

## Usage

```html
<div class="tl-radio-button">
  <input type="radio" id="radio-1" name="radio-group" />
  <label for="radio-1">Radio button label</label>
</div>
```

### Disabled State

```html
<div class="tl-radio-button">
  <input type="radio" id="radio-disabled" name="radio-group" disabled />
  <label for="radio-disabled">Disabled radio button</label>
</div>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-radio-button.css
```

## Elements

| Element              | HTML Element           | Description                          |
| -------------------- | ---------------------- | ------------------------------------ |
| `.tl-radio-button`   | `<div>`                | Main radio button container          |
| `input`              | `<input type="radio">` | Radio input element (no class needed)|
| `label`              | `<label>`              | Label text for the radio button (no class needed) |

## States

### Disabled State

Use the native `disabled` attribute on the `<input>` element. The container automatically detects disabled state using `:has(:disabled)` and applies appropriate styling to both the radio button and label.

## Usage Notes

- Radio buttons with the same `name` attribute are mutually exclusive
- Always provide a unique `id` for each radio button and link it with the `for` attribute on the label
- No BEM classes are required on `input` and `label` elements

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
