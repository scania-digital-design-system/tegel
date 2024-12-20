function initializeAssets() {
  const defaultCDN = 'https://cdn.digitaldesign.scania.com';
  const assetSource = (window as any).TEGEL_ASSET_SOURCE || defaultCDN;
  const root = document.documentElement;

  console.log(
    'Asset Source in Stencil:',
    assetSource,
    '\nTEGEL_ASSET_SOURCE value:',
    (window as any).TEGEL_ASSET_SOURCE,
    '\nUsing CDN:',
    assetSource === defaultCDN,
  );

  // Define all font-face declarations
  const fontFaces = `
    /* Scania Sans */
    @font-face {
      font-family: 'Scania Sans';
      src: url('${assetSource}/fonts/scania-sans/1.0.0/cyrillic/ScaniaSansCY-Bold.woff') format('woff');
      font-weight: bold;
      font-style: normal;
      unicode-range: U+0400-04FF;
    }
    @font-face {
      font-family: 'Scania Sans';
      src: url('${assetSource}/fonts/scania-sans/1.0.0/cyrillic/ScaniaSansCY-Italic.woff') format('woff');
      font-weight: normal;
      font-style: italic;
      unicode-range: U+0400-04FF;
    }
    @font-face {
      font-family: 'Scania Sans';
      src: url('${assetSource}/fonts/scania-sans/1.0.0/cyrillic/ScaniaSansCY-Regular.woff') format('woff');
      font-weight: normal;
      font-style: normal;
      unicode-range: U+0400-04FF;
    }

    /* Scania Sans Condensed */
    @font-face {
      font-family: 'Scania Sans Condensed';
      src: url('${assetSource}/fonts/scania-sans/1.0.0/cyrillic/ScaniaSansCYCondensed-Bold.woff') format('woff');
      font-weight: bold;
      font-style: normal;
      unicode-range: U+0400-04FF;
    }
    @font-face {
      font-family: 'Scania Sans Condensed';
      src: url('${assetSource}/fonts/scania-sans/1.0.0/cyrillic/ScaniaSansCYCondensed-Italic.woff') format('woff');
      font-weight: normal;
      font-style: italic;
      unicode-range: U+0400-04FF;
    }
    @font-face {
      font-family: 'Scania Sans Condensed';
      src: url('${assetSource}/fonts/scania-sans/1.0.0/cyrillic/ScaniaSansCYCondensed-Regular.woff') format('woff');
      font-weight: normal;
      font-style: normal;
      unicode-range: U+0400-04FF;
    }

    /* Scania Sans Headline */
    @font-face {
      font-family: 'Scania Sans Headline';
      src: url('${assetSource}/fonts/scania-sans/1.0.0/cyrillic/ScaniaSansCYHeadline-Bold.woff') format('woff');
      font-weight: bold;
      font-style: normal;
      unicode-range: U+0400-04FF;
    }
    @font-face {
      font-family: 'Scania Sans Headline';
      src: url('${assetSource}/fonts/scania-sans/1.0.0/cyrillic/ScaniaSansCYHeadline-Regular.woff') format('woff');
      font-weight: normal;
      font-style: normal;
      unicode-range: U+0400-04FF;
    }

    /* Scania Sans Semi Condensed */
    @font-face {
      font-family: 'Scania Sans Semi Condensed';
      src: url('${assetSource}/fonts/scania-sans/1.0.0/cyrillic/ScaniaSansCYSemiCondensed-Bold.woff') format('woff');
      font-weight: bold;
      font-style: normal;
      unicode-range: U+0400-04FF;
    }
    @font-face {
      font-family: 'Scania Sans Semi Condensed';
      src: url('${assetSource}/fonts/scania-sans/1.0.0/cyrillic/ScaniaSansCYSemiCondensed-Italic.woff') format('woff');
      font-weight: normal;
      font-style: italic;
      unicode-range: U+0400-04FF;
    }
    @font-face {
      font-family: 'Scania Sans Semi Condensed';
      src: url('${assetSource}/fonts/scania-sans/1.0.0/cyrillic/ScaniaSansCYSemiCondensed-Regular.woff') format('woff');
      font-weight: normal;
      font-style: normal;
      unicode-range: U+0400-04FF;
    }
  `;

  // Add font-face rules to document
  const style = document.createElement('style');
  style.textContent = fontFaces;
  document.head.appendChild(style);

  // Set font-family CSS variables
  root.style.setProperty('--tds-font-family-primary', 'Scania Sans, Arial, sans-serif');
  root.style.setProperty(
    '--tds-font-family-condensed',
    'Scania Sans Condensed, Arial Narrow, Arial, sans-serif',
  );
  root.style.setProperty('--tds-font-family-headline', 'Scania Sans Headline, Arial, sans-serif');
  root.style.setProperty(
    '--tds-font-family-semi-condensed',
    'Scania Sans Semi Condensed, Arial, sans-serif',
  );

  // Set logotype variables
  const logoPath = '/logos';
  const logotypes = [
    { name: 'logotype', format: ['png', 'svg'] },
    { name: 'symbol', format: ['png', 'svg'] },
    { name: 'wordmark', format: ['png', 'svg'] },
    { name: 'wordmark-white', format: ['png', 'svg'] },
  ];

  logotypes.forEach(({ name, format }) => {
    format.forEach((ext) => {
      root.style.setProperty(
        `--tds-logo-url-${name}-${ext}`,
        `url('${assetSource}${logoPath}/scania-${name}.${ext}')`,
      );
    });
  });

  // Debug: Log all font-face rules
  console.log(
    'Font-face rules:',
    Array.from(document.styleSheets).flatMap((sheet) => {
      try {
        return Array.from(sheet.cssRules)
          .filter((rule) => rule.type === CSSRule.FONT_FACE_RULE)
          .map((rule) => rule.cssText);
      } catch (e) {
        // Handle cross-origin stylesheet errors
        return [];
      }
    }),
  );

  // Verify settings
  console.log('Asset initialization complete:', {
    assetSource,
    fontFamilyPrimary: getComputedStyle(document.documentElement)
      .getPropertyValue('--tds-font-family-primary')
      .trim(),
    logoUrl: getComputedStyle(document.documentElement)
      .getPropertyValue('--tds-logo-url-logotype-svg')
      .trim(),
    usingCDN: assetSource === defaultCDN,
  });
}

// Initialize as early as possible
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAssets);
} else {
  initializeAssets();
}
