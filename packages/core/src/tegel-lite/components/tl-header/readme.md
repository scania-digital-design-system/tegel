# tl-header

The Header component provides a consistent navigation header with items, dropdowns, and branding.

## Usage

```html
<header class="tl-header">
  <nav class="tl-header__nav">
    <ul class="tl-header__list">
      <li class="tl-header__title"><h4 class="tl-header__title-text">Application Name</h4></li>
      <li class="tl-header__item">
        <button class="tl-header__item-wrapper">
          <span class="tl-icon tl-icon--placeholder tl-icon--16" aria-hidden="true"></span>
        </button>
      </li>
      <li class="tl-header__middle-spacer"></li>
      <li class="tl-header__dropdown">
        <button class="tl-header__dropdown-wrapper">
          <span>Dropdown</span>
          <div class="tl-header__dropdown-icon">
            <span class="tl-icon tl-icon--chevron_down tl-icon--16" aria-hidden="true"></span>
          </div>
        </button>
      </li>
    </ul>
  </nav>
</header>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-header.css
@scania/tegel-lite/tl-icon.css
```

## Elements

| Element                                   | HTML Element | Description                        |
| ----------------------------------------- | ------------ | ---------------------------------- |
| `.tl-header`                              | `<header>`   | Main header container              |
| `.tl-header__nav`                         | `<nav>`      | Navigation wrapper                 |
| `.tl-header__list`                        | `<ul>`       | List container for header items    |
| `.tl-header__item`                        | `<li>`       | Individual header item             |
| `.tl-header__item-wrapper`                | `<button>`/`<a>` | Wrapper for header item content |
| `.tl-header__item-text`                   | `<span>`     | Text content for header item       |
| `.tl-header__dropdown`                    | `<li>`       | Dropdown menu container            |
| `.tl-header__dropdown-wrapper`            | `<button>`   | Wrapper for dropdown trigger       |
| `.tl-header__dropdown-icon`               | `<div>`      | Icon container for dropdown        |
| `.tl-header__dropdown-menu`               | `<ul>`       | Dropdown menu list                 |
| `.tl-header__dropdown-menu-item`          | `<li>`       | Dropdown menu item                 |
| `.tl-header__launcher-menu-grid`          | `<ul>`       | Launcher grid menu container       |
| `.tl-header__launcher-menu-list`          | `<ul>`       | Launcher list menu container       |
| `.tl-header__launcher-menu-item`          | `<li>`       | Launcher menu item                 |
| `.tl-header__launcher-menu-title`         | `<li>`       | Launcher menu section title        |
| `.tl-header__dropdown-wrapper-user`       | `<button>`   | User profile menu wrapper                 |
| `.tl-header__user-menu-image`             | `<div>`      | User profile image container       |
| `.tl-header__user-menu`                   | `<ul>`       | User profile menu                  |
| `.tl-header__user-menu-item`              | `<li>`       | User profile menu item             |
| `.tl-header__user-menu-box`               | `<div>`      | User profile content box           |
| `.tl-header__user-menu-content`           | `<div>`      | User profile text content          |
| `.tl-header__user-menu-header`            | `<span>`     | User profile header text           |
| `.tl-header__user-menu-subheader`         | `<span>`     | User profile subheader text        |
| `.tl-header__middle-spacer`               | `<li>`       | Spacer element for layout          |
| `.tl-header__brand`                       | `<div>`      | Brand/logo container               |
| `.tl-header__title`                       | `<li>`       | Title container                    |
| `.tl-header__title-text`                  | `<h4>`       | Title text element                 |
| `.tl-icon`                                | `<span>`     | Icon element (optional)            |

## Modifiers

### Header Item Modifiers

Apply these classes to `.tl-header__item` elements.

| Modifier                     | Description                        |
| ---------------------------- | ---------------------------------- |
| `.tl-header__item--pressed`  | Pressed state for header item      |
| `.tl-header__item--selected` | Selected/active state              |

### Header Dropdown Wrapper Modifiers

Apply these classes to `.tl-header__dropdown-wrapper` elements.

| Modifier                               | Description                        |
| -------------------------------------- | ---------------------------------- |
| `.tl-header__dropdown-wrapper--open`   | Dropdown is open                   |
| `.tl-header__dropdown-wrapper--selected` | Selected dropdown state          |
| `.tl-header__dropdown-wrapper--pressed` | Pressed dropdown state            |

### Header Dropdown Icon Modifiers

Apply these classes to `.tl-header__dropdown-icon` elements.

| Modifier                                | Description                       |
| --------------------------------------- | --------------------------------- |
| `.tl-header__dropdown-icon--rotated`    | Rotated icon state (180deg)       |

### Header Dropdown Menu Modifiers

Apply these classes to `.tl-header__dropdown-menu` elements.

| Modifier                                      | Description                        |
| --------------------------------------------- | ---------------------------------- |
| `.tl-header__dropdown-menu--open`             | Menu is visible                    |

### Header Dropdown Menu Item Modifiers

Apply these classes to `.tl-header__dropdown-menu-item` elements.

| Modifier                                       | Description                       |
| ---------------------------------------------- | --------------------------------- |
| `.tl-header__dropdown-menu-item--selected`     | Selected menu item                |


## JavaScript Required

The Header component requires JavaScript to handle:

- Toggle dropdown menu visibility
- Update `aria-expanded` attribute on dropdown buttons
- Add/remove `--open` modifier on dropdown wrapper and menus
- Rotate dropdown icon (add/remove `--rotated` modifier)
- Mobile hamburger menu toggle
- Manage selected and pressed states
- Close dropdown when clicking outside
- Keyboard navigation for dropdowns

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*