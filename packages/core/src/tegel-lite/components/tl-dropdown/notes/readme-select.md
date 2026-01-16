# tl-dropdown - Native Select

The Native Select variant uses the standard `<select>` element for simple dropdown functionality with native browser support.

## Usage

```html
<div class="tl-dropdown">
  <label class="tl-dropdown__label">Label</label>
  <select class="tl-dropdown__select">
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
  </select>
  <div class="tl-dropdown__helper">Helper text</div>
</div>
```

## Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-dropdown.css
```

## Elements

| Element                | HTML Element | Description                    |
| ---------------------- | ------------ | ------------------------------ |
| `.tl-dropdown`         | `<div>`      | Main container                 |
| `.tl-dropdown__label`  | `<label>`    | Label for the dropdown         |
| `.tl-dropdown__select` | `<select>`   | Native select element          |
| `.tl-dropdown__helper` | `<div>`      | Helper text container          |

## Modifiers

Apply these classes to the `.tl-dropdown` container element.

| Modifier                       | Description                       |
| ------------------------------ | --------------------------------- |
| `.tl-dropdown--sm`             | Small dropdown                    |
| `.tl-dropdown--md`             | Medium dropdown                   |
| `.tl-dropdown--lg`             | Large dropdown                    |
| `.tl-dropdown--primary`        | Primary mode variant              |
| `.tl-dropdown--secondary`      | Secondary mode variant            |
| `.tl-dropdown--error`          | Error state with error styling    |
| `.tl-dropdown--label-inside`   | Positions label inside dropdown   |
| `.tl-dropdown--label-outside`  | Positions label outside dropdown  |

## JavaScript

The native select variant uses the browser's built-in functionality and **does not require custom JavaScript**.
