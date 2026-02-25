# tl-icon

The Icon component displays SVG icons using mask images with customizable sizes and inherits color from parent.

## Usage

```html
<span class="tl-icon tl-icon--check"></span>
<span class="tl-icon tl-icon--close tl-icon--24"></span>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-icon.css
```

## Elements

| Element    | HTML Element | Description                       |
| ---------- | ------------ | --------------------------------- |
| `.tl-icon` | `<span>`     | Icon element                      |

## Modifiers

### Icon Variant Modifiers

Apply these classes to the `.tl-icon` element to select an icon. The available icons depend on the Tegel icon set. Common examples include:

| Modifier             | Description                  |
| -------------------- | ---------------------------- |
| `.tl-icon--{icon_name}` | Icon from Tegel icon set  |

**Examples:** `.tl-icon--check`, `.tl-icon--close`, `.tl-icon--info`, `.tl-icon--error`, `.tl-icon--burger`, `.tl-icon--bento`, `.tl-icon--tick`, `.tl-icon--cross`, `.tl-icon--chevron_down`

**Note:** See the [full icon list in Storybook](http://localhost:6006/?path=/story/foundations-icons-gallery--default).

### Icon Size Modifiers

Apply these classes to the `.tl-icon` element to change size. Default size is 20px.

| Modifier          | Description              |
| ----------------- | ------------------------ |
| `.tl-icon--{size}` | {size}px × {size}px (12-96, even numbers) |

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*