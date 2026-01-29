# tl-side-menu

The Side Menu component provides a navigation sidebar with collapsible sections and responsive behavior.

## Usage

```html
<div class="tl-side-menu">
  <div class="tl-side-menu__wrapper tl-side-menu__wrapper--closed">
    <div class="tl-side-menu__overlay"></div>
    <aside class="tl-side-menu__aside">
      <div class="tl-side-menu__close">
        <button class="tl-side-menu__item">
          <span class="tl-icon tl-icon--cross tl-icon--20"></span>
        </button>
      </div>
      <nav class="tl-side-menu__navigation">
        <div class="tl-side-menu__list-wrapper">
          <ul class="tl-side-menu__upper-list">
            <li>
              <a href="#" class="tl-side-menu__item tl-side-menu__item--selected">
                <span class="tl-icon tl-icon--info tl-icon--24"></span>
                Item 1
              </a>
            </li>
            <li class="tl-side-menu__dropdown">
              <button class="tl-side-menu__item">
                <span class="tl-icon tl-icon--truck tl-icon--24"></span>
                Dropdown
              </button>
              <div class="tl-side-menu__dropdown-menu">
                <span class="tl-side-menu__dropdown-header">Dropdown</span>
                <ul class="tl-side-menu__dropdown-list">
                  <li>
                    <button class="tl-side-menu__dropdown-item tl-side-menu__dropdown-item--selected">
                      Dropdown item 1
                    </button>
                  </li>
                  <li>
                    <button class="tl-side-menu__dropdown-item">
                      Dropdown item 2
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <ul class="tl-side-menu__end-list">
            <li>
              <button class="tl-side-menu__item">
                <div class="tl-side-menu__user">
                  <div class="tl-side-menu__user-image">
                    <img src="profile.jpg" alt="User">
                  </div>
                  <div class="tl-side-menu__user-label">
                    Name Namesson
                    <div class="subheader">Company name</div>
                  </div>
                </div>
              </button>
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
@scania/tegel-lite/tl-icon.css
```

## Elements

| Element                               | HTML Element      | Description                        |
| ------------------------------------- | ----------------- | ---------------------------------- |
| `.tl-side-menu`                       | `<div>`           | Main container                     |
| `.tl-side-menu__wrapper`              | `<div>`           | Wrapper for menu content           |
| `.tl-side-menu__overlay`              | `<div>`           | Backdrop overlay                   |
| `.tl-side-menu__aside`                | `<aside>`         | Sidebar container                  |
| `.tl-side-menu__close`                | `<div>`           | Close button wrapper               |
| `.tl-side-menu__navigation`           | `<nav>`           | Navigation container               |
| `.tl-side-menu__list-wrapper`         | `<div>`           | List wrapper with scroll           |
| `.tl-side-menu__upper-list`           | `<ul>`            | Upper section list                 |
| `.tl-side-menu__end-list`             | `<ul>`            | Bottom section list                |
| `.tl-side-menu__item`                 | `<a>` / `<button>`| Menu item (link or button)         |
| `.tl-side-menu__dropdown`             | `<li>`            | Dropdown container                 |
| `.tl-side-menu__dropdown-menu`        | `<div>`           | Dropdown submenu container         |
| `.tl-side-menu__dropdown-header`      | `<span>`          | Dropdown header/title              |
| `.tl-side-menu__dropdown-list`        | `<ul>`            | Dropdown list container            |
| `.tl-side-menu__dropdown-item`        | `<a>` / `<button>`| Dropdown list item (link/button)   |
| `.tl-side-menu__user`                 | `<div>`           | User profile section               |
| `.tl-side-menu__user-image`           | `<div>`           | User profile image container       |
| `.tl-side-menu__user-label`           | `<div>`           | User profile label/text            |
| `.tl-side-menu__collapse`             | `<li>`            | Collapse button wrapper            |
| `.tl-side-menu__collapse-text`        | `<span>`          | Collapse button text               |
| `.tl-icon`                            | `<span>`          | Icon element (optional)            |

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

### Side Menu Item Modifiers

Apply these classes to `.tl-side-menu__item` elements.

| Modifier                          | Description                    |
| --------------------------------- | ------------------------------ |
| `.tl-side-menu__item--selected`   | Selected/active item           |

### Side Menu Dropdown Modifiers

Apply these classes to `.tl-side-menu__dropdown` elements.

| Modifier                          | Description                    |
| --------------------------------- | ------------------------------ |
| `.tl-side-menu__dropdown--open`   | Dropdown is expanded           |

### Side Menu Dropdown List Item Modifiers

Apply these classes to `.tl-side-menu__dropdown-item` elements.

| Modifier                                      | Description                    |
| --------------------------------------------- | ------------------------------ |
| `.tl-side-menu__dropdown-item--selected`     | Selected dropdown list item    |

## JavaScript Required

The Side Menu component requires JavaScript to handle:
- Open/close menu (toggle wrapper state classes)
- Collapse/expand functionality
- Dropdown menu interactions
- Click outside to close (overlay)
- Keyboard navigation

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
