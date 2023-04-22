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
    const getNoteLs : Notes[] = useFetch("http://localhost:3001/notes");

    useEffect(()=>{
        setNoteLs(getNoteLs);
    }, [getNoteLs]);

    useEffect(()=>{
    }, [noteLs]);

    const noteLsChange = () => {
        const copy = [...noteLs];
        let sortNoteLs = copy;
        if (searchKind.current === searchKinds[0]){
            sortNoteLs = copy.sort((a, b) => {
                if (a.createDate > b.createDate){
                    return 1
                }else{
                    return -1
                }
            })
        } else if (searchKind.current === searchKinds[1]){
            sortNoteLs = copy.sort((a, b) => {
                if (a.editDate > b.editDate){
                    return 1
                }else{
                    return -1
                }
            })
        }
        setNoteLs(sortNoteLs);
    }

    const searchChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        searchKind.current = e.target.value;
        noteLsChange();
    }

    const oninputEvent = (e : React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        if (searchValue){
            let sortNoteLs : Notes[] = ([]);
            const copy =[...getNoteLs];
            sortNoteLs = copy.filter((item) => {
                if(item.title.includes(searchValue)) {
                    return item
                }
            })
            if(sortNoteLs){
                setNoteLs(sortNoteLs);
            }
        }else{
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