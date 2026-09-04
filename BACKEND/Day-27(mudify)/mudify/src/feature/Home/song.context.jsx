import { createContext, useState } from "react"

export const songContext = createContext()

// Capitalized "S" so React recognizes it as a component
export const SongContextProvider = ({ children }) => {
    const [song, setsong] = useState("song data")
    const [loading, setloading] = useState(false)

    return (
        <songContext.Provider value={{ loading, song, setloading, setsong }}>
            {children}
        </songContext.Provider>
    )
}
