# tl-toggle

The Toggle component provides a switch input for binary on/off selections.

## Usage

```html
<div class="tl-toggle">
  <div class="tl-toggle__headline">Settings</div>
  <input type="checkbox" class="tl-toggle__input tl-toggle__input--lg" />
  <label class="tl-toggle__label">Enable feature</label>
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
| `.tl-toggle__headline` | `<div>`      | Headline text (optional)     |
| `.tl-toggle__input`    | `<input>`    | Checkbox input (styled)      |
| `.tl-toggle__label`    | `<label>`    | Label text (optional)        |

## Modifiers

### Toggle Size Modifiers

Apply these classes to the `.tl-toggle__input` element.

| Modifier                 | Description                    |
| ------------------------ | ------------------------------ |
| `.tl-toggle__input--lg`  | Large toggle (default)         |
| `.tl-toggle__input--sm`  | Small toggle                   |

**Note:** Use the native `disabled` attribute on the `<input>` element to disable the toggle. The component will automatically style the toggle and associated text when disabled.

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*