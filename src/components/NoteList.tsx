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

interface Notes {
  id: number,
  title: string,
  content: string,
}

export default function NoteContent() {
  const noteLs : Notes[] = useFetch("http://localhost:3001/notes");
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLInputElement>(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startY, setStartY] = useState<number>();
  const [scrollY, setScrollY] = useState<number>();

  if (noteLs.length === 0) {
    return <p style={{margin:"50px"}}><span>None Data...</span></p>;
  }

  const onDragStart = (e : React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
    e.preventDefault();
    setIsDrag(true);
    if (scrollRef.current){
    setStartY(e.pageY + scrollRef.current.scrollTop);
    setScrollY(scrollRef.current.scrollTop);
    }
  };

  const onDragEnd = (() => {
    setIsDrag(false);
  })

  const onDragMove = (e : React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDrag) {
      if (scrollRef.current && startY) {
        scrollRef.current.scrollTop = startY - e.pageY;
      }
    }
  };


  const delay = 10;
  const throttle = (func: (...args: any[]) => void, ms: number) => {
    let throttled = false;
    return (...args: any[]) => {
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

    const noteOnClick = (note : Notes) => {
      if(scrollRef.current){
        if(scrollY === scrollRef.current.scrollTop){
          navigate(`/create`, { state: { noteInfo: note } })
        }
      } 
    }

  return (
    <div>
    <Notecontainer
    ref={scrollRef}
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
