import Reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
${Reset}
* {
    box-sizing: border-box;
    color: black;
  }
html{
  background-position: center;
  text-align: center;
  display:"inline";
  background-color: rgba(0,0,0,0.2);
}
button{
  background: #275efe;
  color: #fff;
  font-size: 14px;
  border-radius: 24px;
  padding: 12px 20px;
  font-weight: 500;
  font-family: 'Roboto';
}
`

export default GlobalStyle;