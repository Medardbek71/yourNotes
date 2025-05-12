import { View, TextInput , TouchableOpacity} from 'react-native'
import React from 'react'
import PressableIcons from "./PressableIcons";
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';

const NoteHeader = ({saveNote,isOpen,setIsOpen,noteIsEmpty}) => {
    const [ noteTitle , setNoteTitle ] = useState('note sans titre')
    const backButton = ()=> router.back()
    const handleSubModal = () => {
        if(isOpen === true){
            setIsOpen(false)
        }else if (isOpen === false){
            setIsOpen(true)
        }
    }

  return (
        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around',width:'100%', marginBottom:25}}>
            <View style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row',width:'70%'}}>
                <View>
                    <PressableIcons name={'chevron-left'} onPress={backButton} color="black"/>
                </View>
                <TextInput 
                    className="px-4 w-9/12 text-xl"
                    style={{fontFamily:'Inter-Regular'}}
                    onChangeText={(text)=>setNoteTitle(text)}
                    value={noteTitle}
                    />
            </View>
            <View style={{width:'30%',display:'flex',justifyContent:'space-around',flexDirection:'row'}}>
                <View>
                    <PressableIcons name={'sticky-note-o'} color="black" onPress={handleSubModal}/>
                </View>
                <View style={{display:'flex',justifyContent:'center',alignContent:'center'}}>
                    {
                        noteIsEmpty == true
                        ?
                        <TouchableOpacity className="flex-row items-center" onPress={''}>
                            <FontAwesome name={'check'} size={30} color = '#b9bcbe'/>
                        </TouchableOpacity>  
                        :
                        <TouchableOpacity className="flex-row items-center" onPress={saveNote}>
                            <FontAwesome name={'check'} size={30} color = 'black'/>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>

  )
}

export default NoteHeader