import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import NoteContent, { Notes } from "../components/NoteContent";
import { useRef, useState } from 'react';
import useFetch from './../hooks/useFetch';
import { useEffect } from 'react';

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

export default function InitPage(){
    const navigate = useNavigate();

    const searchKinds = ["최근생성순", "최근수정순"]
    const searchKind = useRef<string>('');
    const [noteLs, setNoteLs] = useState<Notes[]>([]);
    const [searchTxt, setSearchTxt] = useState<string>('');
    const getNoteLs : Notes[] = useFetch("http://localhost:3001/notes");

    useEffect(()=>{
        setNoteLs(getNoteLs)
    }, [getNoteLs]);


    const noteLsChange = () => {
        let copy = [...noteLs];
        console.log("noteLsChange")
        console.log(searchKind)
        if (searchKind.current === searchKinds[0]){
            const sortNoteLs = copy.sort((a, b) => {
                if (a.createDate > b.createDate){
                    return 1
                }else{
                    return -1
                }
            })
            console.log(sortNoteLs)
            setNoteLs(sortNoteLs);
        } else if (searchKind.current === searchKinds[1]){
            const sortNoteLs = noteLs.sort((a, b) => {
                if (a.editDate > b.editDate){
                    return 1
                }else{
                    return -1
                }
            })
            console.log(sortNoteLs);
            setNoteLs(sortNoteLs);
        }
    }
    

    const searchChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        searchKind.current = e.target.value;
        noteLsChange();
    }

    const oninputEvent = (e : React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        if (searchValue){
            const copy =[...noteLs]
            const res = copy.filter((item) => {
                if(item.title.toUpperCase().includes(searchValue.toUpperCase())) {
                    return item
                }
            });
            setNoteLs(res);
        } else{
            setNoteLs(getNoteLs);
        }
    }

    return(
        <div>
            <SearchBarInput placeholder="search" onChange={oninputEvent}></SearchBarInput>
            <SearchSel onChange={searchChange}>
                {searchKinds.map((data, index)=>(
                    <option key={index}>{data}</option>
                ))}
            </SearchSel>
            <div>
                <NoteContent noteLs={noteLs}/>
                <button onClick={() => navigate('/edit')}>Create</button>
            </div>
        </div>
    )
}