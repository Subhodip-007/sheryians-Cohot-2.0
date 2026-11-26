
import React, { useContext } from "react";
import "../shared/Doc.scss";
import { AppContext } from "../context/App.context";




const Doc = () => {

  const {
    openGithub,
    openNotes,
    openResume,
    openYoutube,
    closeLock
  } = useContext(AppContext);

  return (
    <footer className="Doc-container">

      <button className="icon github" onClick={openGithub}>
        <img src="/link.svg" alt="GitHub" />
      </button>

      <button className="icon note" onClick={openNotes}>
        <img src="/note.svg" alt="Notes" />
      </button>

      <button className="icon pdf" onClick={openResume}>
        <img src="/resume.svg" alt="Resume" />
      </button>

      <button className="icon mail" onClick={openYoutube}>
        <img src="/mail.svg" alt="Mail" />
      </button>

    </footer>
  );
};

export default Doc;
