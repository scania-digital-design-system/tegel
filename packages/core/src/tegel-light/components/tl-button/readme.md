# tl-button

The Button component triggers actions or navigates users to different pages.

## Usage

```html
<button class="tl-button tl-button--primary tl-button--md">
  Button text
</button>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-button.css
```

## Elements

| Element      | HTML Element | Description               |
| ------------ | ------------ | ------------------------- |
| `.tl-button` | `<button>`/`<a>` | Main button element   |

## Modifiers

### Button Variant Modifiers

Apply these classes to the `.tl-button` element.

| Modifier               | Description                              |
| ---------------------- | ---------------------------------------- |
| `.tl-button--primary`  | Primary button variant                   |
| `.tl-button--secondary`| Secondary button variant                 |
| `.tl-button--ghost`    | Ghost button variant (transparent)       |
| `.tl-button--danger`   | Danger button variant for destructive actions |

### Button Size Modifiers

Apply these classes to the `.tl-button` element.

| Modifier           | Description                    |
| ------------------ | ------------------------------ |
| `.tl-button--xs`   | Extra small button (24px)      |
| `.tl-button--sm`   | Small button (40px)            |
| `.tl-button--md`   | Medium button (48px)           |
| `.tl-button--lg`   | Large button (56px)            |

### Button Icon Modifiers

Apply these classes to the `.tl-button` element when using icons.

| Modifier                | Description                              |
| ----------------------- | ---------------------------------------- |
| `.tl-button--icon`      | Button with text and icon                |
| `.tl-button--only-icon` | Button with only an icon (no text)       |

### Button State Modifiers

Apply these classes to the `.tl-button` element.

| Modifier               | Description                     |
| ---------------------- | ------------------------------- |
| `.tl-button--disabled` | Disabled state (alternative to `disabled` attribute) |
| `.tl-button--full-width` | Button spans full width of container |

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
