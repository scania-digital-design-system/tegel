# tl-tabs

The Tabs component provides tabbed navigation with multiple style variants.

## Usage

### Inline Tabs

```html
<div class="tl-inline-tabs">
  <div class="tl-inline-tabs__wrapper">
    <button class="tl-inline-tab tl-inline-tab--active">Tab 1</button>
    <button class="tl-inline-tab">Tab 2</button>
    <button class="tl-inline-tab">Tab 3</button>
  </div>
</div>
```

### Folder Tabs

```html
<div class="tl-folder-tabs">
  <button class="tl-folder-tab tl-folder-tab--active">Tab 1</button>
  <button class="tl-folder-tab">Tab 2</button>
  <button class="tl-folder-tab">Tab 3</button>
</div>
```

### Navigation Tabs

```html
<nav class="tl-navigation-tabs">
  <a href="#" class="tl-navigation-tab tl-navigation-tab--active">Tab 1</a>
  <a href="#" class="tl-navigation-tab">Tab 2</a>
  <a href="#" class="tl-navigation-tab">Tab 3</a>
</nav>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-tabs.css
```

## Elements

### Inline Tabs Elements

| Element                             | HTML Element | Description                  |
| ----------------------------------- | ------------ | ---------------------------- |
| `.tl-inline-tabs`                   | `<div>`      | Inline tabs container        |
| `.tl-inline-tabs__wrapper`          | `<div>`      | Scrollable tabs wrapper      |
| `.tl-inline-tab`                    | `<button>`   | Individual inline tab        |
| `.tl-inline-tabs__scroll-button`    | `<button>`   | Scroll button                |
| `.tl-inline-tabs__scroll-button--right` | `<button>` | Right scroll button      |

### Folder Tabs Elements

| Element           | HTML Element | Description                  |
| ----------------- | ------------ | ---------------------------- |
| `.tl-folder-tabs` | `<div>`      | Folder tabs container        |
| `.tl-folder-tab`  | `<button>`   | Individual folder tab        |

### Navigation Tabs Elements

| Element               | HTML Element | Description                  |
| --------------------- | ------------ | ---------------------------- |
| `.tl-navigation-tabs` | `<nav>`      | Navigation tabs container    |
| `.tl-navigation-tab`  | `<a>`        | Individual navigation tab    |

## Modifiers

### Inline Tab State Modifiers

Apply these classes to `.tl-inline-tab` elements.

| Modifier                   | Description                    |
| -------------------------- | ------------------------------ |
| `.tl-inline-tab--active`   | Active/selected tab            |
| `.tl-inline-tab--disabled` | Disabled tab                   |

### Folder Tab State Modifiers

Apply these classes to `.tl-folder-tab` elements.

| Modifier                   | Description                    |
| -------------------------- | ------------------------------ |
| `.tl-folder-tab--active`   | Active/selected tab            |
| `.tl-folder-tab--disabled` | Disabled tab                   |

### Navigation Tab State Modifiers

Apply these classes to `.tl-navigation-tab` elements.

| Modifier                       | Description                    |
| ------------------------------ | ------------------------------ |
| `.tl-navigation-tab--active`   | Active/selected tab            |
| `.tl-navigation-tab--disabled` | Disabled tab                   |

## JavaScript Required

The Tabs component requires JavaScript to handle:
- Active tab state management
- Tab switching and content display
- Scroll button functionality (for inline tabs)
- Keyboard navigation (Arrow keys)

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
