# tl-message

The Message component displays contextual feedback messages with different severity levels.

## Usage

```html
<div class="tl-message">
  <div class="tl-message__wrapper tl-message__wrapper--information">
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

Apply these classes to the `.tl-message__wrapper` element.

| Modifier                           | Description                           |
| ---------------------------------- | ------------------------------------- |
| `.tl-message__wrapper--information`| Information message (blue)            |
| `.tl-message__wrapper--success`    | Success message (green)               |
| `.tl-message__wrapper--warning`    | Warning message (yellow)              |
| `.tl-message__wrapper--error`      | Error message (red)                   |

### Message Display Modifiers

Apply these classes to the `.tl-message__wrapper` element.

| Modifier                        | Description                          |
| ------------------------------- | ------------------------------------ |
| `.tl-message__wrapper--no-icon` | Hides the variant icon               |
| `.tl-message__wrapper--minimal` | Minimal styling without border/background |

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
