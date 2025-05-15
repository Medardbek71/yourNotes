import { noteContext } from '@/contexts/noteContext'
import { useState } from 'react'
import { TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import DynamicCheckbox from '../components/DynamicCheckbox'
import NoteHeader from '../components/NoteHeader'
import TopModal from '@/components/TopModal'

const AddNote = () => {
  const [ isOpen,toggleModal ] = useState(true)
  const [ noteIsEmpty , setNoteIsEmpty ] = useState(true)
  const [ noteTitle , setNoteTitle ] = useState('note sans titre')
  const [ noteContent , setNoteContent ] = useState('')
  const [ noteType , setNoteType ] = useState('normal')  
  const [ items , setItems ] = useState([{ id:1 , text:'' , checked:false }])
//   const hideSubModal = ()=>(isOpen === true ? toggleModal(false) : toggleModal(true))
const { updateNotes , notes } = noteContext

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
}
  return (
    <SafeAreaView>
      <NoteHeader 
        isOpen={isOpen}
        noteIsEmpty={noteIsEmpty} 
        setIsOpen={toggleModal} 
        saveNote={saveNote}
      />

      { isOpen === true && <TopModal setNoteType={setNoteType} /> }
      {
        noteType === 'normal'
      ? 
      <TextInput 
        multiline={true}
        numberOfLines={4}  
        placeholder="Ecrivez votre note ici"
        style={{fontFamily:'Inter-Regular', height:100 , textAlignVertical:'top',fontSize:20,flex:'1',marginTop:20,width:'95%'}}
        onChangeText={(text) => setNoteContent(text)}
        value={noteContent}
      />
      : 
        <DynamicCheckbox items={items} setItems={setItems}/>
      }
  </SafeAreaView>
  )
}

export default AddNote