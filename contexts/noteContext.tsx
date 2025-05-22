import { createContext } from "react"

export const NoteContext = createContext({
    notes:[],
    updateNotes:()=>{}
})