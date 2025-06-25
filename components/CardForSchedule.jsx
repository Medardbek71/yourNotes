import Colors from '@/constants/Colors'
import { typography } from '@/constants/typography'
import Checkbox from 'expo-checkbox'
import { useSQLiteContext } from 'expo-sqlite'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'


const CardForSchedule = () => {
    const database = useSQLiteContext()
    const [ noteIsLoading , setNoteIsLoading] = useState(true)
    const [ itemsIsLoading , setItemsIsLoading] = useState(true)
    const [ notes , setNotes ] = useState(null)
    const [ items , setItems ] = useState('')
    const [ numberOfItemsUnDisplay , setNumberOfItemsUndisplay] = useState(null)

    useEffect(()=>{
    const loadData = async() =>{
        try {
            const notes = await database.getAllAsync('SELECT * FROM notes ORDER BY id DESC')
            setNotes(notes)
            setNoteIsLoading(false)
        } catch (error) {
            console.error(error)
        }finally{
            setNoteIsLoading(false)
        }
    }
    loadData()
    },[])

    useEffect(()=>{
        const loadItems = async () => {
            try {
                setItemsIsLoading(true)
                const itemMap = {}
                for (const note of notes) {
                    const noteItems = await database.getAllAsync('SELECT * FROM items WHERE note_id = ? ',[note.id])
                    itemMap[note.id] = noteItems
                }
                setItems(itemMap)
                setItemsIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        loadItems()
    },[noteIsLoading,notes])

  return (
      <ScrollView 
        horizontal={true}
      >
        {!noteIsLoading && 
             notes.map((note)=>(
                note.type === 'normal' ? 
                <Pressable key={note.id}
                    onPress={()=>alert('vous venez de selectionner element numero'+note.id)}
                    style={[styles.container,{backgroundColor:Colors.background.primary}]}
                >
                    <Text style={styles.title}>{note.title}</Text>
                    <Text style={[styles.content,{color: Colors.text.primary}]}>{note.content}</Text>
                </Pressable> 
                : note.type === 'checklist'?
                <Pressable
                    style={[styles.container,{backgroundColor:Colors.background.tertiary}]}
                    onPress={()=>alert('vous venez de selectionner element numero '+note.id)}
                >
                <Text style={[styles.title , {color:Colors.background.light}]}>{note.title}</Text>
                    { !itemsIsLoading && items[note.id] ? (
                        <View>
                            <View>
                            {items[note.id].slice(0,3).map((item)=>(
                                <View key={note.id} style={styles.items}>
                                    <Checkbox
                                        value={item.is_checked}
                                        color={Colors.background.secondary}
                                        />
                                    <Text style={[styles.text,{color:'white'}]}>{item.name}</Text>
                                </View>
                            ))}
                            </View>
                                {items[note.id].length > 3 && 
                                <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                                    <Text>{items.length}</Text>
                                    <Text style={{fontFamily:'Inter-Regular',color:'white'}}>{items[note.id].length-3} autre(s) </Text> 
                                </View>}
                        </View>
                    ) :
                    <View style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <ActivityIndicator color={'white'}/>
                    </View>
                }

                </Pressable>
                 : null
            ))
        }
    </ScrollView>
)


}

export default CardForSchedule

const styles = StyleSheet.create({
     title:{
                fontSize:typography.header.fontSize,
                // 
                fontFamily:'Inter-Regular',
                fontWeight:'normal',
                padding:5
            },
            content:{
                fontSize:typography.text.lg.fontSize,
                fontFamily:'Inter-Regular',
                // color: note.type === 'normal' ? Colors.text.primary : Colors.text.tertiary,
                lineHeight:typography.text.lg.lineHeight,
                padding:5
            },
            container:{
                width:171,
                height:200,
                marginRight:8,
                padding:8,
                borderRadius:6,
                lineHeight:100,
                fontFamily:'Inter-Regular',
                // backgroundColor: note.type === 'normal' ? Colors.background.blue_light : note.type === 'checklist' ? Colors.background.tertiary : Colors.background.secondary
            },
            checkboxCard:{
                flexDirection:'row'
            },
            items:{
                flexDirection:'row',
                alignItems:'center',
                marginLeft:5
            },
            text:{
                fontSize:typography.text.lg.fontSize,
                fontFamily:'Inter-Regular',
                // color: note.type === 'normal' ? Colors.text.primary : Colors.text.tertiary,
                lineHeight:typography.text.lg.lineHeight,
                marginVertical:2,
                marginHorizontal:10,
                padding:3,
                alignItems:'center'
            }
})
