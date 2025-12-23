# tl-breadcrumbs

The Breadcrumbs component displays the user's current location within the application's navigation hierarchy.

## Usage

```html
<nav class="tl-breadcrumbs">
  <ol class="tl-breadcrumbs__list">
    <li class="tl-breadcrumbs__breadcrumb">
      <a href="#" class="tl-breadcrumbs__breadcrumb-link">Home</a>
    </li>
    <li class="tl-breadcrumbs__breadcrumb">
      <a href="#" class="tl-breadcrumbs__breadcrumb-link">Category</a>
    </li>
    <li class="tl-breadcrumbs__breadcrumb tl-breadcrumbs__breadcrumb--current">
      <span class="tl-breadcrumbs__breadcrumb-link">Current Page</span>
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
| `.tl-breadcrumbs__breadcrumb`      | `<li>`       | Individual breadcrumb item          |
| `.tl-breadcrumbs__breadcrumb-link` | `<a>`/`<span>` | Link or text for breadcrumb item  |

## Modifiers

### Breadcrumb Item Modifiers

Apply these classes to `.tl-breadcrumbs__breadcrumb` elements.

| Modifier                              | Description                              |
| ------------------------------------- | ---------------------------------------- |
| `.tl-breadcrumbs__breadcrumb--current`| Indicates the current page breadcrumb    |

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
