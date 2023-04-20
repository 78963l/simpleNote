import styled from "styled-components";

const SearchBarInput = styled.input`
    width: 200px;
    height: 25px;
    margin: 10px;
    margin-left: 0px;
`

const SearchSel = styled.select`
    width: 100px;
    height: 25px;
`

export default function SearchBar(){
    const oninputEvent = (e : React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    }

    const selectList = ["최근생성순", "최근수정순"]
    return(
        <div>
            <SearchBarInput placeholder="search" onChange={oninputEvent}></SearchBarInput>
            <SearchSel>
                {selectList.map((data, index)=>(
                    <option key={index}>{data}</option>
                ))}
            </SearchSel>
        </div>
    )
}