# tl-popover-canvas

The Popover Canvas component displays contextual content in a floating container with optional animations.

## Usage

```html
<div class="tl-popover-canvas tl-popover-canvas--visible">
  <div class="tl-popover-canvas__content">
    <h3 class="tl-popover-canvas__header">Popover Header</h3>
    <p>Popover content goes here.</p>
    <div class="tl-popover-canvas__actions">
      <button class="tl-button tl-button--sm">Cancel</button>
      <button class="tl-button tl-button--primary tl-button--sm">Confirm</button>
    </div>
  </div>
</div>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-popover-canvas.css
@scania/tegel-lite/tl-button.css
```

## Elements

| Element                         | HTML Element | Description                  |
| ------------------------------- | ------------ | ---------------------------- |
| `.tl-popover-canvas`            | `<div>`      | Main popover container       |
| `.tl-popover-canvas__content`   | `<div>`      | Content wrapper              |
| `.tl-popover-canvas__header`    | `<h3>`       | Header/title                 |
| `.tl-popover-canvas__actions`   | `<div>`      | Action buttons container     |

## Modifiers

### Popover State Modifiers

Apply these classes to the `.tl-popover-canvas` element.

| Modifier                        | Description                           |
| ------------------------------- | ------------------------------------- |
| `.tl-popover-canvas--visible`   | Shows the popover                     |

### Popover Animation Modifiers

Apply these classes to the `.tl-popover-canvas` element.

| Modifier                             | Description                      |
| ------------------------------------ | -------------------------------- |
| `.tl-popover-canvas--animation-fade` | Fade-in animation with slide up  |

## JavaScript Required

The Popover Canvas component requires JavaScript to handle:
- Show/hide popover (toggle `tl-popover-canvas--visible` class)
- Positioning relative to trigger element
- Click outside to close
- Keyboard navigation (Escape key)

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
