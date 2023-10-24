[![Storybook](https://img.shields.io/badge/docs-storybook-ff69b4)](https://tegel-storybook.netlify.app/)
![](https://img.shields.io/github/license/scania-digital-design-system/tegel)
![Status: Beta](https://img.shields.io/badge/status-beta-red)
![npm](https://img.shields.io/npm/v/%40scania%2Ftegel-react)

# @scania/tegel-react
This is an ongoing project with the purpose to simplify the integration of Tegel in React apps.

This guide [here](https://stenciljs.com/docs/react) has served as base for the configuration.

Official website: https://tegel.scania.com/

Storybook: https://tegel-storybook.netlify.app/

The design system supports the design and development of digital solutions at Scania. The purpose is to secure a coherent, premium brand and user experience across all of Scania's digital touchpoints.

## Status

This package is currently in a **beta** stage. We are now working hard towards a 1.0 release, but if you want to try out the package today you can!

## Installation


1. Run `npm install @scania/tegel-react`
2. In your App.tsx:

```ts
import { defineCustomElements, TdsButton } '@scania/tegel-react';

defineCustomElements(); // Needs to be run in the browser once, before any elements are used.

function App() {
return (
<div className="App">
  <TdsButton text="Click me!">
  </TdsButton>
</div>
);
}

export default App;
```

1. In your global css file import the tegel stylesheet.

```css
@import url('@scania/tegel/dist/tegel/tegel.css');
```

See all available components in the [Tegel Design System](https://tegel.scania.com/components/overview).

## Browser support

See the browser support section on [the Tegel website](https://tegel.scania.com/development/getting-started-development/introduction#browser-support).

## Community

Get in touch with the team and the community:

- [Teams](https://teams.microsoft.com/l/team/19%3a1257007a64d44c64954acca27a9d4b46%40thread.skype/conversations?groupId=79f9bfeb-73e2-424d-9477-b236191ece5e&tenantId=3bc062e4-ac9d-4c17-b4dd-3aad637ff1ac)

## License

All CSS, HTML and JS code are available under the MIT license. The Scania brand identity, logos and photographs found in this repository are copyrighted Scania CV AB and are not available on an open source basis or to be used as examples or in any other way, if not specifically ordered by Scania CV AB.
