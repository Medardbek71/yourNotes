import { router } from "expo-router"
import { useEffect, useState } from "react"
import { Pressable, View } from "react-native"
import NotetypeTabs from "./NotetypeTabs"

export default function TopModal({setNoteType}){
    const [isActive1,toggleButtonState1] = useState(true)
    const [isActive2,toggleButtonState2] = useState(false)
    const [isActive3,toggleButtonState3] = useState(false)
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve,ms))
    const handlePress1 = () => {
        alert('boutton 1 appuyer')
        toggleButtonState1(true)
        setNoteType('normal')
    }
    const handlePress2 = () => {
        alert('boutton 2 appuyer')
        toggleButtonState2(true)
        setNoteType('checklist')
    }
    const handlePress3 = () => {
        toggleButtonState3(true)
        setNoteType('recipe')
    }

    useEffect(()=>{
        switch (isActive1===true) {
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
        switch (isActive2===true) {
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
        switch (isActive3===true) {
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
    console.log(isActive1)
    console.log(isActive2)
    console.log(isActive3)

    return(
        <View style={{display:'flex',flexDirection:'row',marginTop:18.5,marginHorizontal:22}}>
            <Pressable onPress={()=>handlePress1()}>
                <NotetypeTabs imgSrc={require('../assets/images/trailingIcon2.png')} isActive={isActive1}/>
            </Pressable>
            <Pressable onPress={()=>handlePress2()}>
                <NotetypeTabs imgSrc={require('../assets/images/checklist_dark.png')} isActive={isActive1} onPress={()=>handlePress2}/>
            </Pressable>
            <Pressable onPress={()=>handlePress3}>
                <NotetypeTabs imgSrc={require('../assets/images/cookerIcon_inactive.png')} isActive={isActive1} onPress={()=>handlePress3}/>
            </Pressable>
        </View>
    )
}