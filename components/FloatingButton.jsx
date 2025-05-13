import Colors from '@/constants/Colors';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

export default function FloatingButton({ imgSrc, onPress , isActive }) {
    
    const style = StyleSheet.create({
        pressable:{
            position:'absolute',
            bottom:30,
            right:50,
            height:70,
            width:70,
            display:'flex',
            justifyContent:'center',
            flexDirection:'row',
            alignItems:'center',
            backgroundColor: isActive === false || undefined ? 'grey' : Colors.background.tertiary,
            borderRadius:50
        }
    })
    return(
        <Pressable onPress={isActive === false || undefined ? ()=>'' : onPress}>
            <View style={style.pressable}>
                <Image
                    source={imgSrc}
                    style={{ width: 60, height: 60 }}
                />
            </View>
        </Pressable>
    )
}