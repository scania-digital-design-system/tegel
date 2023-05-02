# Tegel Design System - Colour package

---

This package contains both SCSS and CSS files available
- SCSS available for import in your sass development
- CSS classes for text and background
- CSS custom properties / CSS variables available through scania-theme

### How to install with npm

```shell
> npm i @scania/colour
```

### How to use

See all available tokens in [digitaldesign.scania.com](https://digitaldesign.scania.com/foundation/colours/specification)

```html
// style.scss
// you need to have sass compiler in your application
@import '~node_modules/@scania/colour/dist/scss/colour';

// use get-colour(token-name) function to get colour from Tegel colour scale
.my-div {
  color: get-colour(grey-500);
}

// OR
// use in HTML as a class
// property available: text and background
//.sdds-{property}-{token-name}
<p class="sdds-text-blue-900 sdds-background-grey-200">
  An example paragraph
</p>
```




