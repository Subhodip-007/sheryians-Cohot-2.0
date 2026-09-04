import { useContext } from "react";
import { getSong } from "../services/song.api";
import { songContext } from "../song.context";

export const useSong=()=>{
    const context = useContext(songContext)
    const {loading,setloading,song, setsong} = context

    const handleGetSong =async  ({mood})=>{
        setloading(true)
        const data = await getSong({mood})
        setsong(data.song)
        setloading(false)
    }
    return({loading,song,handleGetSong})
}