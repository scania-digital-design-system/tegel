# tl-badge

The Badge component is used to display small numerical indicators or status markers.

## Usage

```html
<span class="tl-badge tl-badge--lg">
  <span class="tl-badge__text">1</span>
</span>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-badge.css
```

## Elements

| Element           | HTML Element | Description                    |
| ----------------- | ------------ | ------------------------------ |
| `.tl-badge`       | `<span>`     | Main badge container           |
| `.tl-badge__text` | `<span>`     | Text content inside the badge. Should not be used in size small |

## Modifiers

### Badge Modifiers

Apply these classes to the `.tl-badge` element.

| Modifier           | Description                                    |
| ------------------ | ---------------------------------------------- |
| `.tl-badge--sm`    | Small badge (8x8px) without text. Used as a dot indicator and should not contain text |
| `.tl-badge--lg`    | Circular large badge (20x20px) for one digit. |
| `.tl-badge--pill`  | Pill-shaped large badge for multi-digit numbers (2+ digits). Automatically adjusts width |
| `.tl-badge--hidden`| Hides the badge                                |

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
