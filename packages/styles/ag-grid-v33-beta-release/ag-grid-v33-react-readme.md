
# Beta release of updated Tegel support for AG Grid tables for React

**This installation/example is specifically for React.**

Documentation on AG Grid's website, a tutorial using React: https://www.ag-grid.com/react-data-grid/getting-started/

## Getting started

1. Open up your local repository where you want to use AG Grid tables, in a code editor. If you don’t have one you can clone the tegel-react-demo repository: https://github.com/scania-digital-design-system/tegel-react-demo
2. Run `npm install @scania/tegel-styles@1.0.0-ag-grid-v33-beta.2`
3. Run `npm install ag-grid-react@latest`

## React code example

If you're using React (specifically with Typescript), here is an example of code you can use to test it. You'll need to create a new component, here we call it TableExampleComponent. 

If you're using a project that has previously used ag grid with Tegel (especially if you're using the tegel-react-demo) make sure that there aren't conflicts with other css files for ag-grid, by verifying that 
`ag-grid-community/styles/ag-grid.css` and `ag-grid-community/styles/ag-theme-quartz.css` aren't imported anywhere in the project.

Add the following imports to the new component's file:
``` typescript
import { AgGridReact } from 'ag-grid-react';
import {AllCommunityModule, ModuleRegistry} from 'ag-grid-community';
import "@scania/tegel/dist/tegel/tegel.css";
import '@scania/tegel-styles/dist/customization/ag-grid/v33-theme.css';
```

and the following lines:
``` typescript
ModuleRegistry.registerModules([AllCommunityModule]);

const TableExampleComponent = () => {
  const rowData = [
    { col1: "Row 1 Column 1", col2: "Row 1 Column 2" },
    { col1: "Row 2 Column 1", col2: "Row 2 Column 2" },
  ];
  const colDefs = [
    { field: 'column 1', filter: true },
    { field: 'column 2', filter: true },
  ];
  const defaultColDef: ColDef = {
    flex: 1,
    filter: true,
  };
  return (
    <div className="tds-mode-light" style={{height: "300px", width: "500px"}}>
      <AgGridReact style={{height: "100%", width: "100%"}} rowData={rowData} columnDefs={colDefs} defaultColDef={defaultColDef} className="tds-mode-variant-primary" />
    </div>
  );
};
```

Now import this new table example component to a page in your app, and open the browser to preview it.