import { useNavigate } from 'react-router-dom';

import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";

function initPage(){
    const navigate = useNavigate();

    return(
        <div>
            <SearchBar />
            <div>
                <NoteList />
                <button onClick={() => navigate('/create')}>Create</button>
            </div>
        </div>
    )
}

export default initPage;