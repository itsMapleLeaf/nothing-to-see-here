import { injectGlobal } from "react-emotion"

import { backgroundColor, textColor } from "./colors"

export function applyGlobalStyles() {
  injectGlobal`
    :root {
      background-color: ${backgroundColor};
      color: ${textColor};
      font: 18px Roboto, sans-serif;
      word-wrap: break-word;
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

    fieldset {
      border: none;
      margin: 1rem;
      padding: 0;
    }

    label {
      display: block;
      margin-bottom: 0.3rem;
    }

    input, button, textarea {
border: none;
    }
  `
}
