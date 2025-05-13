import Card from '@/components/Card'
import { noteContext } from '@/contexts/noteContext'
import { useContext, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import AddNoteCard from './AddNoteCard'

export default function CardWrapper({setModalState}){
    const showNote = ()=> {
        ''
    }
    const {notes} = useContext(noteContext)
    const [allNotesAreVisible,setAllNotesVisibility] = useState(false)
    const style = StyleSheet.create({
        container:{
            height:'auto',
            width:'100%',
            paddingVertical:10,
        }
    })
    const reversedNotes = notes.reverse()
    return(
        <View style={style.container}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {
                    notes.length < 3 || allNotesAreVisible === true
                    ?
                    notes.map((note,index)=>(
                        <View key={Date.now}>
                            <Card key={index} note={note}/>
                        </View>
                    ))
                    :
                    notes.slice(0,3).map((note,index)=>(
                        <View key={Date.now+1}>
                            <Card key={index} note={note}/>
                        </View>
                    )) 

                }
                <AddNoteCard 
                    allNotesAreVisible={allNotesAreVisible} 
                    setAllNotesVisibility={setAllNotesVisibility}
                />
            </ScrollView>
        </View>
    )
}