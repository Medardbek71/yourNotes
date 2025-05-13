import { Image } from 'expo-image'
import { StyleSheet, View } from 'react-native'


export default function ImageForEmptySpace(){
    const style = StyleSheet.create({
        image:{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            paddingVertical:40,
        }
    })
    return(
        <View style={style.image}>
            <Image
                source={require('../assets/images/emptyState.png')}
                style={{ width: 325, height: 325 }} 
            />
        </View>
    )
}