import { themeQuartz } from '@ag-grid-community/theming';

export const createTegelTheme = (themeQuartz) => {
 return themeQuartz
 .withParams({
     browserColorScheme: "light",
     headerFontSize: 14
 })
}

/* THE IDEA OF USAGE */
/*

import { themeQuartz } from '@ag-grid-community/theming';

const tegelTheme = createTegelTheme(themeQuartz)

<AgGridReact
    theme={tegelTheme}
    // Quartz uses the IBM Plex Sans font; load it from Google's CDN
    loadThemeGoogleFonts
    ...
/>

*/