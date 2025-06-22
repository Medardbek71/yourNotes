import Colors from '@/constants/Colors';
import { typography } from '@/constants/typography';
import Checkbox from 'expo-checkbox';
import { router } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Card ({note}){
    const database = useSQLiteContext()
    const [ noteData , setNoteData ] = useState(note)
    const [ isLoading , setIsLoading ] = useState(true)

    useEffect(()=>{
        const loadData = async()=>{
        try {
            setIsLoading(true)
            if(note.type === 'checklist'){
                const items = await database.getAllAsync('SELECT * FROM items WHERE note_id = ? ORDER BY id ASC',[note.id])
                setIsLoading(false)
                setNoteData({
                    items: items.map((item)=>({
                        id:item.id,
                        name:item.name,
                        checked:item.is_checked
                    }))
                })
            }
        } catch (error) {
            setIsLoading(false)
            console.error(error)
        }
    }
    loadData()  
    },[isLoading])

    const truncateText = (text,maxLength)=>{
        if(text.length >= maxLength){
            return text.substring(0,maxLength - 3)+'...'
        }else{
            return text
        }
    }

   
    const renderChecklist = ()=>{
        return(
            <Pressable style={styles.container} onPress={()=>router.push(`/Note?id=${note.id}`)}>
                <Text style={styles.title}>{note.title}</Text>
                { isLoading === false &&
                    noteData.items.slice(0,3).map(item => (
                        <View style = {styles.checkboxCard} key={item.id}>
                        <View style={styles.items}>
                            <Checkbox value={item.checked} color={Colors.background.secondary} />
                                <Text style={styles.text}>{item.name}</Text>
                            </View>
                        </View>
                    ))
                    }
                    {!isLoading && noteData.items.length> 3 && 
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                        <Text style={{fontFamily:'Inter-Regular',color:'white'}}> {noteData.items.length -3} autre(s) </Text> 
                    </View>
                }
        </Pressable>
        )
    }
    const renderNormalList = ()=>{
        return(
        <Pressable style={styles.container} onPress={()=>router.push(`/Note?id=${note.id}`)}>
            <Text style={styles.title}>{note.title}</Text>
            <Text style={styles.content}>{truncateText(note.content, 87)}</Text>
        </Pressable>
        )
    }

    const recipeList = () => {
        return(
        <Pressable style={styles.container} onPress={()=>router.push('/Note')}>
            <Text style={styles.title}>{note.title}</Text>
            {
                note.content.slice(0,3).map(item => (
                    <View key={item.id}>
                        <View style={styles.items}>
                            <Text style={styles.text}>• {item.name}</Text>
                        </View>
                    </View>
                ))
            }
            { note.content.length > 3 && 
                <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center',fontFamily:'Inter-Regular',color:'white'}}>
                    <Text style={{fontFamily:'Inter-Regular',color:'white'}}> autres</Text>
                </View>
            }
        </Pressable>
        )

        
    }
     const styles = StyleSheet.create({
        title:{
            fontSize:typography.header.fontSize,
            color: note.type === 'normal' ? Colors.text.primary : Colors.text.tertiary,
            fontFamily:'Inter-Regular',
            fontWeight:'normal',
            padding:5
        },
        content:{
            fontSize:typography.text.lg.fontSize,
            fontFamily:'Inter-Regular',
            color: note.type === 'normal' ? Colors.text.primary : Colors.text.tertiary,
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
            backgroundColor: note.type === 'normal' ? Colors.background.blue_light : note.type === 'checklist' ? Colors.background.tertiary : Colors.background.secondary
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
            color: note.type === 'normal' ? Colors.text.primary : Colors.text.tertiary,
            lineHeight:typography.text.lg.lineHeight,
            marginVertical:2,
            marginHorizontal:10,
            padding:3,
            alignItems:'center'
        }
    })

    return(
        <View>
            {note.type === 'normal' && renderNormalList()}
            {note.type === 'checklist' && renderChecklist()}
            {note.type === 'recipe' && recipeList()}
        </View>
    )
}
