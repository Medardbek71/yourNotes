import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View , Pressable, StyleSheet} from 'react-native';

export default function FloatingButton({ name, onPress , isActive }) {
    const style = StyleSheet.create({
        pressable:{
            position:'absolute',
            bottom:10,
            right:40,
            height:70,
            width:70,
            display:'flex',
            justifyContent:'center',
            flexDirection:'row',
            alignItems:'center',
            backgroundColor: isActive == false || undefined ? 'grey' : 'black',
            borderRadius:50
        }
    })
    return(
        <Pressable onPress={isActive == false || undefined ? ()=>'' : onPress}>
            <View style={style.pressable}>
                <FontAwesome 
                name={name}
                size={30} 
                color="white" 
                />
            </View>
        </Pressable>
    )
}