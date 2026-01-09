# tl-button

The Button component triggers actions or navigates users to different pages.

## Usage

### Basic Button

```html
<button class="tl-button tl-button--primary tl-button--md">
  Button text
</button>
```

### Button with Icon

```html
<button class="tl-button tl-button--primary tl-button--md tl-button--icon">
  Button text
  <span class="tl-icon tl-icon--arrow-right tl-icon--20" aria-hidden="true"></span>
</button>
```

### Button with Only Icon

```html
<button class="tl-button tl-button--primary tl-button--md tl-button--only-icon" aria-label="Delete">
  <span class="tl-icon tl-icon--trash tl-icon--20" aria-hidden="true"></span>
</button>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-button.css
@scania/tegel-lite/tl-icon.css (when using icons)
```

## Elements

| Element      | HTML Element | Description               |
| ------------ | ------------ | ------------------------- |
| `.tl-button` | `<button>`/`<a>` | Main button element   |
| `.tl-icon`   | `<span>`     | Icon element inside button (optional) |

## Modifiers

### Button Variant Modifiers

Apply these classes to the `.tl-button` element. A variant modifier is required.

| Modifier               | Description                              |
| ---------------------- | ---------------------------------------- |
| `.tl-button--primary`  | Primary button variant                   |
| `.tl-button--secondary`| Secondary button variant                 |
| `.tl-button--ghost`    | Ghost button variant (transparent)       |
| `.tl-button--danger`   | Danger button variant for destructive actions |

### Button Size Modifiers

Apply these classes to the `.tl-button` element. A size modifier is required.

| Modifier           | Description                    |
| ------------------ | ------------------------------ |
| `.tl-button--xs`   | Extra small button (24px)      |
| `.tl-button--sm`   | Small button (40px). Use 16px icons |
| `.tl-button--md`   | Medium button (48px). Use 20px icons |
| `.tl-button--lg`   | Large button (56px). Use 20px icons |

### Button Icon Modifiers

Apply these classes to the `.tl-button` element when using icons.

| Modifier                | Description                              |
| ----------------------- | ---------------------------------------- |
| `.tl-button--icon`      | Button with text and icon                |
| `.tl-button--only-icon` | Button with only an icon (no text). Not available for `--xs` size |

### Button State Modifiers

Apply these classes to the `.tl-button` element.

| Modifier               | Description                     |
| ---------------------- | ------------------------------- |
| `.tl-button--disabled` | Disabled state. Use together with the `disabled` attribute |
| `.tl-button--full-width` | Button spans full width of container |

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
