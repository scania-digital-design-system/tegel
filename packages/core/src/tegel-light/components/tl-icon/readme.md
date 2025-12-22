# tl-icon

The Icon component displays SVG icons using mask images with customizable sizes.

## Usage

```html
<i class="tl-icon tl-icon--check"></i>
<i class="tl-icon tl-icon--close tl-icon--24"></i>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-icon.css
```

## Elements

| Element    | HTML Element | Description          |
| ---------- | ------------ | -------------------- |
| `.tl-icon` | `<i>`/`<span>` | Icon element       |

## Modifiers

### Icon Variant Modifiers

Apply these classes to the `.tl-icon` element to select an icon. The available icons depend on the Tegel icon set. Common examples include:

| Modifier             | Description                  |
| -------------------- | ---------------------------- |
| `.tl-icon--check`    | Checkmark icon               |
| `.tl-icon--close`    | Close/X icon                 |
| `.tl-icon--info`     | Information icon             |
| `.tl-icon--error`    | Error icon                   |
| `.tl-icon--burger`   | Hamburger menu icon          |
| `.tl-icon--bento`    | Bento/grid menu icon         |
| `.tl-icon--tick`     | Tick mark icon               |
| `.tl-icon--cross`    | Cross icon                   |
| `.tl-icon--chevron_down` | Chevron down icon        |

**Note:** See the full icon list in the Tegel design system documentation.

### Icon Size Modifiers

Apply these classes to the `.tl-icon` element to change size. Default size is 20px.

| Modifier          | Description              |
| ----------------- | ------------------------ |
| `.tl-icon--16`    | 16px × 16px              |
| `.tl-icon--20`    | 20px × 20px (default)    |
| `.tl-icon--24`    | 24px × 24px              |
| `.tl-icon--32`    | 32px × 32px              |

**Note:** Additional size modifiers may be available. Check icon-sizes configuration.

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
