# tl-block

The Block component provides a container with background styling for content sections.

## Usage

```html
<div class="tl-block tl-block--primary">
  <h2>Block Title</h2>
  <p>Block content goes here.</p>
</div>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-block.css
```

## Elements

| Element     | HTML Element | Description          |
| ----------- | ------------ | -------------------- |
| `.tl-block` | Any container element (`<div>`, `<section>`, `<article>`, etc.) | Main block container |

## Modifiers

### Block Mode Modifiers

Apply these classes to the `.tl-block` element.

| Modifier              | Description                        |
| --------------------- | ---------------------------------- |
| `.tl-block--primary`  | Primary mode variant               |
| `.tl-block--secondary`| Secondary mode variant             |

### Block Stripe Modifiers

Apply these classes to the `.tl-block` element for alternating backgrounds.

| Modifier          | Description                                  |
| ----------------- | -------------------------------------------- |
| `.tl-block--even` | Even stripe styling (for alternating blocks) |
| `.tl-block--odd`  | Odd stripe styling (for alternating blocks)  |

### Block Nesting Modifiers

Apply these classes to the `.tl-block` element for nested content.

| Modifier                   | Description                      |
| -------------------------- | -------------------------------- |
| `.tl-block--nested`        | Styling for nested blocks        |
| `.tl-block--nested-inner`  | Styling for inner nested blocks  |

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
