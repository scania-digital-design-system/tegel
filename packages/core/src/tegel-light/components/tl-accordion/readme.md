# tl-accordion# tl-accordion



The Accordion component allows users to expand and collapse sections of content.The Accordion component allows users to show and hide sections of related content on a page.



## Usage## Usage



```html```html

<div class="tl-accordion"><div class="tl-accordion">

  <div class="tl-accordion__item">  <div class="tl-accordion__item">

    <button class="tl-accordion__header" aria-expanded="false">    <button class="tl-accordion__header-icon-end">

      <span class="tl-accordion__header-text">Accordion Item 1</span>      <span class="tl-accordion__title">Accordion item</span>

      <span class="tl-accordion__header-icon-end">      <span class="tl-accordion__icon">

        <i class="tl-icon tl-icon--chevron_down"></i>        <span class="tl-icon tl-icon--chevron_down tl-icon--16" aria-hidden="true"></span>

      </span>      </span>

    </button>    </button>

    <div class="tl-accordion__panel">    <div class="tl-accordion__panel">

      <p>Accordion content goes here.</p>      This is the panel content.

    </div>    </div>

  </div>  </div>

</div></div>

``````



<br /><br />



### Required Stylesheets### Required Stylesheets



``````

@scania/tegel-lite/global.css@scania/tegel-lite/global.css

@scania/tegel-lite/tl-accordion.css@scania/tegel-lite/tl-accordion.css

```@scania/tegel-lite/tl-icon.css

```

## JavaScript Required

## Elements

The Accordion component requires JavaScript to handle:

- Expand/collapse functionality (toggle `aria-expanded` attribute)| Element                            | HTML Element | Description                                                           |

- Panel show/hide| ---------------------------------- | ------------ | --------------------------------------------------------------------- |

- Keyboard navigation (Space, Enter, Arrow keys)| `.tl-accordion`                    | `<div>`      | Container element for the accordion component                         |

- Single vs multi-expand behavior| `.tl-accordion__item`              | `<div>`      | Individual accordion item wrapper                                     |

| `.tl-accordion__header-icon-end`   | `<button>`   | Button element for accordion header with icon positioned at the end   |

## Elements| `.tl-accordion__header-icon-start` | `<button>`   | Button element for accordion header with icon positioned at the start |

| `.tl-accordion__title`             | `<span>`     | Title text element inside the header                                  |

| Element                          | HTML Element | Description                        || `.tl-accordion__icon`              | `<span>`     | Container for the chevron icon                                        |

| -------------------------------- | ------------ | ---------------------------------- || `.tl-accordion__panel`             | `<div>`      | Content panel that expands/collapses                                  |

| `.tl-accordion`                  | `<div>`      | Main accordion container           |

| `.tl-accordion__item`            | `<div>`      | Individual accordion item          |## Modifiers

| `.tl-accordion__header`          | `<button>`   | Clickable header/trigger           |

| `.tl-accordion__header-text`     | `<span>`     | Header text content                |### Accordion Modifiers

| `.tl-accordion__header-icon-start` | `<span>`   | Icon at start of header            |

| `.tl-accordion__header-icon-end` | `<span>`     | Icon at end of header              |Apply these classes to the `.tl-accordion` container element.

| `.tl-accordion__panel`           | `<div>`      | Expandable content panel           |

| Modifier                             | Description                                                |

## Modifiers| ------------------------------------ | ---------------------------------------------------------- |

| `.tl-accordion--primary`             | Applies primary mode variant styling                       |

### Accordion Mode Modifiers| `.tl-accordion--secondary`           | Applies secondary mode variant styling                     |

| `.tl-accordion--hide-last-border`    | Removes the bottom border from the last accordion item     |

Apply these classes to the `.tl-accordion` element.

### Accordion Item Modifiers

| Modifier                   | Description                        |

| -------------------------- | ---------------------------------- |Apply these classes to `.tl-accordion__item` elements.

| `.tl-accordion--primary`   | Primary mode variant               |

| `.tl-accordion--secondary` | Secondary mode variant             || Modifier                             | Description                                                |

| ------------------------------------ | ---------------------------------------------------------- |

### Accordion Layout Modifiers| `.tl-accordion__item--expanded`      | Indicates the accordion item is expanded                   |

| `.tl-accordion__item--disabled`      | Disables the accordion item                                |

Apply these classes to the `.tl-accordion` element.| `.tl-accordion__item--icon-start`    | Positions the expand icon at the start of the header       |

| `.tl-accordion__item--icon-end`      | Positions the expand icon at the end of the header         |

| Modifier                          | Description                          |

| --------------------------------- | ------------------------------------ |### Accordion Panel Modifiers

| `.tl-accordion--hide-last-border` | Hides border on last accordion item  |

Apply these classes to `.tl-accordion__panel` elements.

----------------------------------------------

| Modifier                             | Description                                                |

*Part of Tegel Lite (CSS) Design System*| ------------------------------------ | ---------------------------------------------------------- |

| `.tl-accordion__panel--less-padding` | Reduces right padding inside the panel                     |

## JavaScript Required

This is a CSS-only component. JavaScript is required to toggle the `.tl-accordion__item--expanded` class and manage the accordion behavior.

Example:
```javascript
const accordionButtons = document.querySelectorAll('.tl-accordion__header-icon-start, .tl-accordion__header-icon-end');

accordionButtons.forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.tl-accordion__item');
    
    if (item.classList.contains('tl-accordion__item--disabled')) return;
    
    item.classList.toggle('tl-accordion__item--expanded');
  });
});
```

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
