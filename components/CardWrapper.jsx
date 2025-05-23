import { NoteContext } from '@/contexts/NoteContext'
import { useContext, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import AddNoteCard from './AddNoteCard'
import Card from './Card'

export default function CardWrapper(){
    const [allNotesAreVisible,setAllNotesVisibility] = useState(false)
    const style = StyleSheet.create({
        container:{
            height:'auto',
            width:'95%',
            marginVertical:10,
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            borderRadius:12
        }
    })
    const {notes,updateNotes} = useContext(NoteContext) 
    console.log(notes , updateNotes)
    return( 
        <View style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
        <View style={style.container}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
            {
                notes.length < 3 || allNotesAreVisible === true
                ?
                notes.reverse().map((note,index)=>(
                    <View key={note.id}>
                        <Card key={index} note={note}/>
                    </View>
                ))
                :
                notes.reverse().slice(0,3).map((note,index)=>(
                    <View key={note.id}>
                        <Card key={index} note={note}/>
                    </View>
                )) 
            }
                <AddNoteCard 
                    allNotesAreVisible={allNotesAreVisible} 
                    setAllNotesVisibility={setAllNotesVisibility}
                />
                {console.log(notes)}
                {console.log(notes.reverse())}
            </ScrollView>
                </View>
        </View>
    )
}