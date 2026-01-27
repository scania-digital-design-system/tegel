# tl-textarea

The Textarea component provides a multi-line text input field with labels, helper text, and various states.

## Usage

```html
<div class="tl-textarea">
  <label class="tl-textarea__label" for="textarea1">Label</label>
  <textarea 
    id="textarea1"
    class="tl-textarea__input"
    placeholder="Enter text"
    rows="4"
  ></textarea>
  <div class="tl-textarea__bottom">
    <span class="tl-textarea__helper">Helper text</span>
    <span class="tl-textarea__charcounter">0 <span class="tl-textarea__charcounter-divider">/</span> 200</span>
  </div>
</div>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-textarea.css
```

## Elements

| Element                              | HTML Element | Description                     |
| ------------------------------------ | ------------ | ------------------------------- |
| `.tl-textarea`                       | `<div>`      | Main container                  |
| `.tl-textarea__label`                | `<label>`    | Label for the textarea          |
| `.tl-textarea__input`                | `<textarea>` | Textarea element                |
| `.tl-textarea__helper`               | `<div>`      | Helper text                     |
| `.tl-textarea__bottom`               | `<div>`      | Bottom section container        |
| `.tl-textarea__charcounter`          | `<span>`     | Character counter               |
| `.tl-textarea__charcounter-divider`  | `<span>`     | Divider in character counter    |

## Modifiers

### Textarea Mode Modifiers

Apply these classes to the `.tl-textarea` element.

| Modifier                  | Description                        |
| ------------------------- | ---------------------------------- |
| `.tl-textarea--primary`   | Primary mode variant               |
| `.tl-textarea--secondary` | Secondary mode variant             |

### Textarea State Modifiers

Apply these classes to the `.tl-textarea` element.

| Modifier                   | Description                           |
| -------------------------- | ------------------------------------- |
| `.tl-textarea--disabled`   | Disabled state                        |
| `.tl-textarea--readonly`   | Read-only state with edit icon        |
| `.tl-textarea--error`      | Error state with error styling        |
| `.tl-textarea--success`    | Success state with success styling    |

### Textarea Layout Modifiers

Apply these classes to the `.tl-textarea` element.

| Modifier                             | Description                          |
| ------------------------------------ | ------------------------------------ |
| `.tl-textarea--label-inside`         | Positions label inside textarea      |
| `.tl-textarea--no-min-width`         | Removes minimum width constraint     |
| `.tl-textarea--hide-readonly-icon`   | Hides readonly edit icon             |

**Note:** Label is positioned outside the textarea by default.

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
