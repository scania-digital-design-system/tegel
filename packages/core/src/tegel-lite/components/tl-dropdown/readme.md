# tl-dropdown

The Dropdown component provides a select/filter input with customizable options and multiple variants.

## Variants

The dropdown has three variants, each using different elements:

1. **Native Select** - Uses `<select>` element for standard browser select behavior
2. **Custom Button** - Uses `<button>` with custom list for advanced styling and interaction
3. **Filter** - Uses `<input>` with filterable list for search functionality

## Usage

### Button Dropdown

```html
<div class="tl-dropdown tl-dropdown--lg tl-dropdown--label-outside">
  <label class="tl-dropdown__label">Select option</label>
  <button class="tl-dropdown__button" aria-expanded="false">
    <span class="tl-dropdown__text" data-placeholder="Choose..."></span>
  </button>
  <ul class="tl-dropdown__list">
    <li class="tl-dropdown__option" tabindex="0">Option 1</li>
    <li class="tl-dropdown__option tl-dropdown__option--selected" tabindex="0">Option 2</li>
    <li class="tl-dropdown__option" tabindex="0">Option 3</li>
  </ul>
  <div class="tl-dropdown__helper">Helper text</div>
</div>
```

### Native Select Dropdown

```html
<div class="tl-dropdown tl-dropdown--lg tl-dropdown--label-outside">
  <label class="tl-dropdown__label" for="my-select">Select option</label>
  <select class="tl-dropdown__select" id="my-select">
    <option value="">Choose...</option>
    <option value="1">Option 1</option>
    <option value="2" selected>Option 2</option>
    <option value="3">Option 3</option>
  </select>
  <div class="tl-dropdown__helper">Helper text</div>
</div>
```

### Filter Dropdown

```html
<div class="tl-dropdown tl-dropdown--lg tl-dropdown--label-outside">
  <label class="tl-dropdown__label" for="my-filter">Filter options</label>
  <div class="tl-dropdown__input-wrapper">
    <input class="tl-dropdown__input" id="my-filter" type="text" placeholder="Search..." aria-expanded="false" />
    <button type="button" class="tl-dropdown__input-clear" tabindex="-1"></button>
  </div>
  <ul class="tl-dropdown__list" role="listbox">
    <li class="tl-dropdown__option" role="option">Option 1</li>
    <li class="tl-dropdown__option" role="option">Option 2</li>
    <li class="tl-dropdown__option" role="option">Option 3</li>
    <li class="tl-dropdown__option tl-dropdown__option--no-result" role="option">No result</li>
  </ul>
  <div class="tl-dropdown__helper">Helper text</div>
</div>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-dropdown.css
@scania/tegel-lite/tl-checkbox.css (when using multiselect)
```

## Elements

| Element                       | HTML Element | Description                                      |
| ----------------------------- | ------------ | ------------------------------------------------ |
| `.tl-dropdown`                | `<div>`      | Main container                                   |
| `.tl-dropdown__label`         | `<label>`    | Label for the dropdown                           |
| `.tl-dropdown__button`        | `<button>`   | Button trigger (for custom button variant)      |
| `.tl-dropdown__select`        | `<select>`   | Native select element (for select variant)      |
| `.tl-dropdown__input`         | `<input>`    | Filter/search input field (for filter variant)  |
| `.tl-dropdown__input-wrapper` | `<div>`      | Wrapper for input and clear button               |
| `.tl-dropdown__input-clear`   | `<button>`   | Clear button for input                           |
| `.tl-dropdown__text`          | `<span>`     | Selected text display (for custom button)       |
| `.tl-dropdown__list`          | `<ul>`       | Options list container (for custom variants)    |
| `.tl-dropdown__option`        | `<li>`       | Individual option item (for custom variants)    |
| `.tl-dropdown__helper`        | `<div>`      | Helper text container below dropdown             |
| `.tl-checkbox`                | `<div>`      | Checkbox wrapper (for multiselect variant)       |
| `.tl-icon`                    | `<tl-icon>`  | Icon element (20px for input, 16px for helper)   |

## Modifiers

### Dropdown Size Modifiers

A size modifier is required. Apply these classes to the `.tl-dropdown` element.

| Modifier              | Description                          |
| --------------------- | ------------------------------------ |
| `.tl-dropdown--sm`    | Small dropdown (40px height)         |
| `.tl-dropdown--md`    | Medium dropdown (48px height)        |
| `.tl-dropdown--lg`    | Large dropdown (56px height)         |

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

## Specifications

- **Default width**: 208px (can be customized)
- **Default height**: 56px (large)
- **Medium height**: 48px
- **Small height**: 40px
- **Icon sizes**: 20px for input icons, 16px for helper icons

## JavaScript Required

The custom Dropdown variants (button and filter) require JavaScript to handle:

- Toggle dropdown list visibility
- Update `aria-expanded` attribute on button/input
- Keyboard navigation (Arrow keys, Enter, Escape)
- Option selection and state management
- Update selected text display
- Filter/search functionality (for filter variant)
- Clear button functionality (for filter variant)
- Multiselect checkbox handling (for multiselect variant)

The native select variant uses the browser's built-in functionality and does not require custom JavaScript.

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
