import { useSQLiteContext } from 'expo-sqlite'
import { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native'
import AddNoteCard from './AddNoteCard'
import Card from './Card'

export default function CardWrapper(){
    const [ allNotesAreVisible,setAllNotesVisibility ] = useState(false)
    const [ notes , setNotes ] = useState([])
    const [ loading , setLoading ] = useState(true)
    const database = useSQLiteContext()

    useEffect(()=>{
        const loadData = async() =>{
            try {
                setLoading(true)
                console.log('data is loading')
                const queryResults = await database.getAllAsync("SELECT * FROM notes ORDER BY id DESC;")
                console.log(queryResults)
                setLoading(false)
                setNotes(queryResults)
            } catch (error) {
                console.error(error)                
            }
        }
        loadData()
    },[database,loading])


    return( 
        <View style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
        <View style={style.container}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <AddNoteCard 
                    allNotesAreVisible={allNotesAreVisible} 
                    setAllNotesVisibility={setAllNotesVisibility}
                />
            { loading ? (
                <ActivityIndicator/>
            ) 
            :
                notes.map((item)=>{
                    return(
                        <Card key={item.id} note={item}/>
                    )
                })
            }

            </ScrollView>

                </View>
        </View>
    )
}
const style = StyleSheet.create({
container:{
    height:'auto',
    width:'95%',
    marginVertical:10,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:12,
    zIndex:5
}
})