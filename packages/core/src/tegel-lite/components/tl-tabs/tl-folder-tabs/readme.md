# tl-folder-tabs

The Folder Tabs component provides a folder-style tabbed navigation with primary and secondary variants.

## Usage

```html
<div class="tl-folder-tabs">
  <div class="tl-folder-tabs__wrapper">
    <button class="tl-folder-tabs__tab tl-folder-tabs__tab--selected">Tab 1</button>
    <button class="tl-folder-tabs__tab">Tab 2</button>
    <button class="tl-folder-tabs__tab">Tab 3</button>
  </div>
</div>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-folder-tab.css
@scania/tegel-lite/tl-folder-tabs.css
```

### Optional Stylesheets

```
@scania/tegel-lite/tl-icon.css (if using scroll buttons)
```

## Elements

| Element                                     | HTML Element | Description                  |
| ------------------------------------------- | ------------ | ---------------------------- |
| `.tl-folder-tabs`                           | `<div>`      | Folder tabs container        |
| `.tl-folder-tabs__wrapper`                  | `<div>`      | Scrollable tabs wrapper      |
| `.tl-folder-tabs__tab`                      | `<button>`   | Individual folder tab        |
| `.tl-folder-tabs__scroll-button`            | `<button>`   | Scroll button                |
| `.tl-folder-tabs__scroll-button--left`      | `<button>`   | Left scroll button           |
| `.tl-folder-tabs__scroll-button--right`     | `<button>`   | Right scroll button          |

## Modifiers

### Container Modifiers

Apply these classes to `.tl-folder-tabs` container.

| Modifier                          | Description                    |
| --------------------------------- | ------------------------------ |
| `.tl-folder-tabs--primary`        | Primary mode variant           |
| `.tl-folder-tabs--secondary`      | Secondary mode variant         |

### Tab State Modifiers

Apply these classes to `.tl-folder-tabs__tab` elements.

| Modifier                            | Description                    |
| ----------------------------------- | ------------------------------ |
| `.tl-folder-tabs__tab--selected`    | Active/selected tab            |
| `.tl-folder-tabs__tab--disabled`    | Disabled tab                   |

## JavaScript Required

The Folder Tabs component requires JavaScript to handle:
- Active tab state management
- Tab switching and content display
- Scroll button functionality
- Keyboard navigation (Arrow keys)
- Dynamic show/hide of scroll buttons based on overflow

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
