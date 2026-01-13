# tl-block

The Block component provides a container with background styling for content sections.

## Usage

### Basic Usage

```html
<div class="tl-block tl-block--primary">
  <section>
    <h2>Block Title</h2>
    <p>Block content goes here.</p>
  </section>
</div>
```

### Nested Blocks

Blocks automatically adjust their backgrounds and typography when nested. No additional modifiers needed:

```html
<div class="tl-block tl-block--primary">
  <h2>Outer Block</h2>
  <p>Outer content.</p>
  
  <section class="tl-block">
    <h3>Middle Block</h3>
    <p>Nested content.</p>
    
    <article class="tl-block">
      <h4>Inner Block</h4>
      <p>Deeply nested content.</p>
    </article>
  </section>
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

Apply these classes to the `.tl-block` element to set the mode variant.

| Modifier              | Description                                                    |
| --------------------- | -------------------------------------------------------------- |
| No modifier           | Inherits background from parent (default)                      |
| `.tl-block--primary`  | Primary mode variant with layer 01 background. Nested child blocks automatically alternate between layer 02 and layer 01 backgrounds. |
| `.tl-block--secondary`| Secondary mode variant with layer 02 background. Nested child blocks automatically alternate between layer 01 and layer 02 backgrounds. |

## Typography

The Block component automatically applies typography styles to heading and paragraph elements based on nesting level:

- **Top level**: `h2` receives `headline-02` styling, `p` receives `body-01`
- **First nested level**: `h3` receives `headline-04` styling, `p` receives `detail-03`
- **Second nested level**: `h4` receives `headline-06` styling, `p` receives `detail-03`

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
