import { Image } from 'expo-image'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const ScheduleHeader = ({bottomSheetType}) => {
    let icon
    switch (bottomSheetType) {
        case 'Appointment':
            icon = require('../assets/images/appointment.png')
            break;
        case 'Deadline':
            icon = require('../assets/images/deadline.png')
            break;
        case 'Event':
            icon = require('../assets/images/event.png')
            break;
        case 'Tracker':
            icon = require('../assets/images/tracker.png')
            break;
        case 'Meeting':
            icon = require('../assets/images/meeting.png')
        break;
        default:
            icon = require('../assets/images/fab2.png')
        break;
    }
  return (
    <View style={{width:'95%'}}>
        <View style={styles.container}>
            <Pressable onPress={()=>alert('Canceled')}>
                <Text> Cancel</Text>
            </Pressable>
            <View style={styles.centerImage}>
                <Image
                    source={icon}
                    style={{width:20,height:20,marginHorizontal:8}}
                />
            <Text>{bottomSheetType}</Text>
            </View>
            <Pressable onPress={()=>alert('saved')}>
                <Text>Save</Text>
            </Pressable>
        </View>
        <View style={styles.separator}></View>
    </View>
  )
}

export default ScheduleHeader

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'95%',
        margin:16
    },
    centerImage:{
        display:'flex',
        flexDirection:'row',
        width:'20%',
        justifyContent:'center',
    },
    separator:{
        marginTop:8,
        backgroundColor:'grey',
        width:'100%',
        height:1
    }
})