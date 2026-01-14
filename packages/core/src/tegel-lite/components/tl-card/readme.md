# tl-card

The Card component is a container that groups related content and actions.

## Usage

```html
<div class="tl-card">
  <div class="tl-card__header">
    <div class="tl-card__headings">
      <span class="tl-card__title">Card Title</span>
      <span class="tl-card__subtitle">Card Subtitle</span>
    </div>
  </div>
  <div class="tl-card__body">
    <p class="tl-card__content">Card content goes here.</p>
  </div>
</div>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-card.css
@scania/tegel-lite/tl-button.css (when using expandable cards)
@scania/tegel-lite/tl-icon.css (when using icons)
```

## Elements

| Element                | HTML Element | Description                             |
| ---------------------- | ------------ | --------------------------------------- |
| `.tl-card`             | `<div>`      | Main card container                     |
| `.tl-card__header`     | `<div>`      | Card header section                     |
| `.tl-card__thumbnail`  | `<img>`      | Circular thumbnail image                |
| `.tl-card__headings`   | `<div>`      | Container for title and subtitle        |
| `.tl-card__title`      | `<span>`     | Card title text                         |
| `.tl-card__subtitle`   | `<span>`     | Card subtitle text                      |
| `.tl-card__image`      | `<img>`      | Full-width card image                   |
| `.tl-card__divider`    | `<div>`      | Horizontal divider line                 |
| `.tl-card__body`       | `<div>`      | Card body container                     |
| `.tl-card__content`    | `<p>`        | Card text content                       |
| `.tl-card__bottom-row` | `<div>`      | Bottom row container for actions        |
| `.tl-card__actions`    | `<div>`      | Container for action buttons            |
| `.tl-icon`             | `<span>`     | Icon element (optional)                 |

## Modifiers

### Card Mode Modifiers

Apply these classes to the `.tl-card` element.

| Modifier              | Description                        |
| --------------------- | ---------------------------------- |
| `.tl-card--primary`   | Primary mode variant               |
| `.tl-card--secondary` | Secondary mode variant             |

### Card State Modifiers

Apply these classes to the `.tl-card` element.

| Modifier                           | Description                                    |
| ---------------------------------- | ---------------------------------------------- |
| `.tl-card--clickable`              | Makes the entire card clickable                |
| `.tl-card--stretch`                | Card stretches to full height and width        |
| `.tl-card--expandable`             | Card can be expanded/collapsed                 |
| `.tl-card--expanded`               | Card is in expanded state                      |
| `.tl-card--image-above-header`     | Positions image above the header               |
| `.tl-card--image-below-header`     | Positions image below the header               |

## JavaScript Required

The Card component requires JavaScript to handle:
- Toggle `.tl-card--expanded` class for expandable cards
- Rotate chevron icon when expanding/collapsing (handled by CSS when class is toggled)

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
