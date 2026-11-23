
import { createContext, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {

  const [isOpenGithub, setIsOpenGithub] = useState(false);
  const [isOpenNotes, setIsOpenNotes] = useState(false);
  const [isOpenResume, setIsOpenResume] = useState(false);

  // Open functions
  const openGithub = () => setIsOpenGithub(true);
  const openNotes = () => setIsOpenNotes(true);
  const openResume = () => setIsOpenResume(true);

  // Close functions
  const closeGithub = () => setIsOpenGithub(false);
  const closeNotes = () => setIsOpenNotes(false);
  const closeResume = () => setIsOpenResume(false);

  return (
    <AppContext.Provider
      value={{
        isOpenGithub,
        isOpenNotes,
        isOpenResume,
        openGithub,
        openNotes,
        openResume,
        closeGithub,
        closeNotes,
        closeResume
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
