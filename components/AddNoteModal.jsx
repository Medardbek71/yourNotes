import { Modal, TextInput, TouchableOpacity, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import TopModal from "./TopModal";
import { noteContext } from '@/contexts/noteContext';
import DynamicCheckbox from "./DynamicCheckbox";
import NoteHeader from '@/components/NoteHeader.jsx'

export default function AddNoteModal({ modalIsOpen ,setModalState }){
    const closeModal = ()=> (setModalState(false))
    const [ isOpen,toggleModal ] = useState(true)
    const [ noteIsEmpty , setNoteIsEmpty ] = useState(true)
    const [ noteTitle , setNoteTitle ] = useState('note sans titre')
    const [ noteContent , setNoteContent ] = useState('')
    const [ noteType , setNoteType ] = useState('normal')  
    const [ items , setItems ] = useState([{ id:1 , text:'' , checked:false }])
    const hideSubModal = ()=>(isOpen == true ? toggleModal(false) : toggleModal(true))
    const {notes,updateNotes} = useContext(noteContext)   


    useEffect(() => {
        setNoteIsEmpty(!noteContent || noteContent.length === 0 || noteContent[0] === ' ');
    },[noteContent,items]);
    
    useEffect(()=>{
        if(noteType === 'checklist'){
            setNoteIsEmpty(!noteContent || noteContent.length === 0 || noteContent[0] === ' ');
            setNoteContent(items)
        }
    },[items ,noteContent ,noteType])

    useEffect(()=>{
        if(noteType === 'checklist'){
            const hasNotEmptyItem = items.some(item => item.text.trim() !== '')
            setNoteIsEmpty(!hasNotEmptyItem)
            return ;
        }
        setNoteContent(noteContent)
    }),[items,noteType]

    function saveNote(){
        const note = {
            title:noteTitle,
            content: noteType === 'checklist' 
            ?
            items.map(item => ({
                text: item.text,
                checked: item.checked
            }))
            :
            noteContent,
            type:noteType
        };
        updateNotes([...notes,note])
        setModalState(false)
    }
    
    useEffect(()=>{
        setNoteContent('')
        setNoteTitle('')
    },[notes])        

    return (
        <Modal visible={modalIsOpen} transparent={false} animationType="slide">
            <NoteHeader 
                isOpen={isOpen}
                noteIsEmpty={noteIsEmpty} 
                setIsOpen={toggleModal} 
                saveNote={saveNote}
            />

            { isOpen == true && <TopModal setNoteType={setNoteType} /> }
            {
                noteType == 'normal'
            ? 
            <TextInput 
                className="m-8"
                multiline={true}
                numberOfLines={4}  
                placeholder="Ecrivez votre note ici"
                style={{fontFamily:'Inter-Regular', height:100 , textAlignVertical:'top',fontSize:'20px',flex:'1'}}
                onChangeText={(text) => setNoteContent(text)}
                value={noteContent}
            />
            : 
                <DynamicCheckbox items={items} setItems={setItems}/>
            }
        </Modal>
    )
}