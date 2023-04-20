import { useNavigate } from 'react-router-dom';

import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";

export default function InitPage(){
    const navigate = useNavigate();

    return(
        <div>
            <SearchBar />
            <div>
                <NoteList />
                <button onClick={() => navigate('/edit')}>Create</button>
            </div>
        </div>
    )
}