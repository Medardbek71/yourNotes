import { View , Text} from "react-native"
import PressableIcons from "./PressableIcons"
import { useEffect, useState } from "react"
import { router } from "expo-router"
import { Image } from 'expo-image' 

export default function TopModal({setNoteType}){
    const [isActive1,toggleButtonState1] = useState(true)
    const [isActive2,toggleButtonState2] = useState(false)
    const [isActive3,toggleButtonState3] = useState(false)
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve,ms))
    const handlePress1 = () => {
        toggleButtonState1(true)
        setNoteType('normal')
    }
    const handlePress2 = () => {
        toggleButtonState2(true)
        setNoteType('checklist')
    }
    const handlePress3 = () => {
        toggleButtonState3(true)
        setNoteType('recipe')
    }

    useEffect(()=>{
        switch (isActive1==true) {
            case true:
                toggleButtonState2(false)
                toggleButtonState3(false)
                toggleButtonState1(true)
                break;
                default:
                    toggleButtonState1(false)
                    break;
                }
            },[isActive1])

    useEffect(()=>{
        switch (isActive2==true) {
            case true:
                toggleButtonState1(false)
                toggleButtonState3(false)
                toggleButtonState2(true)
            break;
            default:
                toggleButtonState2(false)
            break;
        }
     } ,[isActive2] )

    useEffect(()=>{
        switch (isActive3==true) {
            case true:
                sleep(2000)
                toggleButtonState1(false)
                toggleButtonState2(false)
                toggleButtonState3(true)
                router.push('/recipe')
                
            break;
            default:
                toggleButtonState3(false)
            break;
        }
    },[isActive3])

    return(
        <View className="flex-row h-50 mx-2 w-100% justify-center align-center">
            <PressableIcons name='sticky-note-o' isActive={isActive1} onPress={handlePress1} />
            <PressableIcons name='list-ul' isActive={isActive2} onPress={handlePress2} />
            <PressableIcons name='trash-o' isActive={isActive3} onPress={handlePress3} />
        </View>
    )
}