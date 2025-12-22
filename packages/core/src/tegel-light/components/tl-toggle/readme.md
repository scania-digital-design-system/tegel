# tl-toggle

The Toggle component provides a switch input for binary on/off selections.

## Usage

```html
<div class="tl-toggle">
  <h4 class="tl-toggle__headline">Settings</h4>
  <label>
    <input type="checkbox" class="tl-toggle__input" />
    <span class="tl-toggle__label">Enable feature</span>
  </label>
</div>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-toggle.css
```

## Elements

| Element                | HTML Element | Description                  |
| ---------------------- | ------------ | ---------------------------- |
| `.tl-toggle`           | `<div>`      | Main container               |
| `.tl-toggle__headline` | `<h4>`       | Headline text (optional)     |
| `.tl-toggle__input`    | `<input>`    | Checkbox input (styled)      |
| `.tl-toggle__label`    | `<span>`     | Label text                   |

## Modifiers

### Toggle Size Modifiers

Apply these classes to the `.tl-toggle__input` element.

| Modifier               | Description                    |
| ---------------------- | ------------------------------ |
| `.tl-toggle__input--sm`| Small toggle (28px × 16px)     |

### Toggle State Modifiers

Apply these classes to `.tl-toggle__headline` or `.tl-toggle__label` elements.

| Modifier                       | Description                    |
| ------------------------------ | ------------------------------ |
| `.tl-toggle__headline--disabled` | Disabled headline text       |
| `.tl-toggle__label--disabled`  | Disabled label text            |

**Note:** Use the `disabled` attribute on the `<input>` element to disable the toggle switch itself.

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
