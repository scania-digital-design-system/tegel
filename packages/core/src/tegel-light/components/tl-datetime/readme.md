# tl-datetime

The DateTime component provides a form input for date and time selection with support for multiple input types.

## Usage

```html
<div class="tl-datetime">
  <label class="tl-datetime__label" for="datetime-input">
    Select date
  </label>
  <div class="tl-datetime__wrapper">
    <input 
      class="tl-datetime__input" 
      type="date" 
      id="datetime-input"
      placeholder="YYYY-MM-DD"
    />
    <svg class="tl-datetime__icon tl-datetime__icon--datetime">
      <!-- Calendar icon -->
    </svg>
  </div>
  <span class="tl-datetime__helper">Helper text</span>
</div>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-datetime.css
```

## Elements

| Element                      | HTML Element | Description                           |
| ---------------------------- | ------------ | ------------------------------------- |
| `.tl-datetime`               | `<div>`      | Main container                        |
| `.tl-datetime__label`        | `<label>`    | Label for the input                   |
| `.tl-datetime__wrapper`      | `<div>`      | Wrapper for input and icon            |
| `.tl-datetime__input`        | `<input>`    | Input element (date/datetime/time)    |
| `.tl-datetime__icon`         | `<svg>`      | Icon indicator                        |
| `.tl-datetime__icon--datetime` | `<svg>`    | Calendar icon (for date/datetime)     |
| `.tl-datetime__icon--time`   | `<svg>`      | Clock icon (for time)                 |
| `.tl-datetime__label-inside` | `<span>`     | Label inside the input wrapper        |
| `.tl-datetime__helper`       | `<span>`     | Helper text below input               |

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
| `.tl-datetime--sm`    | Small datetime (40px height)  |
| `.tl-datetime--md`    | Medium datetime (48px height) |
| `.tl-datetime--lg`    | Large datetime (56px height, default) |

### DateTime State Modifiers

Apply these classes to the `.tl-datetime` element.

| Modifier                 | Description                           |
| ------------------------ | ------------------------------------- |
| `.tl-datetime--disabled` | Disabled state                        |
| `.tl-datetime--error`    | Error state with error styling        |

### DateTime Layout Modifiers

Apply these classes to the `.tl-datetime` element.

| Modifier                      | Description                          |
| ----------------------------- | ------------------------------------ |
| `.tl-datetime--label-inside`  | Positions label inside input wrapper |
| `.tl-datetime--no-min-width`  | Removes minimum width constraint     |

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
