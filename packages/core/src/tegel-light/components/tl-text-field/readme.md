# tl-text-field

The Text Field component provides a single-line input field with labels, helper text, and various states.

## Usage

```html
<div class="tl-text-field">
  <label class="tl-text-field__label" for="input1">Label</label>
  <input 
    type="text" 
    id="input1"
    class="tl-text-field__input"
    placeholder="Enter text"
  />
  <span class="tl-text-field__helper">Helper text</span>
</div>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-text-field.css
```

## Elements

| Element                      | HTML Element | Description                     |
| ---------------------------- | ------------ | ------------------------------- |
| `.tl-text-field`             | `<div>`      | Main container                  |
| `.tl-text-field__label`      | `<label>`    | Label for the input             |
| `.tl-text-field__input`      | `<input>`    | Input element                   |
| `.tl-text-field__helper`     | `<span>`     | Helper text below input         |
| `.tl-text-field__prefix`     | `<span>`     | Prefix content (icon/text)      |
| `.tl-text-field__suffix`     | `<span>`     | Suffix content (icon/text)      |

## Modifiers

### Text Field Mode Modifiers

Apply these classes to the `.tl-text-field` element.

| Modifier                   | Description                        |
| -------------------------- | ---------------------------------- |
| `.tl-text-field--primary`  | Primary mode variant               |
| `.tl-text-field--secondary`| Secondary mode variant             |

### Text Field Size Modifiers

Apply these classes to the `.tl-text-field` element.

| Modifier                | Description                          |
| ----------------------- | ------------------------------------ |
| `.tl-text-field--sm`    | Small text field (40px height)       |
| `.tl-text-field--md`    | Medium text field (48px height)      |
| `.tl-text-field--lg`    | Large text field (56px height, default) |

### Text Field State Modifiers

Apply these classes to the `.tl-text-field` element.

| Modifier                  | Description                           |
| ------------------------- | ------------------------------------- |
| `.tl-text-field--disabled`| Disabled state                        |
| `.tl-text-field--readonly`| Read-only state with edit icon        |
| `.tl-text-field--error`   | Error state with error styling        |
| `.tl-text-field--success` | Success state with success styling    |

### Text Field Layout Modifiers

Apply these classes to the `.tl-text-field` element.

| Modifier                            | Description                          |
| ----------------------------------- | ------------------------------------ |
| `.tl-text-field--label-inside`      | Positions label inside input         |
| `.tl-text-field--label-outside`     | Positions label outside (default)    |
| `.tl-text-field--no-min-width`      | Removes minimum width constraint     |
| `.tl-text-field--hide-readonly-icon`| Hides readonly edit icon             |

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
