# tl-accordion

The Accordion component allows users to show and hide sections of related content on a page.

## Usage

```html
<div class="tl-accordion">
  <div class="tl-accordion__item">
    <button class="tl-accordion__header-icon-end">
      <span class="tl-accordion__title">Accordion item</span>
    </button>
    <div class="tl-accordion__panel">
      This is the panel content.
    </div>
  </div>
</div>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-accordion.css
@scania/tegel-lite/tl-icon.css
```

## Elements

| Element                            | HTML Element | Description                                                           |
| ---------------------------------- | ------------ | --------------------------------------------------------------------- |
| `.tl-accordion`                    | `<div>`      | Container element for the accordion component                         |
| `.tl-accordion__item`              | `<div>`      | Individual accordion item wrapper                                     |
| `.tl-accordion__header-icon-end`   | `<button>`   | Button element for accordion header with icon positioned at the end   |
| `.tl-accordion__header-icon-start` | `<button>`   | Button element for accordion header with icon positioned at the start |
| `.tl-accordion__title`             | `<span>`     | Title text element inside the header                                  |
| `.tl-accordion__panel`             | `<div>`      | Content panel that expands/collapses                                  |

## Modifiers

### Accordion Modifiers

Apply these classes to the `.tl-accordion` container element.

| Modifier                             | Description                                                |
| ------------------------------------ | ---------------------------------------------------------- |
| `.tl-accordion--primary`             | Applies primary mode variant styling                       |
| `.tl-accordion--secondary`           | Applies secondary mode variant styling                     |
| `.tl-accordion--hide-last-border`    | Removes the bottom border from the last accordion item     |

### Accordion Item Modifiers

Apply these classes to `.tl-accordion__item` elements.

| Modifier                             | Description                                                |
| ------------------------------------ | ---------------------------------------------------------- |
| `.tl-accordion__item--expanded`      | Indicates the accordion item is expanded                   |
| `.tl-accordion__item--disabled`      | Disables the accordion item                                |
| `.tl-accordion__item--icon-start`    | Positions the expand icon at the start of the header       |
| `.tl-accordion__item--icon-end`      | Positions the expand icon at the end of the header         |
| `.tl-accordion__item--less-padding`  | Reduces right padding inside the panel                     |

## JavaScript Required

The Accordion component requires JavaScript to handle:
- Toggle `.tl-accordion__item--expanded` class on accordion items
- Update `aria-expanded` attribute on header buttons
- Handle click events on `.tl-accordion__header-icon-start` and `.tl-accordion__header-icon-end` buttons
- Prevent interaction with disabled items (`.tl-accordion__item--disabled`)
- Keyboard support (Enter and Space keys)
- Optional: Single-open behavior (close other items when opening one)

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
