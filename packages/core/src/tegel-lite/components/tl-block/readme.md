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

When nesting blocks, use the `--nested` and `--nested-inner` modifiers along with `--even` and `--odd` for alternating backgrounds:

```html
<div class="tl-block tl-block--primary">
  <section class="tl-block tl-block--even">
    <h2>Outer Block</h2>
    <p>Outer content.</p>
    
    <div class="tl-block tl-block--odd tl-block--nested">
      <aside>
        <h3>Middle Block</h3>
        <p>Nested content.</p>
        
        <div class="tl-block tl-block--even tl-block--nested-inner">
          <section>
            <h4>Inner Block</h4>
            <p>Deeply nested content.</p>
          </section>
        </div>
      </aside>
    </div>
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
| (none)                | Inherits background from parent (default)                      |
| `.tl-block--primary`  | Primary mode variant with layer 01 background                  |
| `.tl-block--secondary`| Secondary mode variant with layer 02 background                |

### Block Alternating Background Modifiers

Apply these classes to the `.tl-block` element for alternating backgrounds. The behavior depends on the parent mode:

| Modifier          | In Primary Parent                | In Secondary Parent              |
| ----------------- | -------------------------------- | -------------------------------- |
| `.tl-block--even` | Uses layer 01 background (even)  | Uses layer 02 background (odd)   |
| `.tl-block--odd`  | Uses layer 02 background (odd)   | Uses layer 01 background (even)  |

**Note:** Stripe modifiers only work when nested inside a block with `--primary` or `--secondary` modifier.

### Block Nesting Modifiers

Apply these classes to the `.tl-block` element for nested content. These modifiers adjust typography for nested blocks.

| Modifier                   | Description                      |
| -------------------------- | -------------------------------- |
| `.tl-block--nested`        | Styling for nested blocks        |
| `.tl-block--nested-inner`  | Styling for inner nested blocks  |

## Typography

The Block component automatically applies typography styles to heading and paragraph elements:

- `h2` elements receive `headline-02` styling
- `h3` elements inside `.tl-block--nested` receive `headline-04` styling
- `h4` elements inside `.tl-block--nested-inner` receive `headline-06` styling
- `p` elements receive `body-01` styling (or `detail-03` in nested blocks)

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
