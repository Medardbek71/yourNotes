import Colors from '@/constants/Colors'
import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const NotetypeTabs = ({imgSrc,isActive}) => {
    const style = StyleSheet.create({
    NotetypeTabs:{
        width:94,
        height:69,
        backgroundColor: isActive === false ? Colors.background.secondary : Colors.background.primary,
        marginHorizontal:10,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    }
})
  return (
    <View style={style.NotetypeTabs}>
        <Image
            source={imgSrc}
            style={{width:24,height:24}}
        />
      <Text>Riz sauté</Text>
    </View>
  )
}

export default NotetypeTabs