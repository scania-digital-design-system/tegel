# tl-modal

The Modal component displays content in a layer above the main page with an overlay backdrop.

## Usage

```html
<div class="tl-modal__overlay tl-modal--visible"></div>
<div class="tl-modal tl-modal--md tl-modal--visible">
  <div class="tl-modal__header">
    <h2 class="tl-modal__title">Modal Title</h2>
    <button class="tl-modal__close">
      <span class="tl-icon tl-icon--cross"></span>
    </button>
  </div>
  <div class="tl-modal__body">
    <p>Modal content goes here.</p>
  </div>
  <div class="tl-modal__actions">
    <button class="tl-button">Cancel</button>
    <button class="tl-button tl-button--primary">Confirm</button>
  </div>
</div>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-modal.css
@scania/tegel-lite/tl-icon.css
@scania/tegel-lite/tl-button.css
```

## Elements

| Element               | HTML Element | Description                        |
| --------------------- | ------------ | ---------------------------------- |
| `.tl-modal`           | `<div>`      | Main modal container               |
| `.tl-modal__overlay`  | `<div>`      | Backdrop overlay                   |
| `.tl-modal__header`   | `<div>`      | Modal header section               |
| `.tl-modal__title`    | `<h2>`       | Modal title                        |
| `.tl-modal__close`    | `<button>`   | Close button                       |
| `.tl-modal__body`     | `<div>`      | Main content area                  |
| `.tl-modal__actions`  | `<div>`      | Action buttons container           |
| `.tl-icon`            | `<span>`     | Icon element (optional)            |

## Modifiers

### Modal Size Modifiers

Apply these classes to the `.tl-modal` element. Responsive widths adjust based on screen size.

| Modifier           | Description                           |
| ------------------ | ------------------------------------- |
| `.tl-modal--xs`    | Extra small modal (responsive)        |
| `.tl-modal--sm`    | Small modal (responsive)              |
| `.tl-modal--md`    | Medium modal (responsive)             |
| `.tl-modal--lg`    | Large modal (responsive)              |

### Modal State Modifiers

Apply these classes to the `.tl-modal` and `.tl-modal__overlay` elements.

| Modifier              | Description                    |
| --------------------- | ------------------------------ |
| `.tl-modal--visible`  | Shows the modal/overlay        |
| `.tl-modal--sticky`   | Sticky header and footer       |

## JavaScript Required

The Modal component requires JavaScript to handle:
- Show/hide modal and overlay (toggle `tl-modal--visible` class)
- Close button functionality
- Focus management and keyboard navigation (Escape key)
- Click outside to close (overlay click)

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
