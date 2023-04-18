import styled from "styled-components";

const NoteBox = styled.select`
    width: auto;
    background-color: black;
    
`

function NoteContent(){
    return(
        <div>
            <NoteBox>리엑트</NoteBox>
        </div>
    )
}

export default NoteContent;