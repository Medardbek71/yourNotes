import Colors from '@/constants/Colors'
import { Image } from 'expo-image'
import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

const CreateScheduleButton = ({imgSrc , onPress}) => {
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
            backgroundColor:Colors.background.secondary,
            borderRadius:50
        }
    })
  return (
    <Pressable onPress={onPress}>
            <View style={style.pressable}>
                <Image
                source={imgSrc}
                style={{ width: 25, height: 25 }}
                />
           </View>
    </Pressable>
  )
}

export default CreateScheduleButton
