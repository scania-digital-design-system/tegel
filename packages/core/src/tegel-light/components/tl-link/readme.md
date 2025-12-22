# tl-link

The Link component provides styled hyperlinks with support for icons and different states.

## Usage

```html
<a href="#" class="tl-link">
  Link text
  <span class="tl-link__icon">
    <i class="tl-icon tl-icon--arrow_right"></i>
  </span>
</a>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-link.css
```

## Elements

| Element           | HTML Element | Description                  |
| ----------------- | ------------ | ---------------------------- |
| `.tl-link`        | `<a>`/`<button>` | Link element             |
| `.tl-link__icon`  | `<span>`     | Icon container for link      |

## Modifiers

### Link Style Modifiers

Apply these classes to the `.tl-link` element.

| Modifier               | Description                           |
| ---------------------- | ------------------------------------- |
| `.tl-link--underline`  | Shows underline decoration            |
| `.tl-link--standalone` | Standalone link styling               |

### Link State Modifiers

Apply these classes to the `.tl-link` element.

| Modifier              | Description                    |
| --------------------- | ------------------------------ |
| `.tl-link--disabled`  | Disabled state with no pointer events |

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
