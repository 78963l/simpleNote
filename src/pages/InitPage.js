import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";

function initPage(){
    return(
        <div>
            <SearchBar />
            <div>
                <NoteList />
            </div>
        </div>
    )
}

export default initPage;