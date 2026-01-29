# tl-tooltip

The Tooltip component displays informational text in a popup when hovering or focusing on an element.

## Usage

```html
  <div 
    id="my-tooltip" 
    class="tl-tooltip tl-tooltip--top" 
    role="tooltip">
    Helpful information here
  </div>

```

### Required Stylesheets

```javascript
import '@scania/tegel-lite/global.scss';
import '@scania/tegel-lite/tl-tooltip.css';
```

## Structure

| Element          | HTML Element | CSS Position | Description                    |
| ---------------- | ------------ | ------------ | ------------------------------ |
| `.tl-tooltip`    | `<div>`      | `fixed`      | The tooltip popup itself       |

## Modifiers

### Border Radius Modifiers

Position modifiers **only control border-radius**. Users handle positioning with their own CSS.

| Modifier                   | Cut Corner    | Border Radius         |
| -------------------------- | ------------- | --------------------- |
| *(none)*                   | None          | `4px` (all rounded)   |
| `.tl-tooltip--top-start`   | Bottom-left   | `4px 4px 4px 0`       |
| `.tl-tooltip--top-end`     | Bottom-right  | `4px 4px 0 4px`       |
| `.tl-tooltip--bottom-start` | Top-left     | `0 4px 4px 4px`       |
| `.tl-tooltip--bottom-end`  | Top-right     | `4px 0 4px 4px`       |
| `.tl-tooltip--left-start`  | Top-right     | `4px 0 4px 4px`       |
| `.tl-tooltip--left-end`    | Bottom-right  | `4px 4px 0 4px`       |
| `.tl-tooltip--right-start` | Top-left      | `0 4px 4px 4px`       |
| `.tl-tooltip--right-end`   | Bottom-left   | `4px 4px 4px 0`       |


### Visibility Modifier

| Modifier                  | Description                    |
| ------------------------- | ------------------------------ |
| `.tl-tooltip--visible`    | Shows tooltip (opacity: 1)     |

**Default:** `opacity: 0`, `visibility: hidden`, `pointer-events: none`


## JavaScript Required

The component requires JavaScript for:

- Position calculation (top, left coordinates)
- Show/hide logic (add/remove `.tl-tooltip--visible` class)
- Event handling (mouseenter, mouseleave, focus, blur)
- Accessibility (aria attributes, keyboard support)

----------------------------------------------

*Part of Tegel Lite (Beta) - CSS Design System*
