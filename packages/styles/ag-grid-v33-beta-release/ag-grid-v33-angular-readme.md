
# Beta release of updated Tegel support for AG Grid tables for Angular

**This installation/example is specifically for Angular.**

Documentation on AG Grid's website, a tutorial using Angular: https://www.ag-grid.com/angular-data-grid/getting-started/

## Getting started

1. Open up your local repository where you want to use AG Grid tables, in a code editor. If you don’t have one you can clone the tegel-angular-17-demo repository: https://github.com/scania-digital-design-system/tegel-angular-17-demo
2. Run `npm install @scania/tegel-styles@1.0.0-ag-grid-v33-beta.2`
3. Run `npm install ag-grid-angular@latest`

## Angular code example

If you're using Angular (specifically with Typescript), here is an example of code you can use to test it. This how-to provides instructions on how to get AG grid tables to work with using the angular-17 version of tegel.
 
Create a new component (e.g. with the Angular CLI). Here we call this component table-example. You should have at least these default files:
- table-example.component.ts
- table-example.component.html

If you're using a project that has previously used ag grid with Tegel (especially if you're using the tegel-angular-17-demo) make sure that there aren't conflicts with other css files for ag-grid, by verifying that 
`ag-grid-community/styles/ag-grid.css` and `ag-grid-community/styles/ag-theme-quartz.css` aren't imported anywhere in the project.

In the table-example.component.ts file, add these imports:
``` typescript
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ColDef, AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import '@scania/tegel/dist/tegel/tegel.css';
import '@scania/tegel-styles/dist/customization/ag-grid/v33-theme.css';
```

and these lines:
``` typescript
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: "table-example",
  standalone: true,
  templateUrl: "./table-example.component.html",
  imports: [AgGridModule, AgGridAngular],
})
export default class TableExampleComponent {
  public rowData = [
    { col1: "Row 1 Column 1", col2: "Row 1 Column 2" },
    { col1: "Row 2 Column 1", col2: "Row 2 Column 2" },
  ];
  public colDefs = [
    { field: "column 1", filter: true },
    { field: "column 2", filter: true },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    filter: true,
  };
}
```

In the table-example.component.html file, add:
``` html
<div class="tds-mode-light" style="height: 300px; width: 500px">
  <ag-grid-angular
    style="height: 100%; width: 100%"
    [rowData]="rowData"
    [columnDefs]="colDefs"
    [defaultColDef]="defaultColDef"
    class="tds-mode-variant-primary"
  >
  </ag-grid-angular>
</div>
```
 
Now import this new table example component to a page in your app, and open the browser to preview it.