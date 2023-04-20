import styled from "styled-components";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from 'react';

const Notecontainer = styled.div`
    height: 350px;
    overflow-y: scroll;

::-webkit-scrollbar {
    display: none;
}
`

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
  const scrollRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startY, setStartY] = useState();

  if (noteLs.length === 0) {
    return <span>Loading...</span>;
  }

  const onDragStart = ((e)=>{
    console.log("onDragStart")
    console.log(scrollRef.current.scrollTop)
    e.preventDefault();
    setIsDrag(true);
    setStartY(e.pageY + scrollRef.current.scrollTop);
  })

  const onDragEnd = (() => {
    setIsDrag(false);
  })

  const onDragMove = ((e) => {
    if (isDrag) {
        scrollRef.current.scrollTop = startY - e.pageY;
    }
  })

  const delay = 10;
  const throttle = (func, ms) => {
    let throttled = false;
    return (...args) => {
      if (!throttled) {
        throttled = true;
        setTimeout(() => {
          func(...args);
          throttled = false;
        }, ms);
      }
    };
  };
  
    const onThrottleDragMove = throttle(onDragMove, delay);

  return (
    <Notecontainer ref={scrollRef}
    onMouseDown={onDragStart}
    onMouseMove={onThrottleDragMove}
    onMouseUp={onDragEnd}
    onMouseLeave={onDragEnd}
    >
      {noteLs.map((note) => (
        <NoteBox
          key={note.id}
          onClick={() => {
            if(!isDrag){
                navigate(`/create`, { state: { noteInfo: note } })
            }
          }}
        >
          <h2 className="noteTitle">{note.title}</h2>
          <p className="noteContent">{note.content}</p>
        </NoteBox>
      ))}
    </Notecontainer>
  );
}
