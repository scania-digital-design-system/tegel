# tl-footer

The Footer component provides a consistent footer structure with top section, main content, and branding.

## Usage

```html
<footer class="tl-footer">
  <div class="tl-footer__top">
    <div class="tl-footer__group">
      <!-- Footer items for top section -->
    </div>
  </div>
  <div class="tl-footer__main">
    <div class="tl-footer__main-top">
      <div class="tl-footer__main-top--start">
        <div class="tl-footer__group">
          <!-- Footer items for main top start -->
        </div>
      </div>
      <div class="tl-footer__main-top--end">
        <div class="tl-footer__group">
          <!-- Footer items for main top end -->
        </div>
      </div>
    </div>
    <div class="tl-footer__main-bottom">
      <small class="tl-footer__copyright">© Copyright text</small>
      <div class="tl-footer__brand">
        <p>Brand</p>
      </div>
    </div>
  </div>
</footer>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-footer.css
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
| `.tl-footer__group`            | `<div>`      | Group container for footer items   |
| `.tl-footer__copyright`        | `<small>`    | Copyright text                     |
| `.tl-footer__brand`            | `<div>`      | Brand logo display                 |

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
| `.tl-footer__group--mobile-view` | Display group only in mobile view         |

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
