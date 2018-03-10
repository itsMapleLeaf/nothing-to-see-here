import { injectGlobal } from "styled-components"

import { backgroundColor, foregroundColorShade, textColor } from "./colors"

export function applyGlobalStyles() {
  injectGlobal`
    :root {
      font: 18px "Roboto", sans-serif;
      background-color: ${backgroundColor};
      color: ${textColor};
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: "Roboto Condensed", sans-serif;
      font-weight: 300;
      margin: 0;
      padding: 0;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    fieldset {
      border: none;
      padding: 0;
      margin: 1rem 0;
    }

    hr {
      border: none;
      border-top: 2px solid ${foregroundColorShade};
    }
  `
}
