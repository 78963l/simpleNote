import styled from "styled-components";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const Notecontainer = styled.div`
    height: 350px;
    overflow: scroll;
`;

const NoteBox = styled.div`
  width: 310px;
  height: 70px;
  padding: 5px;
  background-color: pink;
  margin: 0 auto;
  margin-bottom: 20px;
  border: 2px;
  border-radius: 8px;
  text-align: start;

  .noteTitle {
    font-size: large;
    padding: 5px;
  }

  .noteContent {
    font-size: medium;
    padding: 5px;
  }
`;

export default function NoteContent() {
  const noteLs = useFetch("http://localhost:3001/notes");
  const navigate = useNavigate();

  if (noteLs.length === 0) {
    return <span>Loading...</span>;
  }

  return (
    <Notecontainer>
      {noteLs.map((note) => (
        <NoteBox
          key={note.id}
          onClick={() => navigate(`/create`, { state: { noteInfo: note } })}
        >
          <h2 className="noteTitle">{note.title}</h2>
          <p className="noteContent">{note.content}</p>
        </NoteBox>
      ))}
    </Notecontainer>
  );
}
