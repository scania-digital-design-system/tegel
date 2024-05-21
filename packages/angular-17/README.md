[![Storybook](https://img.shields.io/badge/docs-storybook-ff69b4)](https://tds-storybook.tegel.scania.com/)
![](https://img.shields.io/github/license/scania-digital-design-system/tegel)
![Status: Beta](https://img.shields.io/badge/status-beta-red)
![npm](https://img.shields.io/npm/v/%40scania%2Ftegel-angular)

# @scania/tegel-angular-17
This is a ongoing project with the purpose to simplify the integration of Tegel in Angular apps.

This guide [here](https://stenciljs.com/docs/angular) has served as base for the configuration.

Official website: https://tegel.scania.com/

Storybook: https://tds-storybook.tegel.scania.com/

The design system supports the design and development of digital solutions at Scania. The purpose is to secure a coherent, premium brand and user experience across all of Scania's digital touchpoints.

## Installation


1. Run `npm install @scania/tegel-angular`
2. In your root module (app.component.ts) import the `TegelModule`:

```ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TegelModule } from '@scania/tegel-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TegelModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';
}
```

3. In your global css file import the tegel stylesheet.

```css
@import url('@scania/tegel/dist/tegel/tegel.css');
```

4. In your main.ts import and call defineCustomElement.

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { defineCustomElements } from '@scania/tegel/loader';

defineCustomElements(window);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
```

See all available components in the [Tegel Design System](https://tegel.scania.com/components/overview).

## Browser support

See the browser support section on [the Tegel website](https://tegel.scania.com/development/getting-started-development/introduction#browser-support).

## Community

Get in touch with the team and the community:

- [Teams](https://teams.microsoft.com/l/team/19%3a1257007a64d44c64954acca27a9d4b46%40thread.skype/conversations?groupId=79f9bfeb-73e2-424d-9477-b236191ece5e&tenantId=3bc062e4-ac9d-4c17-b4dd-3aad637ff1ac)

## License

All CSS, HTML and JS code are available under the MIT license. The Scania brand identity, logos and photographs found in this repository are copyrighted Scania CV AB and are not available on an open source basis or to be used as examples or in any other way, if not specifically ordered by Scania CV AB.
