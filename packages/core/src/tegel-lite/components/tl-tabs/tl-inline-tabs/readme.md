# tl-inline-tabs

The Inline Tabs component provides a horizontal tabbed navigation with scrollable functionality.

## Usage

```html
<div class="tl-inline-tabs">
  <button class="tl-inline-tabs__tab tl-inline-tabs__tab--selected">Tab 1</button>
  <button class="tl-inline-tabs__tab">Tab 2</button>
  <button class="tl-inline-tabs__tab">Tab 3</button>
</div>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-inline-tab.css
@scania/tegel-lite/tl-inline-tabs.css
```

### Optional Stylesheets

```
@scania/tegel-lite/tl-icon.css (if using scroll buttons)
```

## Elements

| Element                                     | HTML Element | Description                  |
| ------------------------------------------- | ------------ | ---------------------------- |
| `.tl-inline-tabs`                           | `<div>`      | Inline tabs container        |
| `.tl-inline-tabs__tab`                      | `<button>`   | Individual inline tab        |
| `.tl-inline-tabs__scroll-button`            | `<button>`   | Scroll button                |
| `.tl-inline-tabs__scroll-button--left`      | `<button>`   | Left scroll button           |
| `.tl-inline-tabs__scroll-button--right`     | `<button>`   | Right scroll button          |

## Modifiers

### Tab State Modifiers

Apply these classes to `.tl-inline-tabs__tab` elements.

| Modifier                            | Description                    |
| ----------------------------------- | ------------------------------ |
| `.tl-inline-tabs__tab--selected`    | Active/selected tab            |
| `.tl-inline-tabs__tab--disabled`    | Disabled tab                   |

## JavaScript Required

The Inline Tabs component requires JavaScript to handle:
- Active tab state management
- Tab switching and content display
- Scroll button functionality
- Keyboard navigation (Arrow keys)
- Dynamic show/hide of scroll buttons based on overflow

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
