# tl-popover-menu

The Popover Menu component displays a dropdown menu with interactive items.

## Usage

```html
<div class="tl-popover-menu tl-popover-menu--visible">
  <div class="tl-popover-menu__item-wrapper">
    <button class="tl-popover-menu__item">
      <span class="tl-icon tl-icon--edit"></span>
      Edit
    </button>
    <button class="tl-popover-menu__item">
      <span class="tl-icon tl-icon--delete"></span>
      Delete
    </button>
    <div class="tl-divider"></div>
    <button class="tl-popover-menu__item tl-popover-menu__item--disabled">
      <span class="tl-icon tl-icon--settings"></span>
      Settings
    </button>
  </div>
</div>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-popover-menu.css
@scania/tegel-lite/tl-icon.css
@scania/tegel-lite/tl-divider.css
```

## Elements

| Element                           | HTML Element | Description                  |
| --------------------------------- | ------------ | ---------------------------- |
| `.tl-popover-menu`                | `<div>`      | Main popover menu container  |
| `.tl-popover-menu__item-wrapper`  | `<div>`      | Wrapper for menu items       |
| `.tl-popover-menu__item`          | `<button>`   | Menu item button             |
| `.tl-divider`                     | `<div>`      | Divider between items (optional) |
| `.tl-icon`                        | `<span>`     | Icon element (optional)      |

## Modifiers

### Popover Menu State Modifiers

Apply these classes to the `.tl-popover-menu` element.

| Modifier                      | Description                           |
| ----------------------------- | ------------------------------------- |
| `.tl-popover-menu--visible`   | Shows the popover menu                |
| `.tl-popover-menu--fluid`     | Fluid width based on content          |

### Popover Menu Animation Modifiers

Apply these classes to the `.tl-popover-menu` element.

| Modifier                           | Description                        |
| ---------------------------------- | ---------------------------------- |
| `.tl-popover-menu--animation-fade` | Fade-in animation with slide up    |

### Popover Menu Item Modifiers

Apply these classes to `.tl-popover-menu__item` elements.

| Modifier                          | Description                     |
| --------------------------------- | ------------------------------- |
| `.tl-popover-menu__item--disabled`| Disabled menu item              |

## JavaScript Required

The Popover Menu component requires JavaScript to handle:
- Show/hide menu (toggle `tl-popover-menu--visible` class)
- Positioning relative to trigger element
- Click outside to close
- Keyboard navigation (Arrow keys, Escape)
- Item selection and actions

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
