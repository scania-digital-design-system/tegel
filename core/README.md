[![Github release](https://img.shields.io/npm/v/@scania/tegel?color=1081C2)](https://www.npmjs.com/package/@scania/tegel)
[![Storybook](https://img.shields.io/badge/docs-storybook-ff69b4)](https://tegel-storybook.netlify.app/)
![](https://img.shields.io/github/license/scania-digital-design-system/sdds)
![Status: Beta](https://img.shields.io/badge/status-beta-red)

# @scania/tegel

https://tegel.scania.com/

The design system supports the design and development of digital solutions at Scania. The purpose is to secure a coherent, premium brand and user experience across all of Scania's digital touchpoints.

## Status

This package is currently in a pre-beta stage. We are now working hard towards a 1.0-beta release, but if you want to try out the package today you can!

## Installation

### React

#### with Typescript

1. Run `npm install @scania/tegel`
2. src folder create a file called `register-webcomponents.ts`
3. Paste the following into that file:

```ts
import { defineCustomElements, JSX as LocalJSX } from '@scania/tegel/loader';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

type StencilProps<T> = {
  [P in keyof T]?: Omit<T[P], 'ref'> | HTMLAttributes<T>;
};

type ReactProps<T> = {
  [P in keyof T]?: DetailedHTMLProps<HTMLAttributes<T[P]>, T[P]>;
};

type StencilToReact<T = LocalJSX.IntrinsicElements, U = HTMLElementTagNameMap> = StencilProps<T> &
  ReactProps<U>;

declare global {
  export namespace JSX {
    interface IntrinsicElements extends StencilToReact {}
  }
}

defineCustomElements(window);
```

4. In your index.tsx import `register-webcomponents.ts`

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './register-webcomponents';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

reportWebVitals();
```

5. In your global css file (usually `App.css`) import the tegel stylesheet.

```css
@import url('@scania/tegel/dist/tegel/tegel.css');
```

#### with Javascript

1. Run `npm install @scania/tegel`
2. In your index.jsx define the custom components:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { defineCustomElements } from '@scania/tegel/loader';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

reportWebVitals();
defineCustomElements();
```

3. In your global css file (usually `App.css`) import the tegel stylesheet.

```css
@import url('@scania/tegel/dist/tegel/tegel.css');
```

### Angular

1. Run `npm install @scania/tegel`
2. In your `main.ts` import and call the function `defineCustomElements()`:

```ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { defineCustomElements } from '@scania/tegel/loader';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

defineCustomElements(window);
```

3. In your `app.module.ts` import `CUSTOM_ELEMENTS_SCHEMA`:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

4. In your global css file (`styles.css`) import the tegel stylesheet.

```css
@import url('@scania/tegel/dist/tegel/tegel.css');
```

### HTML

1. Run `npm init` to generate a package.json
2. Run `npm install @scania/tegel`
3. Import the package and its style in your `<head>`:

```html
<script type="module">
  import { defineCustomElements } from './node_modules/@scania/tegel/loader/index.es2017.js';
  defineCustomElements();
</script>
<link rel="stylesheet" href="./node_modules/@scania/tegel/dist/tegel/tegel.css" />
```

See all available components in the [Tegel Design System](https://tegel.scania.com/components/overview).

## Browser support

See the browser support section on [the Tegel website](https://tegel.scania.com/development/getting-started-development/introduction#browser-support).

## Community

Get in touch with the team and the community:

- [Teams](https://teams.microsoft.com/l/team/19%3a1257007a64d44c64954acca27a9d4b46%40thread.skype/conversations?groupId=79f9bfeb-73e2-424d-9477-b236191ece5e&tenantId=3bc062e4-ac9d-4c17-b4dd-3aad637ff1ac)

## License

All CSS, HTML and JS code are available under the MIT license. The Scania brand identity, logos and photographs found in this repository are copyrighted Scania CV AB and are not available on an open source basis or to be used as examples or in any other way, if not specifically ordered by Scania CV AB.
