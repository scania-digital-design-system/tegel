# tl-divider

The Divider component creates a visual separator between content sections.

## Usage

```html
<div class="tl-divider tl-divider--discrete tl-divider--horizontal"></div>
```

**Note:** Both an orientation modifier (horizontal/vertical) and a variant modifier (discrete/expressive) should be applied.

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-divider.css
```

## Elements

| Element       | HTML Element | Description             |
| ------------- | ------------ | ----------------------- |
| `.tl-divider` | `<div>`      | Main divider element    |

## Modifiers

### Divider Modifiers

Apply these classes to the `.tl-divider` element.

**Orientation Modifiers (Required):**

**Orientation Modifiers (Required):**

| Modifier                  | Description                     |
| ------------------------- | ------------------------------- |
| `.tl-divider--horizontal` | Horizontal divider (full width, 1px height) |
| `.tl-divider--vertical`   | Vertical divider (full height, 1px width)  |

**Variant Modifiers:**

| Modifier                  | Description                     |
| ------------------------- | ------------------------------- |
| `.tl-divider--discrete`   | Subtle divider using discrete border color (default) |
| `.tl-divider--expressive` | Prominent divider using strong border color |

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
