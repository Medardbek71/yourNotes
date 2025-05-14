import Colors from '@/constants/Colors'
import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const NotetypeTabs = ({imgSrc,isActive,name}) => {
    const styles = StyleSheet.create({
    notetypeTabs:{
      width:94,
      height:69,
      backgroundColor: isActive === true ? Colors.background.secondary : Colors.background.primary,
      marginHorizontal:10,
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
      borderRadius:10
    },  
    bottomText:{
     fontFamily:'Inter',
     color: isActive === true ? 'white': Colors.text.primary
    }
    
})
  return (
    <View style={styles.notetypeTabs}>
        <Image
            source={imgSrc}
            style={{width:24,height:24}}
        />
      <Text style={styles.bottomText}>{name}</Text>
    </View>
  )
}

export default NotetypeTabs