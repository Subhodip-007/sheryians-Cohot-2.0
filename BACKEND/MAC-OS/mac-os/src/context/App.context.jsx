
import { FlatTree } from "framer-motion";
import { createContext, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {

  const [isOpenGithub, setIsOpenGithub] = useState(false);
  const [isOpenNotes, setIsOpenNotes] = useState(false);
  const [isOpenResume, setIsOpenResume] = useState(false);
  const [isOpenYoutube , setIsOpenYoutube] = useState(false);
   const [isUnlocked, setIsUnlocked] = useState(false);
   const [isMusicPlaying, setIsMusicPlaying] = useState(false);
const [currentTrack, setCurrentTrack] = useState("");
  // Open functions
  const openLock = () => setIsUnlocked(true)
  const openGithub = () => setIsOpenGithub(true);
  const openNotes = () => setIsOpenNotes(true);
  const openResume = () => setIsOpenResume(true);
  const openYoutube = () => setIsOpenYoutube(true);

  // Close functions
  const closeLock = () => setIsUnlocked(false)
  const closeGithub = () => setIsOpenGithub(false);
  const closeNotes = () => setIsOpenNotes(false);
  const closeResume = () => setIsOpenResume(false);
  const closeYoutube = () => setIsOpenYoutube(false);

  return (
    <AppContext.Provider
      value={{
        isOpenGithub,
        isOpenNotes,
        isOpenResume,
        isOpenYoutube,
        isUnlocked,
        openLock,
        openGithub,
        openNotes,
        openResume,
        openYoutube,
        closeGithub,
        closeNotes,
        closeResume,
        closeYoutube,
        closeLock,
        isMusicPlaying,
setIsMusicPlaying,
currentTrack,
setCurrentTrack,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
