import Reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
${Reset}
* {
    box-sizing: border-box;
  }
.html{
  background-position: center;
}
`

const test = createGlobalStyle`
*{
  background-po..
}
`

export default GlobalStyle;