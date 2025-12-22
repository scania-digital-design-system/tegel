# tl-side-menu

The Side Menu component provides a navigation sidebar with collapsible sections and responsive behavior.

## Usage

```html
<div class="tl-side-menu">
  <div class="tl-side-menu__wrapper">
    <div class="tl-side-menu__overlay"></div>
    <aside class="tl-side-menu__aside">
      <div class="tl-side-menu__close">
        <button>Close</button>
      </div>
      <nav class="tl-side-menu__navigation">
        <div class="tl-side-menu__list-wrapper">
          <ul class="tl-side-menu__list tl-side-menu__list--upper">
            <li class="tl-side-menu__item-wrapper">
              <a href="#" class="tl-side-menu__item">Item 1</a>
            </li>
          </ul>
          <ul class="tl-side-menu__list tl-side-menu__list--end">
            <li class="tl-side-menu__item-wrapper">
              <a href="#" class="tl-side-menu__item">Item 2</a>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  </div>
</div>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-side-menu.css
```

## JavaScript Required

The Side Menu component requires JavaScript to handle:
- Open/close menu (toggle wrapper state classes)
- Collapse/expand functionality
- Dropdown menu interactions
- Click outside to close (overlay)
- Keyboard navigation

## Elements

| Element                               | HTML Element | Description                        |
| ------------------------------------- | ------------ | ---------------------------------- |
| `.tl-side-menu`                       | `<div>`      | Main container                     |
| `.tl-side-menu__wrapper`              | `<div>`      | Wrapper for menu content           |
| `.tl-side-menu__overlay`              | `<div>`      | Backdrop overlay                   |
| `.tl-side-menu__aside`                | `<aside>`    | Sidebar container                  |
| `.tl-side-menu__close`                | `<div>`      | Close button wrapper               |
| `.tl-side-menu__navigation`           | `<nav>`      | Navigation container               |
| `.tl-side-menu__list-wrapper`         | `<div>`      | List wrapper with scroll           |
| `.tl-side-menu__list`                 | `<ul>`       | List container                     |
| `.tl-side-menu__list--upper`          | `<ul>`       | Upper section list                 |
| `.tl-side-menu__list--end`            | `<ul>`       | Bottom section list                |
| `.tl-side-menu__item-wrapper`         | `<li>`       | Item wrapper                       |
| `.tl-side-menu__item`                 | `<a>`/`<button>` | Menu item link/button          |
| `.tl-side-menu__dropdown-wrapper`     | `<li>`       | Dropdown container                 |
| `.tl-side-menu__dropdown-header`      | `<button>`   | Dropdown header button             |
| `.tl-side-menu__dropdown-menu`        | `<ul>`       | Dropdown submenu                   |
| `.tl-side-menu__dropdown-item-wrapper`| `<li>`       | Dropdown item wrapper              |
| `.tl-side-menu__dropdown-icon`        | `<i>`        | Dropdown chevron icon              |
| `.tl-side-menu__user`                 | `<div>`      | User profile section               |

## Modifiers

### Side Menu Layout Modifiers

Apply these classes to the `.tl-side-menu` element.

| Modifier                      | Description                                   |
| ----------------------------- | --------------------------------------------- |
| `.tl-side-menu--persistent`   | Persistent sidebar (visible on large screens) |
| `.tl-side-menu--collapsed`    | Collapsed state (icons only)                  |

### Side Menu Wrapper State Modifiers

Apply these classes to the `.tl-side-menu__wrapper` element.

| Modifier                          | Description                    |
| --------------------------------- | ------------------------------ |
| `.tl-side-menu__wrapper--open`    | Menu is open (mobile)          |
| `.tl-side-menu__wrapper--closed`  | Menu is closed                 |
| `.tl-side-menu__wrapper--empty`   | Empty state (no upper items)   |

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
