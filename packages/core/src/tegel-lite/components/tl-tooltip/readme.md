# tl-tooltip

The Tooltip component displays informational text in a popup when hovering or focusing on an element.

## Usage

```html
<div class="tl-tooltip tl-tooltip--top">
  <button type="button" aria-describedby="tooltip-id">Hover me</button>
  <div id="tooltip-id" class="tl-tooltip__popup tl-tooltip__popup--visible" role="tooltip">
    Tooltip text goes here
  </div>
</div>
```

**Note:** The trigger element (button, link, icon, etc.) should be wrapped inside the `.tl-tooltip` container element.

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-tooltip.css
```

## Elements

| Element               | HTML Element | Description                  |
| --------------------- | ------------ | ---------------------------- |
| `.tl-tooltip`         | `<div>`      | Main tooltip container       |
| `.tl-tooltip__popup`  | `<div>`      | Tooltip popup content        |

## Modifiers

### Tooltip Position Modifiers

Apply ONE of these classes to the `.tl-tooltip` element to set position.

| Modifier                     | Description                           |
| ---------------------------- | ------------------------------------- |
| `.tl-tooltip--top`           | Position above, centered              |
| `.tl-tooltip--top-start`     | Position above, aligned to start      |
| `.tl-tooltip--top-end`       | Position above, aligned to end        |
| `.tl-tooltip--bottom`        | Position below, centered              |
| `.tl-tooltip--bottom-start`  | Position below, aligned to start      |
| `.tl-tooltip--bottom-end`    | Position below, aligned to end        |
| `.tl-tooltip--left`          | Position to left, centered            |
| `.tl-tooltip--left-start`    | Position to left, aligned to start    |
| `.tl-tooltip--left-end`      | Position to left, aligned to end      |
| `.tl-tooltip--right`         | Position to right, centered           |
| `.tl-tooltip--right-start`   | Position to right, aligned to start   |
| `.tl-tooltip--right-end`     | Position to right, aligned to end     |

### Tooltip State Modifiers

Apply these classes to the `.tl-tooltip__popup` element.

| Modifier                       | Description                    |
| ------------------------------ | ------------------------------ |
| `.tl-tooltip__popup--visible`  | Shows the tooltip              |

## JavaScript Required

The Tooltip component requires JavaScript to handle:
- Show/hide tooltip on hover/focus (toggle `tl-tooltip__popup--visible` class)
- Position calculation and adjustment
- Delay timers
- Accessibility (aria attributes)

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
