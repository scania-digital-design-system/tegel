# tl-stepper

The Stepper component displays progress through a multi-step process with visual indicators.

## Usage

```html
<div class="tl-stepper tl-stepper--horizontal">
  <ol class="tl-stepper__list">
    <li class="tl-stepper__step">
      <div class="tl-stepper__content tl-stepper__content--lg tl-stepper__content--horizontal tl-stepper__content--text-below">
        <div class="tl-stepper__node tl-stepper__node--success">
          <span class="tl-icon tl-icon--tick tl-icon--20"></span>
        </div>
        <div class="tl-stepper__label tl-stepper__label--lg">Step 1</div>
      </div>
    </li>
    <li class="tl-stepper__step">
      <div class="tl-stepper__content tl-stepper__content--lg tl-stepper__content--horizontal tl-stepper__content--text-below">
        <div class="tl-stepper__node tl-stepper__node--current">2</div>
        <div class="tl-stepper__label tl-stepper__label--lg">Step 2</div>
      </div>
    </li>
    <li class="tl-stepper__step">
      <div class="tl-stepper__content tl-stepper__content--lg tl-stepper__content--horizontal tl-stepper__content--text-below">
        <div class="tl-stepper__node tl-stepper__node--upcoming">3</div>
        <div class="tl-stepper__label tl-stepper__label--lg tl-stepper__label--upcoming">Step 3</div>
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

### Stepper Content Modifiers

Apply these classes to `.tl-stepper__content` elements.

| Modifier                              | Description                           |
| ------------------------------------- | ------------------------------------- |
| `.tl-stepper__content--lg`            | Large content size                    |
| `.tl-stepper__content--sm`            | Small content size                    |
| `.tl-stepper__content--horizontal`    | Horizontal layout                     |
| `.tl-stepper__content--vertical`      | Vertical layout                       |
| `.tl-stepper__content--text-below`    | Text positioned below                 |
| `.tl-stepper__content--text-aside`    | Text positioned aside                 |
| `.tl-stepper__content--hide-labels`   | Hide labels (accessibility)           |

### Stepper Node State Modifiers

Apply these classes to `.tl-stepper__node` elements.

| Modifier                       | Description                     |
| ------------------------------ | ------------------------------- |
| `.tl-stepper__node--success`   | Success/completed step state    |
| `.tl-stepper__node--error`     | Error step state                |
| `.tl-stepper__node--current`   | Current/active step state       |
| `.tl-stepper__node--upcoming`  | Upcoming/inactive step state    |

### Stepper Label Modifiers

Apply these classes to `.tl-stepper__label` elements.

| Modifier                        | Description                     |
| ------------------------------- | ------------------------------- |
| `.tl-stepper__label--lg`        | Large label size                |
| `.tl-stepper__label--sm`        | Small label size                |
| `.tl-stepper__label--upcoming`  | Upcoming step label styling     |

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
