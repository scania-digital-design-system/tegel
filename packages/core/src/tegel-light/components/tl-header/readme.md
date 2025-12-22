# tl-header

The Header component provides a consistent navigation header with items, dropdowns, and branding.

## Usage

```html
<header class="tl-header">
  <nav class="tl-header__nav">
    <ul class="tl-header__list">
      <li class="tl-header__item">
        <a href="#" class="tl-header__item-link">
          <span class="tl-header__item-text">Item</span>
        </a>
      </li>
      <li class="tl-header__middle-spacer"></li>
      <li class="tl-header__dropdown">
        <button class="tl-header__dropdown-button">
          Dropdown
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
```

## JavaScript Required

The Header component requires JavaScript to handle:
- Dropdown menu toggle functionality
- Mobile navigation (hamburger menu)
- Active/selected state management
- Keyboard navigation

## Elements

| Element                         | HTML Element | Description                        |
| ------------------------------- | ------------ | ---------------------------------- |
| `.tl-header`                    | `<header>`   | Main header container              |
| `.tl-header__nav`               | `<nav>`      | Navigation wrapper                 |
| `.tl-header__list`              | `<ul>`       | List container for header items    |
| `.tl-header__item`              | `<li>`       | Individual header item             |
| `.tl-header__item-link`         | `<a>`        | Link element for header item       |
| `.tl-header__item-text`         | `<span>`     | Text content for header item       |
| `.tl-header__dropdown`          | `<li>`       | Dropdown menu container            |
| `.tl-header__dropdown-button`   | `<button>`   | Button trigger for dropdown        |
| `.tl-header__middle-spacer`     | `<li>`       | Spacer element for layout          |
| `.tl-header__brand`             | `<div>`      | Brand/logo container               |
| `.tl-header__title`             | `<div>`      | Title container                    |

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
