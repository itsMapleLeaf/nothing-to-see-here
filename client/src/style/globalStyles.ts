import { injectGlobal } from "react-emotion"

import { backgroundColor, textColor } from "./colors"

export function applyGlobalStyles() {
  injectGlobal`
    :root {
      background-color: ${backgroundColor};
      color: ${textColor};
      font: 18px Roboto, sans-serif;
    }

    h1, h2, h3, h4, h5, h6 {
      margin: 0;
      font-family: 'Roboto Condensed';
      font-weight: 300;
    }

    a {
      color: inherit;
      text-decoration: none;
    }
  `
}
