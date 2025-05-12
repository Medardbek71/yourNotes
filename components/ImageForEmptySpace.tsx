import {View , StyleSheet} from 'react-native'
import {Image} from 'expo-image'


export default function ImageForEmptySpace(){
    const style = StyleSheet.create({
        image:{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            paddingVertical:100
        }
    })
    return(
        <View style={style.image}>
            <Image
                source={require('../assets/images/emptyState.png')}
                style={{ width: 300, height: 200 }} 
            />
        </View>
    )
}