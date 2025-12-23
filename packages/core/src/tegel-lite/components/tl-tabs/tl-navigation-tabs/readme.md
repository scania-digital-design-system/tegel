# tl-navigation-tabs

The Navigation Tabs component provides tab-style navigation links with primary and secondary variants.

## Usage

```html
<nav class="tl-navigation-tabs">
  <a href="#" class="tl-navigation-tabs__tab tl-navigation-tabs__tab--selected">Tab 1</a>
  <a href="#" class="tl-navigation-tabs__tab">Tab 2</a>
  <a href="#" class="tl-navigation-tabs__tab">Tab 3</a>
</nav>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-navigation-tab.css
@scania/tegel-lite/tl-navigation-tabs.css
```

## Elements

| Element                     | HTML Element | Description                  |
| --------------------------- | ------------ | ---------------------------- |
| `.tl-navigation-tabs`       | `<nav>`      | Navigation tabs container    |
| `.tl-navigation-tabs__tab`  | `<a>`        | Individual navigation tab    |

## Modifiers

### Container Modifiers

Apply these classes to `.tl-navigation-tabs` container.

| Modifier                          | Description                    |
| --------------------------------- | ------------------------------ |
| `.tl-navigation-tabs--primary`    | Primary mode variant           |
| `.tl-navigation-tabs--secondary`  | Secondary mode variant         |

### Tab State Modifiers

Apply these classes to `.tl-navigation-tabs__tab` elements.

| Modifier                                | Description                    |
| --------------------------------------- | ------------------------------ |
| `.tl-navigation-tabs__tab--selected`    | Active/selected tab            |
| `.tl-navigation-tabs__tab--disabled`    | Disabled tab                   |

## JavaScript Required

The Navigation Tabs component requires JavaScript to handle:
- Active tab state management
- Navigation and routing
- Keyboard navigation (Arrow keys)

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
