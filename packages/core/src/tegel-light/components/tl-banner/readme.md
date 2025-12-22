# tl-banner

The Banner component displays important messages or notifications at the top of a page or section.

## Usage

```html
<div class="tl-banner">
  <span class="tl-banner__icon">
    <span class="tl-icon tl-icon--info tl-icon--20" aria-hidden="true"></span>
  </span>
  <div class="tl-banner__content">
    <div class="tl-banner__text">
      <h6 class="tl-banner__header">Banner header</h6>
      <span class="tl-banner__subheader">Banner subheader text</span>
    </div>
    <div class="tl-banner__actions">
      <!-- Action buttons or links -->
    </div>
  </div>
  <div class="tl-banner__close">
    <span class="tl-icon tl-icon--cross tl-icon--20" aria-hidden="true"></span>
  </div>
</div>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-banner.css
@scania/tegel-lite/tl-icon.css
```

## Elements

| Element                 | HTML Element | Description                                |
| ----------------------- | ------------ | ------------------------------------------ |
| `.tl-banner`            | `<div>`      | Main banner container                      |
| `.tl-banner__icon`      | `<span>`     | Container for the prefix icon              |
| `.tl-banner__content`   | `<div>`      | Main content area                          |
| `.tl-banner__text`      | `<div>`      | Text content wrapper                       |
| `.tl-banner__header`    | `<h6>`       | Banner header text                         |
| `.tl-banner__subheader` | `<span>`     | Banner subheader text                      |
| `.tl-banner__actions`   | `<div>`      | Container for action buttons or links      |
| `.tl-banner__close`     | `<div>`      | Close button container                     |

## Modifiers

### Banner Variant Modifiers

Apply these classes to the `.tl-banner` element.

| Modifier                  | Description                              |
| ------------------------- | ---------------------------------------- |
| `.tl-banner--error`       | Error variant with error styling         |
| `.tl-banner--information` | Information variant with info styling    |

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
