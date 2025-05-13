import Colors from '@/constants/Colors';
import { PressableIconsTypes } from '@/libs/types/PressableIconsTypes';
import { Image } from 'expo-image';
import { Pressable, StyleSheet } from 'react-native';

export default function PressableIcons({imgSrc,onPress,isActive}:PressableIconsTypes){
const style = StyleSheet.create({
    active:{
        width:'30%',
        backgroundColor:Colors.background.secondary,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        color:'white',
        padding:16,
        marginHorizontal:4,
        borderRadius:6
    },
    disable:{
        width:'30%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        color:Colors.text.primary,
        padding:16,
        marginHorizontal:4,
        borderRadius:6
    }
})
        return(
        <Pressable onPress={onPress}>
            <Image
                source={imgSrc}
                style={{width:24,height:24}}
            />
        </Pressable>  
        )
    }
