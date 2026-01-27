# tl-footer

The Footer component provides a consistent footer structure with top section, main content, and branding.

## Usage

```html
<footer class="tl-footer">
  <div class="tl-footer__top">
    <div class="tl-footer__group" role="list">
      <button class="tl-footer__top-title" type="button">Title 1</button>
      <a href="#" class="tl-footer__link">Link text</a>
      <a href="#" class="tl-footer__link">Link text</a>
      <a href="#" class="tl-footer__link">Link text</a>
    </div>
    <div class="tl-footer__group" role="list">
      <button class="tl-footer__top-title" type="button">Title 2</button>
      <a href="#" class="tl-footer__link">Link text</a>
      <a href="#" class="tl-footer__link">Link text</a>
    </div>
  </div>
  <div class="tl-footer__main">
    <div class="tl-footer__main-top">
      <div class="tl-footer__main-top--start">
        <div class="tl-footer__group" role="list">
          <a href="#" class="tl-footer__link">Link text</a>
          <a href="#" class="tl-footer__link">Link text</a>
        </div>
      </div>
      <div class="tl-footer__main-top--end">
        <div class="tl-footer__group" role="list">
          <a href="#" class="tl-footer__link">
            <span class="tl-icon tl-icon--truck tl-icon--16"></span>
          </a>
        </div>
      </div>
    </div>
    <div class="tl-footer__main-bottom">
      <small class="tl-footer__copyright">© Copyright 2026 All rights reserved.</small>
      <p class="tl-footer__brand">Scania</p>
    </div>
  </div>
</footer>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-footer.css
@scania/tegel-lite/tl-icon.css 
```

## Elements

| Element                        | HTML Element | Description                        |
| ------------------------------ | ------------ | ---------------------------------- |
| `.tl-footer`                   | `<footer>`   | Main footer container              |
| `.tl-footer__top`              | `<div>`      | Top section of footer              |
| `.tl-footer__main`             | `<div>`      | Main footer section                |
| `.tl-footer__main-top`         | `<div>`      | Top part of main section           |
| `.tl-footer__main-top--start`  | `<div>`      | Start (left) area in main top      |
| `.tl-footer__main-top--end`    | `<div>`      | End (right) area in main top       |
| `.tl-footer__main-bottom`      | `<div>`      | Bottom part of main section        |
| `.tl-footer__group`            | `<div>`      | Group container for footer links   |
| `.tl-footer__top-title`        | `<button>`   | Title button for footer top groups |
| `.tl-footer__link`             | `<a>`        | Footer link                        |
| `.tl-footer__copyright`        | `<small>`    | Copyright text                     |
| `.tl-footer__brand`            | `<p>`        | Brand logo display                 |
| `.tl-icon`                     | `<span>`     | Icon element (optional)            |

## Modifiers

### Footer Mode Modifiers

Apply these classes to the `.tl-footer` element.

| Modifier                | Description                        |
| ----------------------- | ---------------------------------- |
| `.tl-footer--primary`   | Primary mode variant               |
| `.tl-footer--secondary` | Secondary mode variant             |

### Footer Group Modifiers

Apply these classes to `.tl-footer__group` elements.

| Modifier                         | Description                               |
| -------------------------------- | ----------------------------------------- |
| `.tl-footer__group--expanded`    | Expanded state for mobile accordion       |

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
