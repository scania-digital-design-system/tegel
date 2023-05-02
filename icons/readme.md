# Tegel Icons package

---

There are 2 options to use icons package. You can use it as a module or as a webfont. 

### 1. Use as a module with sdds-icon component

This is a good option if your application supports script bundling, and for example you need all resources to be offline or hosted in your own server. To install icons package as a module, install using [npm](https://www.npmjs.com/package/@scania/icons). 

```bash
npm i @scania/icons --save
```

The icons can be used with <sdds-icon> component from `@scania/components`. Make sure you have installed `@scania/components` in your application. The benefits of this method is that it will be dynamically loaded. This solution will enable module bundling tools such as webpack to do dynamic referencing only to the icons used in the application.

```html
<sdds-icon name="scania-truck"></sdds-icon>
```

### 2. Webfont

All icons are available as font icons. Import the font CSS from Scania CDN in your CSS or HTML.

```css
// in CSS
@import url('https://cdn.digitaldesign.scania.com/icons/dist/1.0.0/fonts/css/sdds-icons.css');
```

Or you can add it in the HTML inside `<head>`.

```html
<head>
    <link rel="stylesheet" href="https://cdn.digitaldesign.scania.com/icons/dist/1.0.0/fonts/css/sdds-icons.css">
</head>
```

Then, you can use it as a class in your element. Do not forget to add 'sdds-icon' class before the icon name.

```html
<i class="sdds-icon scania-arrow"></i>
```

Scania icons webfont is also available in the distribution of `@scania/icons` package. If you do not want to connect to Tegel Digital Design CDN, or, you want to go fully offline, you can use this solution. To be able to use it, you can refer to the CSS which is available under `node_modules/@scania/icons`

```html
<head>
    <link rel="stylesheet" href="node_modules/@scania/icons/dist/fonts/css/sdds-icons.css">
</head>
```