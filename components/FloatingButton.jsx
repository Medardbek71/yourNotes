import Colors from '@/constants/Colors';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

export default function FloatingButton({ imgSrc, onPress , isActive }) {
    if(isActive ===  undefined ){
        isActive = false
    }
    
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
            backgroundColor: isActive === false && Colors.background.tertiary,
            borderRadius:50
        }
    })
    return(
        <Pressable onPress={isActive === false ? onPress : null}>
            <View style={style.pressable}>
                <Image
                    source={imgSrc}
                    style={{ width: 25, height: 25 }}
                />
            </View>
        </Pressable>
    )
}