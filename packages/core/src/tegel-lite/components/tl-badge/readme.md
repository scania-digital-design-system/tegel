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
| `.tl-badge__text` | `<span>`     | Text content inside the badge. Use `aria-hidden="true"` when the badge is decorative  |

## Modifiers

### Badge Modifiers

Apply these classes to the `.tl-badge` element.

| Modifier           | Description                                    |
| ------------------ | ---------------------------------------------- |
| `.tl-badge--sm`    | Small badge (8x8px) without text. Used as a dot indicator |
| `.tl-badge--lg`    | Large badge (20x20px) with text. Default size  |
| `.tl-badge--pill`  | Pill-shaped badge for multi-digit numbers (2+ digits). Automatically adjusts width |
| `.tl-badge--hidden`| Hides the badge                                |

## Usage Notes

- For values of 100 or more, use `99+` as the displayed text with `.tl-badge--pill` modifier
- Small badges (`.tl-badge--sm`) should not contain text - they are used as dot indicators only
- When using badges for notification counts, ensure the actual count is communicated to screen readers via `aria-label` on the parent element
- Position badges using `position: absolute` on the badge and `position: relative` on the parent container

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
