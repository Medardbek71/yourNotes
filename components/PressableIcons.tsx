import Colors from '@/constants/Colors';
import { PressableIconsTypes } from '@/libs/types/PressableIconsTypes';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet } from 'react-native';

export default function PressableIcons({name,onPress,color,isActive}:PressableIconsTypes){
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

    if(isActive === true){
        return (
        <Pressable onPress={onPress} style={style.active}>
            <FontAwesome 
                name={name} size={30}
                color = 'white'
            />
        </Pressable>
    ) 
    }else{
        return(
        <Pressable style={style.disable} onPress={onPress}>
            <FontAwesome 
                name={name} size={30}
                color= {color ? color : '#707B88'}
            />
        </Pressable>  
        )
    }
}
