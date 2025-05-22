import Colors from '@/constants/Colors';
import { NoteContext } from '@/contexts/noteContext';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFonts } from "expo-font";
import { router } from 'expo-router';
import { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AddNoteCard ({allNotesAreVisible , setAllNotesVisibility}){
const [fontsLoaded] = useFonts({
    "Inter-Regular": require('../assets/fonts/Inter_28pt-Regular.ttf')
    })
    const style = StyleSheet.create({
        container:{
            width:171,
            height:200,
            padding:16,
            marginHorizontal:8,
            display:'flex',
            justifyContent:'center',
            borderRadius:6,
            fontFamily:'Inter-Regular',
            backgroundColor:Colors.background.primary,
        },
        semiContainer:{
            display:'flex',
            flexDirection:'column',
            width:171,
            height:95,
            marginBottom:10,
            marginHorizontal:8,
            padding:16,
            justifyContent:'center',
            borderRadius:6,
            fontFamily:'Inter-Regular',
            backgroundColor:Colors.background.primary,
        },
        semiContainerWrapper:{
            width:171,
            height:200,
            display:'flex',
            flexDirection:'column',
        }
    })
    const handlePress = () =>{
        router.push('/AddNote')
    }
    const {notes} = useContext(NoteContext)
    const showAllNotes = () => ( 
        setAllNotesVisibility(true),
        console.log(allNotesAreVisible)
    )

    if(notes.length <= 3 || allNotesAreVisible === true ){
        return(
            <TouchableOpacity onPress={handlePress}>
                <View style={style.container} >
                    <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                        <MaterialIcons name="add" size={60} color="black"/> 
                    </View>
                    <View  style={{marginLeft:10}}>
                        <Text className="text-xl" style={{fontFamily:'Inter-Regular'}}>Nouvelle note</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    else{
        return(
            <View style={style.semiContainerWrapper}>
                <View style={style.semiContainer}>
                    <TouchableOpacity onPress={showAllNotes}>
                        <FontAwesome6 name="arrow-right-long" size={30} color="black" />
                        <Text>Voir toutes</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.semiContainer}>
                    <TouchableOpacity onPress={handlePress}>
                        <MaterialIcons name="add" size={40} color="black"/>
                        <Text>Nouvelle note</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}