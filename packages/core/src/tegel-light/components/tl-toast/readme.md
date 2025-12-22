# tl-toast

The Toast component displays temporary notification messages with different severity levels.

## Usage

```html
<div class="tl-toast tl-toast--information">
  <div class="tl-toast__icon">
    <i class="tl-icon tl-icon--info"></i>
  </div>
  <div class="tl-toast__content">
    <div class="tl-toast__text">
      <h3 class="tl-toast__header">Toast Header</h3>
      <p class="tl-toast__subheader">Toast message text goes here.</p>
    </div>
    <div class="tl-toast__actions">
      <button class="tl-button tl-button--sm">Action</button>
    </div>
  </div>
  <button class="tl-toast__close">
    <i class="tl-icon tl-icon--cross"></i>
  </button>
</div>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-toast.css
```

## JavaScript Required

The Toast component requires JavaScript to handle:
- Show/hide toast (toggle `tl-toast--hide` class)
- Auto-dismiss timer
- Close button functionality
- Toast queue management
- Animation timing

## Elements

| Element                | HTML Element | Description                     |
| ---------------------- | ------------ | ------------------------------- |
| `.tl-toast`            | `<div>`      | Main toast container            |
| `.tl-toast__icon`      | `<div>`      | Icon wrapper                    |
| `.tl-toast__content`   | `<div>`      | Content wrapper                 |
| `.tl-toast__text`      | `<div>`      | Text content wrapper            |
| `.tl-toast__header`    | `<h3>`       | Toast header/title              |
| `.tl-toast__subheader` | `<p>`        | Toast message text              |
| `.tl-toast__actions`   | `<div>`      | Action buttons container        |
| `.tl-toast__close`     | `<button>`   | Close/dismiss button            |

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

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
