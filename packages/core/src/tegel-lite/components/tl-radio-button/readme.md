# tl-radio-button

The Radio Button component provides a radio button input for selecting one option from a group.

## Usage

```html
<label class="tl-radio-button">
  <input 
    type="radio" 
    id="radio1" 
    name="radio-group" 
    class="tl-radio-button__input"
  />
  <span class="tl-radio-button__control"></span>
  <span class="tl-radio-button__label">
    Option 1
  </span>
</label>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-radio-button.css
```

## Elements

| Element                      | HTML Element | Description                  |
| ---------------------------- | ------------ | ---------------------------- |
| `.tl-radio-button`           | `<label>`    | Main container               |
| `.tl-radio-button__input`    | `<input>`    | Native radio input (hidden)  |
| `.tl-radio-button__control`  | `<span>`     | Visual radio control         |
| `.tl-radio-button__label`    | `<span>`     | Label text                   |

## Modifiers

### Radio Button State Modifiers

Apply these classes to the `.tl-radio-button` element.

| Modifier                     | Description                                      |
| ---------------------------- | ------------------------------------------------ |
| `.tl-radio-button--disabled` | Disabled state (use together with `disabled` attribute on input) |

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
