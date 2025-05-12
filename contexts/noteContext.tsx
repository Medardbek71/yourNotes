const { createContext } = require("react");

export const noteContext = createContext({
    notes:'',
    updateNotes:()=>{}
})

// export interface noteType {
//     id?:string
//     title:string
//     content:string
// }

// interface noteContextType {
//     notes:noteType[]
//     updateNotes:(notes:noteType[]) => void
// }

// export const noteContext = createContext({
//     notes:[],
//     updateNotes: () => {}
// });



// import { createContext } from 'react';

// // Définissons d'abord le type d'une note
// interface Note {
//   id: string;
//   title: string;
//   content: string;
//   // ... autres propriétés de note
// }

// // Définissons le type du contexte
// interface NoteContextType {
//   notes: Note[];
//   updateNotes: (notes: Note[]) => void;
// }

// // Création du contexte avec un état initial typé
// export const noteContext = createContext<NoteContextType>({
//   notes: [],
//   updateNotes: () => {},
// });