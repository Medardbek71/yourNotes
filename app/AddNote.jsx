import TopModal from '@/components/TopModal'
import { NoteContext } from '@/contexts/NoteContext'
import { useContext, useEffect, useState } from 'react'
import { TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import DynamicCheckbox from '../components/DynamicCheckbox'
import NoteHeader from '../components/NoteHeader'

const AddNote = () => {
  const [ isOpen,toggleModal ] = useState(false)
  const [ noteIsEmpty , setNoteIsEmpty ] = useState(true)
  const [ noteTitle , setNoteTitle ] = useState('untitled')
  const [ noteContent , setNoteContent ] = useState('')
  const [ noteType , setNoteType ] = useState('normal')  
  const [ items , setItems ] = useState([{ id:Date.now() , text:'' , checked:false }])
  const { notes , updateNotes } = useContext(NoteContext)
  console.log(notes)
  
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
      id:Date.now(),
      type:noteType
    };
    updateNotes([...notes,note])
    alert('la note a été ajouté')
    setNoteContent('')
  }
  useEffect(()=>{
    if(noteType === 'normal'){
      if(noteContent.trim() !== ''){
        setNoteIsEmpty(false)
        console.log(notes)
      }
      else{
        setNoteIsEmpty(true)
        console.log(notes)
      }
    }else{
      if(items.lenght !== 0)
      setNoteIsEmpty(false)
    }

  },[noteContent,noteType])
  
  return (
    <SafeAreaView style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      <NoteHeader 
        isOpen={isOpen}
        noteIsEmpty={noteIsEmpty} 
        setIsOpen={toggleModal} 
        saveNote={saveNote}
        noteTitle={noteTitle}
        setNoteTitle={setNoteTitle}
      />

      { isOpen === true && <TopModal setNoteType={setNoteType} /> }
      {
        noteType === 'normal'
      ? 
      <View style={{flex:1 , width:'90%',display:'flex',flexDirection:'row',justifyContent:'center'}}>
        <TextInput 
          multiline={true}
          numberOfLines={4}  
          placeholder="Ecrivez votre note ici"
          style={{fontFamily:'Inter-Regular', height:1000 , textAlignVertical:'top',fontSize:16,marginTop:20,width:'95%'}}
          onChangeText={(text) => setNoteContent(text)}
          value={noteContent}
          />
        </View>
      : 
        <DynamicCheckbox items={items} setItems={setItems}/>
      }
  </SafeAreaView>
  )
}

export default AddNote