# Components

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.0.

## Code scaffolding

Run `ng generate component component-name --project components` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project components`.
> Note: Don't forget to add `--project components` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build components` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build components`, go to the dist folder `cd dist/components` and run `npm publish`.

## Running unit tests

Run `ng test components` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Using Tegel with zoneless Angular

Angular 21 supports running without `zone.js` (zoneless). Tegel web components work with zoneless Angular, but since they emit custom events outside of Angular's zone, you need to handle change detection manually.

### 1. Enable zoneless change detection

In `main.ts`, replace `zone.js` with Angular's experimental zoneless provider:

```ts
import { provideExperimentalZonelessChangeDetection } from "@angular/core";

bootstrapApplication(AppComponent, {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    // ... other providers
  ],
});
```

### 2. Remove zone.js

Remove `zone.js` from `angular.json` polyfills:

```json
"polyfills": []
```

And uninstall the package:

```bash
npm uninstall zone.js
```

### 3. Trigger change detection for Tegel events

Tegel web components dispatch custom DOM events (e.g. `tdsChange`, `tdsClick`, `tdsToggle`) that Angular's zoneless change detection does not automatically pick up. You need to explicitly notify Angular when these events update component state.

**Option A: Inject `ChangeDetectorRef` and call `markForCheck()`**

```ts
import { ChangeDetectorRef, Component } from "@angular/core";

@Component({ ... })
export class MyComponent {
  value = "";

  constructor(private cdr: ChangeDetectorRef) {}

  onTdsChange(event: any) {
    this.value = event.detail.value;
    this.cdr.markForCheck();
  }
}
```

**Option B: Use Angular signals (recommended)**

Signals are natively tracked by Angular's zoneless change detection, so no manual calls are needed:

```ts
import { Component, signal } from "@angular/core";

@Component({
  template: `
    <tds-text-field (tdsChange)="onTdsChange($event)"></tds-text-field>
    <p>{{ value() }}</p>
  `,
})
export class MyComponent {
  value = signal("");

  onTdsChange(event: any) {
    this.value.set(event.detail.value);
  }
}
```

### Summary

| Step | What to do |
| --- | --- |
| Enable zoneless | Add `provideExperimentalZonelessChangeDetection()` to providers |
| Remove zone.js | Remove from polyfills and uninstall the package |
| Handle Tegel events | Use signals or call `ChangeDetectorRef.markForCheck()` in event handlers |