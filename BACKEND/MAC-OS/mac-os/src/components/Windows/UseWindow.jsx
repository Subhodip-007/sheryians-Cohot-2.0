
import React, { useContext } from "react";
import { Rnd } from "react-rnd";
import "../../shared/UseWindow.scss";
import { AppContext } from "../../context/App.context";

const UseWindow = ({ children, windowId }) => {

  const { closeGithub, closeNotes, closeResume,closeYoutube } =
    useContext(AppContext);

  const closeFunctions = {
    github: closeGithub,
    notes: closeNotes,
    resume: closeResume,
    youtube: closeYoutube
  };

  const handleClose = () => {
    closeFunctions[windowId]?.();
  };

  return (
    <Rnd
      bounds="parent"
      default={{
        x: 100,
        y: 100,
        width: 500,
        height: 400
      }}
      minWidth={500}
      minHeight={400}
      dragHandleClassName="nav"
      cancel=".dots"
    >
      <div className="window">

        <div className="nav">

          <div className="left">
            <div className="dots">

              <button
                className="dots red"
                onClick={handleClose}
                aria-label="Close window"
              />

              <button
                className="dots yellow"
                aria-label="Minimize window"
              />

              <button
                className="dots green"
                aria-label="Maximize window"
              />

            </div>
          </div>

          <div className="right"></div>

        </div>

        <div className="main-cont">
          {children}
        </div>

      </div>
    </Rnd>
  );
};

export default UseWindow;

