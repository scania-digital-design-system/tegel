# tl-breadcrumbs

The Breadcrumbs component displays the user's current location within the application's navigation hierarchy.

## Usage

```html
<nav class="tl-breadcrumbs">
  <ol class="tl-breadcrumbs__list">
    <li class="tl-breadcrumbs__breadcrumb">
      <a class="tl-breadcrumbs__breadcrumb-link" href="#">Home</a>
    </li>
    <li class="tl-breadcrumbs__breadcrumb">
      <a class="tl-breadcrumbs__breadcrumb-link" href="#">Products</a>
    </li>
    <li class="tl-breadcrumbs__breadcrumb tl-breadcrumbs__breadcrumb--current">
      <a class="tl-breadcrumbs__breadcrumb-link" href="#" aria-current="page">Current Page</a>
    </li>
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

| Element                            | HTML Element | Description                         |
| ---------------------------------- | ------------ | ----------------------------------- |
| `.tl-breadcrumbs`                  | `<nav>`      | Main breadcrumbs container          |
| `.tl-breadcrumbs__list`            | `<ol>`       | Ordered list of breadcrumb items    |
| `.tl-breadcrumbs__breadcrumb`      | `<li>`       | Individual breadcrumb item. Separator (›) is added automatically via CSS |
| `.tl-breadcrumbs__breadcrumb-link` | `<a>`        | Link for breadcrumb item. Use `aria-current="page"` on current page |

## Modifiers

### Breadcrumb Item Modifiers

Apply these classes to `.tl-breadcrumbs__breadcrumb` elements.

| Modifier                              | Description                              |
| ------------------------------------- | ---------------------------------------- |
| `.tl-breadcrumbs__breadcrumb--current`| Indicates the current page. Removes separator and disables link interaction |

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
