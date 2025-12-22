# tl-stepper

The Stepper component displays progress through a multi-step process with visual indicators.

## Usage

```html
<div class="tl-stepper">
  <ul class="tl-stepper__list">
    <li class="tl-stepper__item tl-stepper__item--completed">
      <div class="tl-stepper__step">1</div>
      <span class="tl-stepper__label">Step 1</span>
    </li>
    <li class="tl-stepper__item tl-stepper__item--current">
      <div class="tl-stepper__step">2</div>
      <span class="tl-stepper__label">Step 2</span>
    </li>
    <li class="tl-stepper__item">
      <div class="tl-stepper__step">3</div>
      <span class="tl-stepper__label">Step 3</span>
    </li>
  </ul>
</div>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-stepper.css
```

## Elements

| Element              | HTML Element | Description                  |
| -------------------- | ------------ | ---------------------------- |
| `.tl-stepper`        | `<div>`      | Main stepper container       |
| `.tl-stepper__list`  | `<ul>`       | List of steps                |
| `.tl-stepper__item`  | `<li>`       | Individual step item         |
| `.tl-stepper__step`  | `<div>`      | Step number/indicator        |
| `.tl-stepper__label` | `<span>`     | Step label text              |

## Modifiers

### Stepper Layout Modifiers

Apply these classes to the `.tl-stepper` element.

| Modifier                     | Description                           |
| ---------------------------- | ------------------------------------- |
| `.tl-stepper--horizontal`    | Horizontal orientation (default)      |
| `.tl-stepper--vertical`      | Vertical orientation                  |
| `.tl-stepper--label-aside`   | Position labels beside indicators     |
| `.tl-stepper--hide-labels`   | Hide step labels                      |

### Stepper Size Modifiers

Apply these classes to the `.tl-stepper` element.

| Modifier            | Description                    |
| ------------------- | ------------------------------ |
| `.tl-stepper--sm`   | Small size variant             |

### Stepper Item State Modifiers

Apply these classes to `.tl-stepper__item` elements.

| Modifier                       | Description                     |
| ------------------------------ | ------------------------------- |
| `.tl-stepper__item--completed` | Completed step state            |
| `.tl-stepper__item--current`   | Current/active step state       |

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
