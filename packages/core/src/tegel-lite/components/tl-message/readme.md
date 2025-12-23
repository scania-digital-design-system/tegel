# tl-message

The Message component displays contextual feedback messages with different severity levels.

## Usage

```html
<div class="tl-message tl-message--information">
  <div class="tl-message__wrapper">
    <div class="tl-message__content">
      <div class="tl-message__header">Information</div>
      <div class="tl-message__extended-message">
        This is an informational message.
      </div>
    </div>
  </div>
</div>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-message.css
```

## Elements

| Element                          | HTML Element | Description                     |
| -------------------------------- | ------------ | ------------------------------- |
| `.tl-message`                    | `<div>`      | Main message container          |
| `.tl-message__wrapper`           | `<div>`      | Wrapper with styling and icon   |
| `.tl-message__content`           | `<div>`      | Content container               |
| `.tl-message__header`            | `<div>`      | Header/title text               |
| `.tl-message__extended-message`  | `<div>`      | Extended message text           |

## Modifiers

### Message Mode Modifiers

Apply these classes to the `.tl-message` element.

| Modifier                 | Description                    |
| ------------------------ | ------------------------------ |
| `.tl-message--primary`   | Primary background mode        |
| `.tl-message--secondary` | Secondary background mode      |

### Message Variant Modifiers

A variant modifier is required. Apply these classes to the `.tl-message` element.

| Modifier                      | Description                           |
| ----------------------------- | ------------------------------------- |
| `.tl-message--information`    | Information message (blue)            |
| `.tl-message--success`        | Success message (green)               |
| `.tl-message--warning`        | Warning message (yellow)              |
| `.tl-message--error`          | Error message (red)                   |

### Message Display Modifiers

Apply these classes to the `.tl-message` element.

| Modifier                   | Description                          |
| -------------------------- | ------------------------------------ |
| `.tl-message--no-icon`     | Hides the variant icon               |
| `.tl-message--minimal`     | Minimal styling without border/background |

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
