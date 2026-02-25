# tl-dropdown - Custom

The Custom variant provides a fully customizable dropdown interface using a button trigger and custom option list. It supports both standard selection and filter functionality.

## Usage

### Custom Dropdown

```html
<div class="tl-dropdown">
  <label class="tl-dropdown__label">Label</label>
  <button class="tl-dropdown__button">
    <span class="tl-dropdown__value">Placeholder</span>
  </button>
  <ul class="tl-dropdown__list">
    <li class="tl-dropdown__option">Option 1</li>
    <li class="tl-dropdown__option">Option 2</li>
    <li class="tl-dropdown__option">Option 3</li>
  </ul>
  <div class="tl-dropdown__helper">Helper text</div>
</div>
```

### Custom Dropdown with Filter

```html
<div class="tl-dropdown">
  <label class="tl-dropdown__label">Label</label>
  <button class="tl-dropdown__button">
    <input class="tl-dropdown__filter" type="text" placeholder="Search..." />
  </button>
  <ul class="tl-dropdown__list">
    <li class="tl-dropdown__option">Option 1</li>
    <li class="tl-dropdown__option">Option 2</li>
    <li class="tl-dropdown__option">Option 3</li>
  </ul>
  <div class="tl-dropdown__helper">Helper text</div>
</div>
```

## Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-dropdown.css
```

## Elements

| Element                 | HTML Element | Description                        |
| ----------------------- | ------------ | ---------------------------------- |
| `.tl-dropdown`          | `<div>`      | Main container                     |
| `.tl-dropdown__label`   | `<label>`    | Label for the dropdown             |
| `.tl-dropdown__button`  | `<button>`   | Button trigger                     |
| `.tl-dropdown__value`   | `<span>`     | Display value in button (Custom variant)   |
| `.tl-dropdown__filter`  | `<input>`    | Filter/search input (Filter variant)       |
| `.tl-dropdown__list`    | `<ul>`       | Options list container             |
| `.tl-dropdown__option`  | `<li>`       | Individual option                  |
| `.tl-dropdown__helper`  | `<div>`      | Helper text container              |

## Modifiers

### Dropdown Modifiers

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
| `.tl-dropdown--dropup`         | Shows options above the button    |

**Note:** Label is positioned outside the dropdown by default.

**Disabled State:** Use the native `disabled` attribute on the `<button>` element (`.tl-dropdown__button`) for disabled state. The component will automatically style the disabled state.

### Option Modifiers

Apply these classes to `.tl-dropdown__option` elements.

| Modifier                            | Description                  |
| ----------------------------------- | ---------------------------- |
| `.tl-dropdown__option--selected`    | Selected option              |
| `.tl-dropdown__option--highlighted` | Highlighted option           |
| `.tl-dropdown__option--hidden`      | Hidden (filtered out) option |

**Note:** Individual options cannot be disabled in the custom dropdown variant. To prevent selection of specific options, consider removing them from the list or using the native select variant instead.

## JavaScript Required

The Custom Dropdown requires JavaScript to handle:

- Toggle dropdown visibility (update `aria-expanded` attribute on button)
- Handle option selection (toggle `.tl-dropdown__option--selected` class)
- Update button value when option is selected (or filter input for filter variant)
- Filter logic (show/hide options based on input value - for filter variant only)
- Keyboard navigation (arrow keys, Enter, Escape)
- Click-outside-to-close functionality
- Manage `aria-*` attributes for accessibility

**Note:** For multiselect functionality, add checkboxes inside each `.tl-dropdown__option` element and set `aria-multiselectable="true"` on the `.tl-dropdown__list` element.