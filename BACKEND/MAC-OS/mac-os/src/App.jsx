
import React from "react";
import "./App.scss";

import Doc from "./components/Doc";
import Nav from "./components/Nav";

import GithubWindow from "./components/Windows/GithubWindow";
import NotesWindow from "./components/Windows/NotesWindow";
import ResumeWindow from "./components/Windows/ResumeWindow";
import YoutubeWindow from "./components/Windows/YoutubeWindow"
import AppProvider from "./context/App.context";
import LockScreen from "./components/LockScreen";

const App = () => {
  return (
    <AppProvider>
      <main>
        <LockScreen/>
        <Nav />
        <Doc />
        <GithubWindow />
        <NotesWindow />
        <ResumeWindow />
        <YoutubeWindow/>
      </main>
    </AppProvider>
  );
};

export default App;
