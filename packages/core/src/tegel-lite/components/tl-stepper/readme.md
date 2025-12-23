# tl-stepper

The Stepper component displays progress through a multi-step process with visual indicators.

## Usage

```html
<div class="tl-stepper tl-stepper--horizontal tl-stepper--lg">
  <ol class="tl-stepper__list">
    <li class="tl-stepper__step tl-stepper__step--success">
      <div class="tl-stepper__content">
        <div class="tl-stepper__node">
          <span class="tl-icon tl-icon--tick tl-icon--20"></span>
        </div>
        <div class="tl-stepper__label">Step 1</div>
      </div>
    </li>
    <li class="tl-stepper__step tl-stepper__step--current">
      <div class="tl-stepper__content">
        <div class="tl-stepper__node">2</div>
        <div class="tl-stepper__label">Step 2</div>
      </div>
    </li>
    <li class="tl-stepper__step tl-stepper__step--upcoming">
      <div class="tl-stepper__content">
        <div class="tl-stepper__node">3</div>
        <div class="tl-stepper__label">Step 3</div>
      </div>
    </li>
  </ol>
</div>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-stepper.css
@scania/tegel-lite/tl-icon.css
```

## Elements

| Element                 | HTML Element | Description                  |
| ----------------------- | ------------ | ---------------------------- |
| `.tl-stepper`           | `<div>`      | Main stepper container       |
| `.tl-stepper__list`     | `<ol>`       | List of steps                |
| `.tl-stepper__step`     | `<li>`       | Individual step wrapper      |
| `.tl-stepper__content`  | `<div>`      | Step content container       |
| `.tl-stepper__node`     | `<div>`      | Step number/icon indicator   |
| `.tl-stepper__label`    | `<div>`      | Step label text              |
| `.tl-icon`              | `<span>`     | Icon element (optional)      |

## Modifiers

### Stepper Layout Modifiers

Apply these classes to the `.tl-stepper` element.

| Modifier                     | Description                           |
| ---------------------------- | ------------------------------------- |
| `.tl-stepper--horizontal`    | Horizontal orientation (default)      |
| `.tl-stepper--vertical`      | Vertical orientation                  |
| `.tl-stepper--label-aside`   | Position labels beside indicators     |
| `.tl-stepper--label-below`   | Position labels below indicators      |
| `.tl-stepper--hide-labels`   | Hide step labels                      |

### Stepper Size Modifiers

Apply these classes to the `.tl-stepper` element.

| Modifier            | Description                    |
| ------------------- | ------------------------------ |
| `.tl-stepper--sm`   | Small size variant             |
| `.tl-stepper--lg`   | Large size variant             |

### Stepper Step State Modifiers

Apply these classes to `.tl-stepper__step` elements.

| Modifier                       | Description                     |
| ------------------------------ | ------------------------------- |
| `.tl-stepper__step--success`   | Success/completed step state    |
| `.tl-stepper__step--error`     | Error step state                |
| `.tl-stepper__step--current`   | Current/active step state       |
| `.tl-stepper__step--upcoming`  | Upcoming/inactive step state    |

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
