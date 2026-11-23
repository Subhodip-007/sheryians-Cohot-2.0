
import React, { useState, useEffect, useContext } from "react";
import "../../shared/StickyNote.scss";
import UseWindow from "./UseWindow";
import { AppContext } from "../../context/App.context";


const NotesWindow = () => {

  const { isOpenNotes } = useContext(AppContext);

  const [text, setText] = useState(
    () => localStorage.getItem("my-sticky-note") || ""
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("my-sticky-note", text);
    }, 300);

    return () => clearTimeout(timer);
  }, [text]);

  if (!isOpenNotes) return null;

  return (
    <UseWindow windowId="notes">

      <div className="sticky-note">

        <div className="note-header">
          <span>My Notes</span>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write something..."
          autoFocus
        />

      </div>

    </UseWindow>
  );
};

export default NotesWindow;
