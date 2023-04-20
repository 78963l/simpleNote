import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

const Container = styled.div`
  width: 250px;
  justify-content: center;
  display: flex;
  margin: 0 auto;

  .Title input {
  }
`;

const Title = styled.input`
  width: 100%;
  height: 25px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: inline;
`;

const Content = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: inline;
`;

const BottomBtn = styled.p`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export default function CreateNote() {
  const navigate = useNavigate();
  const location = useLocation();

  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const [state, setState] = useState("");

  useEffect(() => {
    if (location.state) {
      setState("edit");
      const noteInfo = location.state.noteInfo;
      titleRef.current.value = noteInfo.title;
      contentRef.current.value = noteInfo.content;
    } else {
      setState("create");
      titleRef.current.value = "";
      contentRef.current.value = "";
    }
    titleRef.current.focus();
  }, []);

  function onSubmit(e) {
    const curTitle = titleRef.current.value;
    const curContent = contentRef.current.value;

    if (!curTitle) {
      alert("title을 작성해주세요.");
      titleRef.current.focus();
      return false;
    }
    if (!curContent) {
      alert("content를 작성해주세요.");
      contentRef.current.focus();
      return false;
    }

    e.preventDefault();

    if (state === "create") {
      fetch(`http://localhost:3001/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: curTitle,
          content: curContent,
        }),
      }).then((res) => {
        if (res.ok) {
          alert("note create complete!");
          navigate("/");
        }
      });
    } else if (state === "edit") {
      fetch(`http://localhost:3001/notes/${location.state.noteInfo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...location.state.noteInfo,
          title: curTitle,
          content: curContent,
        }),
      }).then((res) => {
        if (res.ok) {
          navigate("/");
        }
      });
    } else{
      return
    }
  }

  function del(){
    console.log("del!!")
    fetch(`http://localhost:3001/notes/${location.state.noteInfo.id}`, {
      method: "DELETE",
    }).then(res => {
      if(res.ok){
        alert("삭제되었습니다.");
        navigate('/');
      }
    })
  }

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Title type="text" placeholder="title" ref={titleRef}></Title>
        <Content placeholder="content" ref={contentRef}></Content>
        <BottomBtn>
          {state === "edit" ? <input type="button" value={"del"} onClick={del}></input> : ""}
          <button>{state}</button>
        </BottomBtn>
      </form>
    </Container>
  );
}
