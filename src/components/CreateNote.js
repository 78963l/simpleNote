import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

const Title = styled.input`
  width: 250px;
  height: 25px;
  margin: 10px;
  border-radius: 5px;
  display: inline;
`;

const Content = styled.textarea`
  width: 250px;
  height: 100px;
  margin: 10px;
`;

function CreateNote() {
  const navigate = useNavigate();
  const location = useLocation();

  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const [note, setNote] = useState([]);
  const [state, setState] = useState("");
  
  useEffect(() => {

    let noteTitle = null;
    let noteContent = null;
    if (location.state) {
      noteTitle = location.state.title;
      noteContent = location.state.content;
      titleRef.current.value = noteTitle;
      contentRef.current.value = noteContent;
      setState("edit");
    } else {
      setState("create");
    }
  }, []);

  function onSubmit(e) {
    e.preventDefault();

    const title = titleRef.current.value;
    const content = contentRef.current.value;

    if (!title) {
      return alert("title을 작성해주세요.");
    }
    if (!content) {
      return alert("content를 작성해주세요.");
    }

    console.log(title);
    console.log(content);

    if (state === "create") {
      fetch(`http://localhost:3001/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      }).then((res) => {
        if (res.ok) {
          alert("note create complete!");
        }
      });
    } else if (state === "edit") {
      console.log("edit");
      fetch(`http://localhost:3001/notes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <p>
          <Title type="text" placeholder="title" ref={titleRef}></Title>
        </p>
        <p>
          <Content placeholder="content" ref={contentRef}></Content>
        </p>
        <p>
          <button>{state}</button>
        </p>
      </form>
    </div>
  );
}

export default CreateNote;
