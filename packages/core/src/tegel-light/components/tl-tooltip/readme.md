# tl-tooltip

The Tooltip component displays informational text in a popup when hovering or focusing on an element.

## Usage

```html
<div class="tl-tooltip">
  <button type="button" aria-describedby="tooltip-id">Hover me</button>
  <div id="tooltip-id" class="tl-tooltip__popup tl-tooltip__popup--top tl-tooltip__popup--visible" role="tooltip">
    Tooltip text goes here
  </div>
</div>
```

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

Apply ONE of these classes to the `.tl-tooltip__popup` element to set position.

| Modifier                        | Description                           |
| ------------------------------- | ------------------------------------- |
| `.tl-tooltip__popup--top`       | Position above, centered              |
| `.tl-tooltip__popup--top-start` | Position above, aligned to start      |
| `.tl-tooltip__popup--top-end`   | Position above, aligned to end        |
| `.tl-tooltip__popup--bottom`    | Position below, centered              |
| `.tl-tooltip__popup--bottom-start` | Position below, aligned to start   |
| `.tl-tooltip__popup--bottom-end`| Position below, aligned to end        |
| `.tl-tooltip__popup--left`      | Position to left, centered            |
| `.tl-tooltip__popup--left-start`| Position to left, aligned to start    |
| `.tl-tooltip__popup--left-end`  | Position to left, aligned to end      |
| `.tl-tooltip__popup--right`     | Position to right, centered           |
| `.tl-tooltip__popup--right-start` | Position to right, aligned to start |
| `.tl-tooltip__popup--right-end` | Position to right, aligned to end     |

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
