# tl-checkbox

The Checkbox component allows users to select one or more options from a set.

## Usage

```html
<div class="tl-checkbox">
  <input type="checkbox" class="tl-checkbox__input" id="checkbox-1" />
  <label class="tl-checkbox__label" for="checkbox-1">Checkbox label</label>
</div>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-checkbox.css
```

## Elements

| Element                | HTML Element      | Description                    |
| ---------------------- | ----------------- | ------------------------------ |
| `.tl-checkbox`         | `<div>`           | Main checkbox container        |
| `.tl-checkbox__input`  | `<input type="checkbox">` | Checkbox input element  |
| `.tl-checkbox__label`  | `<label>`         | Label text for the checkbox    |

## Modifiers

### Checkbox Container Modifiers

Apply these classes to the `.tl-checkbox` element.

| Modifier                  | Description                        |
| ------------------------- | ---------------------------------- |
| `.tl-checkbox--disabled`  | Disabled state styling             |

### Checkbox Input Modifiers

Apply these classes to the `.tl-checkbox__input` element.

| Modifier                            | Description                                |
| ----------------------------------- | ------------------------------------------ |
| `.tl-checkbox__input--indeterminate`| Indeterminate state (mixed/partial state)  |

### Checkbox Label Modifiers

Apply these classes to the `.tl-checkbox__label` element.

| Modifier                         | Description                     |
| -------------------------------- | ------------------------------- |
| `.tl-checkbox__label--disabled`  | Disabled label styling. Use together with `disabled` attribute on input |

## JavaScript Required

The Checkbox component requires JavaScript to handle:
- Set indeterminate state (cannot be set via HTML attribute alone)
- Toggle `.tl-checkbox__input--indeterminate` class for indeterminate state

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
