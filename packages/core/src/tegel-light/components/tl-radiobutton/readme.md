# tl-radiobutton

The Radiobutton component provides a radio button input for selecting one option from a group.

## Usage

```html
<div class="tl-radiobutton">
  <input 
    type="radio" 
    id="radio1" 
    name="radio-group" 
    class="tl-radiobutton__input"
  />
  <div class="tl-radiobutton__control"></div>
  <label for="radio1" class="tl-radiobutton__label">
    Option 1
  </label>
</div>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-radiobutton.css
```

## Elements

| Element                     | HTML Element | Description                  |
| --------------------------- | ------------ | ---------------------------- |
| `.tl-radiobutton`           | `<div>`      | Main container               |
| `.tl-radiobutton__input`    | `<input>`    | Native radio input (hidden)  |
| `.tl-radiobutton__control`  | `<div>`      | Visual radio control         |
| `.tl-radiobutton__label`    | `<label>`    | Label text                   |

## Modifiers

### Radiobutton State Modifiers

Apply these classes to the `.tl-radiobutton` element.

| Modifier                    | Description                    |
| --------------------------- | ------------------------------ |
| `.tl-radiobutton--disabled` | Disabled state                 |

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
