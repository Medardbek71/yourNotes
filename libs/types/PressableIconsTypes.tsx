import FontAwesome from '@expo/vector-icons/FontAwesome';

export interface PressableIconsTypes {
    name: keyof typeof FontAwesome.glyphMap; 
    onPress?: ()=>void,
    color?: string,
    isActive?:boolean,
    isDisable?:boolean
    imgSrc:string
}