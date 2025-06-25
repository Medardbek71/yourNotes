import NoteHeader from '@/components/NoteHeader'
import { useLocalSearchParams } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Note = () => {
  const [ isLoading , setIsLoading ] = useState(false)
  const database = useSQLiteContext()
  const {id} = useLocalSearchParams()
  const [ noteContent , setNoteContent ] = useState('')
  const [ noteTitle , setNoteTitle ] = useState('')
  const [ noteType , setNoteType ] = useState('')
console.log(id)
  
  useEffect(()=>{
    const loadData = async (id)=>{
      try {
        setIsLoading(true)
        const queryResult = await database.getFirstAsync("SELECT * FROM notes WHERE id = ?;",[id])
        if (queryResult) {
          setNoteTitle(queryResult.title || '')
          setNoteContent(queryResult.content || '')
          setNoteType(queryResult.type || '')
          setIsLoading(false)
        }
      } catch (error) {
        console.error(error)
      }
    }
    loadData(id)
  },[id])

const handleTextChange = (text , id) => {
  ''
}

const handleToggle = () => {
  return('')
}

const renderUpdateNormalNote = () => (
  <TextInput 
    multiline={true}
    numberOfLines={4}  
    placeholder="Écrivez votre note ici"
    style={styles.noteInput}
    onChangeText={setNoteContent}
    value={noteContent}
  />
)

const renderUpdateChecklistNote = () => {
  const queryResults = database.getAllAsync('SELECT * FROM items WHERE note_id = ?;',[id])
  console.log(queryResults)
  // queryResults.map((item)=>{
  //   return(
  //     // <View key={item.id}>
  //     //   <Checkbox
  //     //     value={item.is_checked}
  //     //     onValueChange={() => handleToggle(item.id)}
  //     //     color={item.checked === true ? Colors.background.secondary : undefined}
  //     //     containerStyle={styles.checkbox}
  //     //   />
        
  //     //   <TextInput
  //     //     value={item.name}
  //     //     multiline={true}
  //     //     onChangeText={(text) => handleTextChange(text, item.id)}
  //     //     editable={true}
  //     //   /> 
  //     // </View>
  //     ''
  //   )
  // })
}

  return (
    <SafeAreaView>
      { isLoading === true ? <ActivityIndicator/> :
      <View style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <NoteHeader
          noteTitle={noteTitle}
          setNoteTitle={(text)=>setNoteTitle(text)}
          isEditMode={true}
          noteContent={noteContent}
          id={id}
        />
        {noteType === 'normal' && renderUpdateNormalNote()}
        {noteType === 'checklist' && renderUpdateChecklistNote()}
      </View>
      }
    </SafeAreaView>
  )
}
  const styles = StyleSheet.create({
    noteInput: {
    fontFamily: 'Inter-Regular',
    height:'90%',
    textAlignVertical: 'top',
    fontSize: 16,
    marginTop: 20,
    width: '95%',
  },
})

export default Note