
# Beta release of updated Tegel support for AG Grid tables for Angular

**This installation/example is specifically for Angular.**

Documentation on AG Grid's website, a tutorial using Angular: https://www.ag-grid.com/angular-data-grid/getting-started/

## Getting started

1. Open up your local repository where you want to use AG Grid tables, in a code editor. If you don’t have one you can clone the tegel-angular-17-demo repository: https://github.com/scania-digital-design-system/tegel-angular-17-demo
2. Go to the file “package.json” in the root directory of your repository
3. Update the line containing `"@scania/tegel-styles": “1.0.0”` to `"@scania/tegel-styles": "1.0.0-ag-grid-design-review-beta.3"`
4. Run “npm install”
5. Run “npm install ag-grid-angular@latest” and "npm install ag-grid-community@latest" and verify that you have ag grid version 33 or higher.

## Angular code example

If you're using Angular (specifically with Typescript), here is an example of code you can use to test it. This how-to provides instructions on how to get AG grid tables to work with using the angular-17 version of tegel.
 
Create a new component (e.g. with the Angular CLI). Here we call this component table-example. You should have these default files:
- table-example.component.ts
- table-example.component.html

For this code example, in case the files table-example.component.spec.ts and table-example.component.css can be deleted if those were auto-genereated when creating the component.

In the same folder, create the file **ag-styles-loader.css** and add the following line to it:
`@import "@scania/tegel-styles/dist/customization/ag-grid/quartz-theme-override-v33.css";`
 
In the table-example.component.ts file, add these imports:
``` typescript
import { Component, ViewEncapsulation } from "@angular/core";
import { TegelModule } from "@scania/tegel-angular-17";
import { AgGridAngular, AgGridModule } from "ag-grid-angular";
import {
  ColDef,
  AllCommunityModule,
  ModuleRegistry,
  provideGlobalGridOptions,
} from "ag-grid-community";
```

and these lines:
``` typescript
ModuleRegistry.registerModules([AllCommunityModule]);
provideGlobalGridOptions({
  theme: "legacy",
});
@Component({
  selector: "table-example",
  standalone: true,
  templateUrl: "./table-example.component.html",
  styleUrls: ["ag-styles-loader.css"],
  imports: [TegelModule, AgGridModule, AgGridAngular],
})
export default class TableExampleComponent {
  public rowData = [
    { col1: "Row 1", col2: "Row 1" },
    { col1: "Row 2", col2: "Row 2" },
  ];
  public colDefs = [
    { field: "col1", filter: true },
    { field: "col2", filter: true },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    filter: true,
  };
}
```

In the table-example.component.html file, add:
``` html
<div class="tds-mode-light" style="height: 500px; width: 100%">
  <ag-grid-angular
    style="height: 100%; width: 100%"
    [rowData]="rowData"
    [columnDefs]="colDefs"
    [defaultColDef]="defaultColDef"
    class="ag-theme-quartz tds-mode-variant-primary"
  >
  </ag-grid-angular>
</div>
```
 
 
Now import this new table example component to a page in your app, and open the browser to preview it.