import Colors from '@/constants/Colors';
import { typography } from '@/constants/typography';
// import { NoteContext } from '@/contexts/noteContext';
import { useFonts } from "expo-font";
import { router } from "expo-router";
// import { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CheckBox } from "react-native-elements";

export default function Card ({note}){
    // const noteContextValue = useContext(NoteContext)

    const showNote = ()=>{
        router.push({
            pathname:'/note/[note]',
            params:note
        })
    }

    const [fontsLoaded] = useFonts({
        "Inter-Regular": require('../assets/fonts/Inter_28pt-Regular.ttf')
    })
    console.log(note)
    const numberOfItemsUnDisplay = note.content.length - 3
    const styles = StyleSheet.create({
        title:{
            fontSize:typography.header.fontSize,
            color: note.type === 'normal' ? Colors.text.primary : Colors.text.tertiary,
            fontFamily:'Inter-Regular',
            fontWeight:'normal',
            marginVertical:8,
            padding:5
        },
        content:{
            fontSize:typography.text.lg.fontSize,
            fontFamily:'Inter-Regular',
            color: note.type === 'normal' ? Colors.text.primary : Colors.text.tertiary,
            lineHeight:typography.text.lg.lineHeight,
            marginVertical:8,
            padding:5,
        },
        container:{
            width:171,
            height:200,
            marginHorizontal:8,
            padding:8,
            borderRadius:6,
            lineHeight:100,
            fontFamily:'Inter-Regular',
            backgroundColor: note.type === 'normal' ? Colors.background.blue_light : Colors.background.tertiary
        },
        checkboxCard:{
            display:'flex',
            flexDirection:'row'
        },
        items:{
            display:'flex',
            flexDirection:'row',
        },
        text:{
            fontSize:typography.text.lg.fontSize,
            fontFamily:'Inter-Regular',
            color: note.type === 'normal' ? Colors.text.primary : Colors.text.tertiary,
            lineHeight:typography.text.lg.lineHeight,
            marginVertical:2,
            padding:3,
            display:'flex',
            alignItems:'center'
        }
    })
    return(
        <Pressable style={styles.container} onPress={showNote}>
            { note.type === 'normal' ? 
                <View>
                    <Text style={styles.title}>{note.title}</Text>
                    <Text style={styles.content}>{note.content}</Text>
                </View>
            : 
            <View key={note.id}>
                <Text style={styles.title}>{note.title}</Text>
                {
                    note.content.slice(0,3).map(item => (
                        <View style = {styles.checkboxCard} key={`${Date.now()}-item-${note.id}`}>
                            <View style={styles.items}>
                                <CheckBox checked={item.checked} uncheckedColor='white' checkedColor='white' backgroundColor={'yellow'} containerStyle = {{padding:0,margin:0, display:'flex',flexDirection:'row', alignItems:'center'}} />
                                <Text style={styles.text}>{item.text}</Text>
                            </View>
                        </View>
                    ))
                }
                
                { note.content.length > 3 && 
                    <View style={{display:'flex',flexDirection:'row', justifyContent:'flex-start', alignItems:'center',marginTop:15,fontFamily:'Inter-Regular',color:'white'}}> <Text style={{fontFamily:'Inter-Regular',color:'white'}}> {numberOfItemsUnDisplay === 1 ?  <Text>{numberOfItemsUnDisplay} autre</Text> : <Text> {numberOfItemsUnDisplay} autres </Text> }  </Text></View>
                }
                </View>
            }
        </Pressable>
    )
    
}
