
import React from "react";
import "./App.scss";

import Doc from "./components/Doc";
import Nav from "./components/Nav";

import GithubWindow from "./components/Windows/GithubWindow";
import NotesWindow from "./components/Windows/NotesWindow";
import ResumeWindow from "./components/Windows/ResumeWindow";

import AppProvider from "./context/App.context";

const App = () => {
  return (
    <AppProvider>
      <main>
        <Nav />
        <Doc />

        <GithubWindow />
        <NotesWindow />
        <ResumeWindow />
      </main>
    </AppProvider>
  );
};

export default App;
