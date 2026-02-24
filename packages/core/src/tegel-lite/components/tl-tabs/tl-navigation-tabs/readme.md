# tl-navigation-tabs

The Navigation Tabs component provides tab-style navigation.

## Usage

```html
<nav class="tl-navigation-tabs">
  <button class="tl-navigation-tabs__tab tl-navigation-tabs__tab--selected">Tab 1</button>
  <button class="tl-navigation-tabs__tab">Tab 2</button>
  <button class="tl-navigation-tabs__tab">Tab 3</button>
</nav>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/_tl-navigation-tab.css
@scania/tegel-lite/tl-navigation-tabs.css
```

### Optional Stylesheets

```
@scania/tegel-lite/tl-icon.css (if using scroll buttons)
```

## Elements

| Element                                        | HTML Element | Description                  |
| ---------------------------------------------- | ------------ | ---------------------------- |
| `.tl-navigation-tabs`                          | `<nav>`      | Navigation tabs container    |
| `.tl-navigation-tabs__tab`                     | `<button> / <a>`   | Individual navigation tab    |
| `.tl-navigation-tabs__scroll-button`           | `<button>`   | Scroll button                |

## Modifiers

### Tab State Modifiers

Apply these classes to `.tl-navigation-tabs__tab` elements.

| Modifier                                | Description                    |
| --------------------------------------- | ------------------------------ |
| `.tl-navigation-tabs__tab--selected`    | Active/selected tab            |
| `.tl-navigation-tabs__tab--disabled`    | Disabled tab                   |

### Tab Scroll Button Modifiers

Apply these classes to `.tl-navigation-tabs__scroll-button` elements.

| Modifier                                | Description                    |
| --------------------------------------- | ------------------------------ |
| `.tl-navigation-tabs__scroll-button--left`     | Left scroll button           |
| `.tl-navigation-tabs__scroll-button--right`    | Right scroll button          |

## JavaScript Required

The Navigation Tabs component requires JavaScript to handle:
- Active tab state management
- Navigation and routing
- Scroll button functionality
- Keyboard navigation (Arrow keys)
- Dynamic show/hide of scroll buttons based on overflow

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*