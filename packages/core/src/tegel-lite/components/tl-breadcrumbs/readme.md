# tl-breadcrumbs

The Breadcrumbs component displays the user's current location within the application's navigation hierarchy.

## Usage

```html
<nav class="tl-breadcrumbs">
  <ol>
    <li><a href="#">Home</a></li>
    <li><a href="#">Products</a></li>
    <li><a href="#" aria-current="page">Current Page</a></li>
  </ol>
</nav>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-breadcrumbs.css
```

## Elements

| Element            | HTML Element | Description                         |
| ------------------ | ------------ | ----------------------------------- |
| `.tl-breadcrumbs`  | `<nav>`      | Main breadcrumbs container          |
| `ol`               | `<ol>`       | Ordered list of breadcrumb items (no class needed) |
| `li`               | `<li>`       | Individual breadcrumb item (no class needed). Separator (›) is added automatically via CSS |
| `a`                | `<a>`        | Link for breadcrumb item (no class needed). Use `aria-current="page"` on current page link |

## Usage Notes

- The component uses native HTML elements without additional BEM classes on `ol`, `li`, and `a` elements
- Separators (›) are automatically added between items via CSS
- The current page is indicated using `aria-current="page"` on the link element
- Links with `aria-current="page"` automatically receive disabled styling and have pointer events removed

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*