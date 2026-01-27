# tl-datetime

The DateTime component provides a form input for date and time selection with support for multiple input types.

## Usage

```html
<div class="tl-datetime tl-datetime--lg">
  <label class="tl-datetime__label">Select date</label>
  <div class="tl-datetime__wrapper">
    <input class="tl-datetime__input" type="date" />
  </div>
  <div class="tl-datetime__helper">Helper text</div>
</div>
```

## Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-datetime.css
```

## Elements

| Element                      | HTML Element | Description                           |
| ---------------------------- | ------------ | ------------------------------------- |
| `.tl-datetime`               | `<div>`      | Main container (min-width 208px unless `--no-min-width`) |
| `.tl-datetime__label`        | `<label>`    | Label for the input                   |
| `.tl-datetime__wrapper`      | `<div>`      | Wrapper for input (icon generated via CSS) |
| `.tl-datetime__input`        | `<input>`    | Input element (date/datetime-local/time) |
| `.tl-datetime__label-inside` | `<label>`    | Label inside the input wrapper        |
| `.tl-datetime__helper`       | `<div>`      | Helper text container below input     |

## Modifiers

### DateTime Mode Modifiers

Apply these classes to the `.tl-datetime` element.

| Modifier                 | Description                        |
| ------------------------ | ---------------------------------- |
| `.tl-datetime--primary`  | Primary mode variant               |
| `.tl-datetime--secondary`| Secondary mode variant             |

### DateTime Size Modifiers

Apply these classes to the `.tl-datetime` element.

| Modifier              | Description                   |
| --------------------- | ----------------------------- |
| `.tl-datetime--sm`    | Small datetime                |
| `.tl-datetime--md`    | Medium datetime               |
| `.tl-datetime--lg`    | Large datetime                |

### DateTime State Modifiers

Apply these classes to the `.tl-datetime` element.

| Modifier              | Description                    |
| --------------------- | ------------------------------ |
| `.tl-datetime--error` | Error state with error styling |

**Note:** Use the native `disabled` attribute on the `<input>` element for disabled state.

### DateTime Layout Modifiers

Apply these classes to the `.tl-datetime` element.

| Modifier                      | Description                          |
| ----------------------------- | ------------------------------------ |
| `.tl-datetime--label-inside`  | Positions label inside input wrapper (not available for sm size) |
| `.tl-datetime--no-min-width`  | Removes minimum width constraint (208px) |

**Note:** Label is positioned outside the input wrapper by default.
