import styled from "styled-components";
import txtSize from "../styles/txtSize";

const TitleTxt = styled.h1`
    font-weight: 700;
    font-size: ${txtSize.large};
    margin-bottom: 20px;
`

const SubTxt = styled.h2`
    font-weight: 400;
    font-size: ${txtSize.medium};
    margin-bottom: 12px;
`

function Header(props){
    return(
        <div>
            <header>
                <TitleTxt href="/"><a href="/">{props.title}</a></TitleTxt>
                <SubTxt>{props.sub}</SubTxt>
            </header>
        </div>
    )
}

export default Header;