import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

import ToastMsg from './../components/ToastMsg';
import moment from 'moment';
import 'moment/locale/ko';

const Container = styled.div`
  justify-content: center;
  display: flex;
  margin: 0 auto;

  .title{
    width: 100%;
    height: 25px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    display: inline;    
  }

  .content{
    width: 100%;
    height: 100px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    display: inline;
  }

  .bottomBtn{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

export default function EditPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [state, setState] = useState("");

  useEffect(() => {
    if (!(titleRef.current && contentRef.current)){
      return
    }
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

  function onSubmit(e : React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!(titleRef.current && contentRef.current)){
      return
    }

    const curTitle = titleRef.current.value;
    const curContent = contentRef.current.value;

    if (!curTitle) {
      ToastMsg("warnning", "제목을 입력해주세요.")
      titleRef.current.focus();
      return false;
    }
    if (!curContent) {
      ToastMsg("warnning", "내용을 입력해주세요.")
      contentRef.current.focus();
      return false;
    }

    const timeStamp = moment().format('YYYY-MM-DD HH:mm:ss');

    if (state === "create") {
      fetch(`http://localhost:3001/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: curTitle,
          content: curContent,
          createDate: timeStamp,
          editDate: null,
        }),
      }).then((res) => {
        if (res.ok) {
          ToastMsg("info", "노트가 작성되었습니다.")
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
          editDate: timeStamp,
        }),
      }).then((res) => {
        if (res.ok) {
          ToastMsg("info", "내용이 수정되었습니다.")
          navigate("/");
        }
      });
    } else {
      return;
    }
  }

  function del() {
    console.log("del!!");
    fetch(`http://localhost:3001/notes/${location.state.noteInfo.id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        ToastMsg("info", "노트를 삭제하였습니다.")
        navigate("/");
      }
    });
  }

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <input className="title" type="text" placeholder="title" ref={titleRef}></input>
        <textarea className="content" placeholder="content" ref={contentRef}></textarea>
        <p className="bottomBtn">
          {state === "edit" ? (
            <input type="button" value={"del"} onClick={del}></input>
          ) : (
            ""
          )}
          <button>{state}</button>
        </p>
      </form>
    </Container>
  );
}
