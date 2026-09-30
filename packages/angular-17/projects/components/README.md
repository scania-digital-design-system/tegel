[![Storybook](https://img.shields.io/badge/docs-storybook-ff69b4)](https://tds-storybook.tegel.scania.com/)
![](https://img.shields.io/github/license/scania-digital-design-system/tegel)
![Status: Beta](https://img.shields.io/badge/status-beta-red)
![npm](https://img.shields.io/npm/v/%40scania%2Ftegel-angular-17)

# @scania/tegel-angular-17

This is an ongoing project with the purpose to simplify the integration of Tegel in Angular apps.

The configuration is based on the [Stencil Angular integration guide](https://stenciljs.com/docs/angular).

Official website: https://tegel.scania.com/

Storybook: https://tds-storybook.tegel.scania.com/

The design system supports the design and development of digital solutions at Scania. The purpose is to secure a coherent, premium brand and user experience across all of Scania's digital touchpoints.

## Installation

Install the package

```bash
npm install @scania/tegel-angular-17
```

In your global CSS file, import the Tegel stylesheet:

```css
@import url('@scania/tegel/dist/tegel/tegel.css');
```

### Standalone applications

For Angular applications using standalone components, register `TegelModule` when bootstrapping the application:

```typescript
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { TegelModule } from '@scania/tegel-angular-17';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      TegelModule,
    ),
  ],
}).catch((err) => console.error(err));
```

Then, import `TegelModule` into each standalone component that uses Tegel components:

```typescript
import { Component } from '@angular/core';
import { TegelModule } from '@scania/tegel-angular-17';

@Component({
  selector: 'my-component',
  standalone: true,
  imports: [TegelModule],
  templateUrl: './my-component.component.html',
})
export class MyComponent {}
```

Tegel components can now be used in the component template:

```html
<tds-button variant="primary" text="Click me!" size="sm">
  <tds-icon slot="icon" name="truck"></tds-icon>
</tds-button>
```

`TegelModule` registers the Tegel web components during application initialization, so you do not need to call `defineCustomElements()` manually.

### NgModule-based applications

For applications using `NgModule`, import `TegelModule` into the appropriate Angular module:

```typescript
import { NgModule } from '@angular/core';
import { TegelModule } from '@scania/tegel-angular-17';

@NgModule({
  imports: [
    TegelModule,
  ]
})
export class AppModule {}
```

`TegelModule` makes the Tegel Angular wrappers available to the module and registers the Tegel web components during application initialization.

No manual call to `defineCustomElements()` is required.

### Themes

Default themes are Scania brand and Light mode, but we advise you to read through our Storybook > System Setup > Light-Dark modes / Brand themes pages.


See all available components in the [Tegel Design System](https://tegel.scania.com/components/overview).

## Browser support

See the browser support section on [the Tegel website](https://tegel.scania.com/development/getting-started-development/introduction#browser-support).

## Community

Get in touch with the team and the community:

- [Teams](https://teams.microsoft.com/l/team/19%3a1257007a64d44c64954acca27a9d4b46%40thread.skype/conversations?groupId=79f9bfeb-73e2-424d-9477-b236191ece5e&tenantId=3bc062e4-ac9d-4c17-b4dd-3aad637ff1ac)

## License

All CSS, HTML and JS code are available under the MIT license. The Scania brand identity, logos and photographs found in this repository are copyrighted Scania CV AB and are not available on an open source basis or to be used as examples or in any other way, if not specifically ordered by Scania CV AB.

