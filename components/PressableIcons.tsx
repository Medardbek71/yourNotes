import { PressableIconsTypes } from '@/libs/types/PressableIconsTypes';
import { Image } from 'expo-image';
import { Pressable } from 'react-native';

export default function PressableIcons({imgSrc,onPress,isActive}:PressableIconsTypes){
    return(
        <Pressable onPress={onPress}>
            <Image
                source={imgSrc}
                style={{width:24,height:24}}
            />
        </Pressable>  
        )
    }
