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
      <div class="tl-banner__header">Banner header</div>
      <div class="tl-banner__subheader">Banner subheader text</div>
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
| `.tl-banner__header`    | `<div>`      | Banner header text (required)              |
| `.tl-banner__subheader` | `<div>`      | Banner subheader text (optional)           |
| `.tl-banner__actions`   | `<div>`      | Container for action buttons or links (optional) |
| `.tl-banner__close`     | `<div>`      | Close button container (optional)          |

## Modifiers

### Banner Variant Modifiers

Apply these classes to the `.tl-banner` element to change the banner's appearance.

| Modifier                  | Description                                        |
| ------------------------- | -------------------------------------------------- |
| (none)                    | Default variant with standard background           |
| `.tl-banner--error`       | Error variant with danger background and icon      |
| `.tl-banner--information` | Information variant with info background and icon  |

## JavaScript Required

The Banner component requires JavaScript to handle:
- Close button functionality (remove or hide banner when `.tl-banner__close` is clicked)
- Keyboard accessibility for close button
- Optional: Animation when closing banner

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
