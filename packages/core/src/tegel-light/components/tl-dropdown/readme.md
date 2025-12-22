# tl-dropdown

The Dropdown component provides a select/filter input with customizable options and multiple variants.

## Usage

```html
<div class="tl-dropdown">
  <label class="tl-dropdown__label">Select option</label>
  <button class="tl-dropdown__button" aria-expanded="false">
    <span class="tl-dropdown__text" data-placeholder="Choose..."></span>
  </button>
  <ul class="tl-dropdown__list">
    <li class="tl-dropdown__option" tabindex="0">Option 1</li>
    <li class="tl-dropdown__option tl-dropdown__option--selected" tabindex="0">Option 2</li>
    <li class="tl-dropdown__option" tabindex="0">Option 3</li>
  </ul>
  <span class="tl-dropdown__helper">Helper text</span>
</div>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-dropdown.css
```

## JavaScript Required

The Dropdown component requires JavaScript to handle:
- Toggle dropdown list visibility (aria-expanded)
- Keyboard navigation
- Option selection
- Filter functionality (for input variant)
- Clear button functionality

## Elements

| Element                       | HTML Element | Description                           |
| ----------------------------- | ------------ | ------------------------------------- |
| `.tl-dropdown`                | `<div>`      | Main container                        |
| `.tl-dropdown__label`         | `<label>`    | Label for the dropdown                |
| `.tl-dropdown__button`        | `<button>`   | Button trigger for custom dropdown    |
| `.tl-dropdown__select`        | `<select>`   | Native select element                 |
| `.tl-dropdown__input`         | `<input>`    | Filter/search input field             |
| `.tl-dropdown__input-wrapper` | `<div>`      | Wrapper for input and clear button    |
| `.tl-dropdown__input-clear`   | `<button>`   | Clear button for input                |
| `.tl-dropdown__text`          | `<span>`     | Selected text display                 |
| `.tl-dropdown__list`          | `<ul>`       | Options list container                |
| `.tl-dropdown__option`        | `<li>`       | Individual option item                |
| `.tl-dropdown__helper`        | `<span>`     | Helper text below dropdown            |

## Modifiers

### Dropdown Mode Modifiers

Apply these classes to the `.tl-dropdown` element.

| Modifier                  | Description                        |
| ------------------------- | ---------------------------------- |
| `.tl-dropdown--primary`   | Primary mode variant               |
| `.tl-dropdown--secondary` | Secondary mode variant             |

### Dropdown Size Modifiers

Apply these classes to the `.tl-dropdown` element.

| Modifier              | Description                    |
| --------------------- | ------------------------------ |
| `.tl-dropdown--sm`    | Small dropdown (40px height)   |
| `.tl-dropdown--md`    | Medium dropdown (48px height)  |
| `.tl-dropdown--lg`    | Large dropdown (56px height, default) |

### Dropdown State Modifiers

Apply these classes to the `.tl-dropdown` element.

| Modifier                 | Description                           |
| ------------------------ | ------------------------------------- |
| `.tl-dropdown--disabled` | Disabled state                        |
| `.tl-dropdown--error`    | Error state with error styling        |

### Dropdown Layout Modifiers

Apply these classes to the `.tl-dropdown` element.

| Modifier                      | Description                          |
| ----------------------------- | ------------------------------------ |
| `.tl-dropdown--label-inside`  | Positions label inside dropdown      |
| `.tl-dropdown--label-outside` | Positions label outside (default)    |
| `.tl-dropdown--dropup`        | Opens list upward instead of down    |

### Dropdown Option Modifiers

Apply these classes to `.tl-dropdown__option` elements.

| Modifier                         | Description                     |
| -------------------------------- | ------------------------------- |
| `.tl-dropdown__option--selected` | Selected/active option          |
| `.tl-dropdown__option--disabled` | Disabled option                 |
| `.tl-dropdown__option--no-result`| No results found state          |

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
