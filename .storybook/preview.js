import React from "react";
import { DocsContainer } from "@storybook/addon-docs";
import { defineCustomElements } from "../core/loader";
import { useDarkMode } from "storybook-dark-mode";

import { addons } from "@storybook/addons";
import { UPDATE_GLOBALS } from "@storybook/core-events";
import "./preview.css";
import "../color/dist/css/color.css";
import "../grid/dist/css/grid.css";
import "../core/dist/tegel/tegel.css";

// https://github.com/storybookjs/storybook/issues/6364
// - Look for: sarangk-hotstar commented on 23 Jun 2021
// - Look for: Cochonours commented on 14 May
// Test below one in Netlify/Amplify build
import ScaniaThemeDark from "./ScaniaThemeDark";
import ScaniaThemeLight from "./ScaniaThemeLight";

const customViewports = {
  xs: {
    name: "grid-xs",
    styles: {
      width: "607px",
      height: "963px",
    },
  },
  sm: {
    name: "grid-sm",
    styles: {
      width: "608px",
      height: "963px",
    },
  },
  md: {
    name: "grid-md",
    styles: {
      width: "800px",
      height: "801px",
    },
  },
  lg: {
    name: "grid-lg",
    styles: {
      width: "992px",
      height: "1200px",
    },
  },
  xlg: {
    name: "grid-xlg",
    styles: {
      width: "1184px",
      height: "1400px",
    },
  },
  xxlg: {
    name: "grid-xxlg",
    styles: {
      width: "1367px",
      height: "1600px",
    },
  },
  max: {
    name: "grid-max",
    styles: {
      width: "1584px",
      height: "1680px",
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true,
  },
  viewport: { viewports: customViewports },
  docs: {
    // Fix for dark mode not working on docs tab
    container: (props) => {
      const isDark = useDarkMode();

      const { id: storyId, storyById } = props.context;
      const {
        parameters: { docs = {} },
      } = storyById(storyId);
      docs.theme = isDark ? ScaniaThemeDark : ScaniaThemeLight;

      return React.createElement(DocsContainer, props);
    },
    source: {
      state: "open",
    },
  },
  // storybook-dark-mode plugin
  darkMode: {
    current: "light",
    // Override the default dark theme
    dark: ScaniaThemeDark,
    // Override the default light theme
    light: ScaniaThemeLight,
    darkClass: "sdds-mode-dark",
    lightClass: "sdds-mode-light",
    stylePreview: true,
  },
  backgrounds: {
    default: "white",
    values: [
      {
        name: "grey-50",
        value: "#F9FAFB",
      },
      {
        name: "white",
        value: "#FFFFFF",
      },
      {
        name: "grey-900",
        value: "#1d2229",
      },
      {
        name: "grey-958",
        value: "#0d0f13",
      },
    ],
  },
  options: {
    storySort: {
      method: "alphabetical",
      order: [
        "Intro",
        ["Tegel", "Migrating from components v4", "Installation", "Events"],
        "Foundations",
        "Utilities",
        "Patterns",
        "Components",
      ],
    },
    enableShortcuts: false,
  },
  layout: "padded",
};

// Below is some hacky code that changes selected background when the theme changes
// Inspiration links:
// https://github.com/storybookjs/storybook/issues/12982#issuecomment-865304427
// https://github.com/storybookjs/storybook/blob/9eeb6ddfdd09a64c554843380187d27a41a8a235/addons/backgrounds/src/containers/BackgroundSelector.tsx#L100
// https://github.com/hipstersmoothie/storybook-dark-mode/blob/bdb64ee8302bb95c23ebc2709ed3fe88431072f3/src/index.tsx
if (!window.SDDS_DID_SUBSCRIBE_DARK_BG) {
  window.SDDS_DID_SUBSCRIBE_DARK_BG = true;
  const darkModeBgColor = parameters.backgrounds.values.find(
    ({ name }) => name === "grey-958"
  ).value;
  const lightModeBgColor = parameters.backgrounds.values.find(
    ({ name }) => name === "grey-50"
  ).value;
  const channel = addons.getChannel();
  channel.emit(UPDATE_GLOBALS, {
    globals: { backgrounds: { value: lightModeBgColor } },
  });
  channel.on("DARK_MODE", (isDarkMode) => {
    if (
      (isDarkMode && !window.SDDS_DARK_BG) ||
      (!isDarkMode && window.SDDS_DARK_BG)
    ) {
      channel.emit(UPDATE_GLOBALS, {
        globals: {
          backgrounds: {
            value: isDarkMode ? darkModeBgColor : lightModeBgColor,
          },
        },
      });
      window.SDDS_DARK_BG = isDarkMode;
    }
  });
}

defineCustomElements();
