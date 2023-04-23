import Reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
${Reset}
* {
    box-sizing: border-box;
  }
html{
  background-position: center;
  text-align: center;
  display:"inline";
}
`

export default GlobalStyle;