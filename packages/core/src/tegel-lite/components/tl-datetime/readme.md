# tl-datetime

The DateTime component provides a form input for date and time selection with support for multiple input types.

## Usage

```html
<div class="tl-datetime tl-datetime--lg">
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
    <span class="tl-datetime__icon tl-datetime__icon--datetime">
      <span class="tl-icon tl-icon--calendar tl-icon--20" aria-hidden="true"></span>
    </span>
  </div>
  <div class="tl-datetime__helper">
    <span class="tl-icon tl-icon--info tl-icon--16" aria-hidden="true"></span>
    Helper text
  </div>
</div>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-datetime.css
@scania/tegel-lite/tl-icon.css
```

## Elements

| Element                      | HTML Element | Description                           |
| ---------------------------- | ------------ | ------------------------------------- |
| `.tl-datetime`               | `<div>`      | Main container (min-width 208px unless `--no-min-width`) |
| `.tl-datetime__label`        | `<label>`    | Label for the input                   |
| `.tl-datetime__wrapper`      | `<div>`      | Wrapper for input and icon            |
| `.tl-datetime__input`        | `<input>`    | Input element (date/datetime/time)    |
| `.tl-datetime__icon`         | `<span>`     | Icon container                        |
| `.tl-datetime__icon--datetime` | `<span>`   | Calendar icon container (for date/datetime) |
| `.tl-datetime__icon--time`   | `<span>`     | Clock icon container (for time)       |
| `.tl-datetime__label-inside` | `<label>`    | Label inside the input wrapper        |
| `.tl-datetime__helper`       | `<div>`      | Helper text container below input     |
| `.tl-icon`                   | `<span>`     | Icon element (optional)               |

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
| `.tl-datetime--disabled` | Disabled state. Use together with `disabled` attribute on input |
| `.tl-datetime--error`    | Error state with error styling        |

### DateTime Layout Modifiers

Apply these classes to the `.tl-datetime` element.

| Modifier                      | Description                          |
| ----------------------------- | ------------------------------------ |
| `.tl-datetime--label-inside`  | Positions label inside input wrapper (not available for sm size) |
| `.tl-datetime--label-outside` | Positions label outside input wrapper (default) |
| `.tl-datetime--no-min-width`  | Removes minimum width constraint (208px) |

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
