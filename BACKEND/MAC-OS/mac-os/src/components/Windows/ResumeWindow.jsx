
import React, { useContext } from "react";
import "../../shared/ReaumeWindow.scss";
import UseWindow from "./UseWindow";
import { AppContext } from "../../context/App.context";

const ResumeWindow = () => {

  const { isOpenResume } = useContext(AppContext);

  if (!isOpenResume) return null;

  return (
    <UseWindow windowId="resume">

      <div className="resume-window">

        <iframe
          src="/subhodip_resume.pdf"
          title="Subhodip Resume"
        />

      </div>

    </UseWindow>
  );
};

export default ResumeWindow;
