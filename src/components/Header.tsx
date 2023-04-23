import styled from "styled-components";
import txtSize from "../styles/txtSize";
import {useState} from "react";

const TitleTxt = styled.h1`
    font-weight: 700;
    font-size: ${txtSize.large};
    margin-bottom: 20px;
`

const SubTxt = styled.h3`
    font-weight: 400;
    font-size: ${txtSize.small};
    margin-bottom: 12px;
`

interface Iprops {
    props : ITitle;
}

export interface ITitle{
    title : string;
    sub : string;
}

export default function Header({props : p} : Iprops){
    return(
        <div>
            <header style={{textAlign:"start"}}>
                <TitleTxt><a href="/">{p.title}</a></TitleTxt>
                <SubTxt><a>{p.sub}</a></SubTxt>
            </header>
        </div>
    )
}