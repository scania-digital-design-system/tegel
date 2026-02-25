# tl-toast

The Toast component displays temporary notification messages with different severity levels.

## Usage

```html
<div class="tl-toast tl-toast--information">
  <span class="tl-toast__icon">
    <span class="tl-icon tl-icon--info tl-icon--20"></span>
  </span>
  <div class="tl-toast__content">
    <div class="tl-toast__text">
      <div class="tl-toast__header">Toast Header</div>
      <div class="tl-toast__subheader">Toast message text goes here.</div>
    </div>
    <div class="tl-toast__actions">
      <a class="tl-link tl-link--underline" href="#">Link example</a>
    </div>
  </div>
  <button class="tl-toast__close">
    <span class="tl-icon tl-icon--cross tl-icon--20"></span>
  </button>
</div>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-toast.css
@scania/tegel-lite/tl-icon.css
```

### Optional Stylesheets

```
@scania/tegel-lite/tl-link.css (if using links in actions slot)
```

## Elements

| Element                | HTML Element | Description                     |
| ---------------------- | ------------ | ------------------------------- |
| `.tl-toast`            | `<div>`      | Main toast container            |
| `.tl-toast__icon`      | `<span>`     | Icon wrapper                    |
| `.tl-toast__content`   | `<div>`      | Content wrapper                 |
| `.tl-toast__text`      | `<div>`      | Text content wrapper            |
| `.tl-toast__header`    | `<div>`      | Toast header/title              |
| `.tl-toast__subheader` | `<div>`      | Toast message text              |
| `.tl-toast__actions`   | `<div>`      | Action buttons/links container  |
| `.tl-toast__close`     | `<button>`   | Close/dismiss button (optional) |

## Modifiers

### Toast Variant Modifiers

Apply these classes to the `.tl-toast` element.

| Modifier                 | Description                           |
| ------------------------ | ------------------------------------- |
| `.tl-toast--information` | Information toast (blue border)       |
| `.tl-toast--success`     | Success toast (green border)          |
| `.tl-toast--warning`     | Warning toast (yellow border)         |
| `.tl-toast--error`       | Error toast (red border)              |

### Toast State Modifiers

Apply these classes to the `.tl-toast` element.

| Modifier            | Description                    |
| ------------------- | ------------------------------ |
| `.tl-toast--hide`   | Hidden state                   |

## JavaScript Required

The Toast component requires JavaScript to handle:
- Show/hide toast (toggle `tl-toast--hide` class)
- Auto-dismiss timer
- Close button functionality
- Toast queue management
- Positioning and stacking of multiple toasts

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*