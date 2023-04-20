import styled from "styled-components";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from 'react';

const Notecontainer = styled.div`
    height: 350px;
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */

::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
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
  const [scrollY, setScrollY] = useState();

  if (noteLs.length === 0) {
    return <span>Loading...</span>;
  }

  const onDragStart = ((e)=>{
    e.preventDefault();
    setIsDrag(true);
    setStartY(e.pageY + scrollRef.current.scrollTop);
    setScrollY(scrollRef.current.scrollTop);
  })

  const onDragEnd = (() => {
    setIsDrag(false);
  })

  const onDragMove = (e) => {
    if (isDrag) {
        scrollRef.current.scrollTop = startY - e.pageY;
    }
  };


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

    const noteOnClick = (note) => {
        if(scrollY === scrollRef.current.scrollTop){
            navigate(`/create`, { state: { noteInfo: note } })
        }
    }

  return (
    <div>
    <Notecontainer ref={scrollRef}
    onMouseDown={onDragStart}
    onMouseMove={onThrottleDragMove}
    onMouseUp={onDragEnd}
    onMouseLeave={onDragEnd}
    >
      {noteLs.map((note) => (
        <NoteBox key={note.id} onClick={() => {noteOnClick(note)}}>
          <h2 className="noteTitle">{note.title}</h2>
          <p className="noteContent">{note.content}</p>
        </NoteBox>
      ))}
    </Notecontainer>
    </div>
  );
}
