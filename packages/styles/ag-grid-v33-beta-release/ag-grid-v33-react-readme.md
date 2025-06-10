
# Beta release of updated Tegel support for AG Grid tables for React

**This installation/example is specifically for React.**

Documentation on AG Grid's website, a tutorial using React: https://www.ag-grid.com/react-data-grid/getting-started/

## Getting started

1. Open up your local repository where you want to use AG Grid tables, in a code editor. If you don’t have one you can clone the tegel-react-demo repository: https://github.com/scania-digital-design-system/tegel-react-demo
2. Go to the file “package.json” in the root directory of your repository
3. Update the line containing `"@scania/tegel-styles": “1.0.0”` to `"@scania/tegel-styles": "1.0.0-ag-grid-design-review-beta.3"`
4. Run “npm install”
5. Run “npm install ag-grid-react@latest” and verify that you have ag grid version 33 or higher.

## React code example

If you're using React (specifically with Typescript), here is an example of code you can use to test it. You'll need to create a new component, here we call it TableExampleComponent. Add the following imports to the component's file:
``` typescript
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColDef, ModuleRegistry, GridReadyEvent } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import '@scania/tegel-styles/dist/customization/ag-grid/quartz-theme-override-v33.css'
```

add the following lines to the component's file:
``` typescript
ModuleRegistry.registerModules([ClientSideRowModelModule]);
interface IRow {
  col1: string;
  col2: string;
}
const TableExampleComponent = () => {
  const rowData = [
    { col1: 'Row 1', col2: 'Row 1' },
    { col1: 'Row 2', col2: 'Row 2' },
  ];
  const colDefs = [
    { field: 'col1', filter: true },
    { field: 'col2', filter: true },
  ];
  const defaultColDef: ColDef = {
    flex: 1,
    filter: true,
  };
  return (
    <div class="ag-theme-quartz tds-mode-variant-primary">
      <AgGridReact rowData={rowData} columnDefs={colDefs} defaultColDef={defaultColDef} />
    <div/>
  );
};
```
 
Add exporting of the component, any way you want. If you have this import: `import { createRoot } from 'react-dom/client';` you can export it by adding these lines:
``` typescript
const root = createRoot(document.getElementById('root')!);
root.render(<TableExampleComponent />);
export default TableExampleComponent;
```

Then, import your table component in another file, and open it up in a browser.
