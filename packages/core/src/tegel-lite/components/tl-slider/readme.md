# tl-slider

The Slider component provides an interactive range input control with optional value display and increment buttons.

## Usage

```html
<div class="tl-slider">
  <label class="tl-slider__label">Volume</label>
  <div class="tl-slider__track-wrapper">
    <div class="tl-slider__track">
      <div class="tl-slider__track-fill" style="width: 50%;"></div>
      <div class="tl-slider__thumb" style="left: 50%;">
        <div class="tl-slider__thumb-inner">
          <div class="tl-slider__value-tooltip">50</div>
        </div>
      </div>
    </div>
    <span class="tl-slider__value">50</span>
  </div>
  <input type="range" class="tl-slider__native-input" min="0" max="100" value="50">
</div>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-slider.css
```

## Elements

| Element                          | HTML Element | Description                        |
| -------------------------------- | ------------ | ---------------------------------- |
| `.tl-slider`                     | `<div>`      | Main container                     |
| `.tl-slider__label`              | `<label>`    | Label for the slider               |
| `.tl-slider__track-wrapper`      | `<div>`      | Track and controls wrapper         |
| `.tl-slider__track`              | `<div>`      | Track background                   |
| `.tl-slider__track-fill`         | `<div>`      | Filled portion of track            |
| `.tl-slider__thumb`              | `<div>`      | Thumb container                    |
| `.tl-slider__thumb-inner`        | `<div>`      | Thumb visual element               |
| `.tl-slider__value`              | `<span>`     | Value display                      |
| `.tl-slider__value-tooltip`      | `<div>`      | Tooltip on hover                   |
| `.tl-slider__control-minus`      | `<button>`   | Decrement button                   |
| `.tl-slider__control-plus`       | `<button>`   | Increment button                   |
| `.tl-slider__input-wrapper`      | `<div>`      | Input field wrapper                |
| `.tl-slider__input-field`        | `<input>`    | Number input field                 |
| `.tl-slider__value-dividers`     | `<div>`      | Container for divider marks        |
| `.tl-slider__value-divider`      | `<div>`      | Individual divider mark            |
| `.tl-slider__value-divider-line` | `<div>`      | Divider line visual                |
| `.tl-slider__value-divider-label`| `<span>`     | Divider label text                 |
| `.tl-slider__native-input`       | `<input>`    | Hidden native range input          |

## Modifiers

### Slider State Modifiers

Apply these classes to the `.tl-slider` element.

| Modifier               | Description                    |
| ---------------------- | ------------------------------ |
| `.tl-slider--small`    | Small size variant             |

**Note:** Use the native `disabled` and `readonly` attributes on the `<input type="range">` element for disabled and read-only states. The component will automatically style these states.

### Slider Input Field Modifiers

Apply these classes to the `.tl-slider__input-field` element.

| Modifier                         | Description                  |
| -------------------------------- | ---------------------------- |
| `.tl-slider__input-field--decimal` | Decimal value input        |

### Slider Thumb State Modifiers

Apply these classes to the `.tl-slider__thumb-inner` element.

| Modifier                           | Description                |
| ---------------------------------- | -------------------------- |
| `.tl-slider__thumb-inner--pressed` | Pressed/dragging state     |

## JavaScript Required

The Slider component requires JavaScript to handle:
- Slider thumb dragging and positioning
- Value updates and synchronization
- Track fill width updates
- Tooltip display
- Increment/decrement button functionality
- Input field synchronization
- Keyboard navigation (Arrow keys)

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
