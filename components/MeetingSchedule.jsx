import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';


const MeetingSchedule = () => {
    const [ meetingTitle , setMeetingTitle ] = useState('')
    const [ meetingDate , setMeetingDate ] = useState(new Date())
    const [ showPicker , setShowPicker ] = useState(false)

    const onDatePickerChange = (event,selectedDate)=>{
        if(event.type === 'set'){
            const currentDate = selectedDate || meetingDate
            if(Platform.OS === 'android'){
                setMeetingDate(currentDate)
                setShowPicker(false)
            }
        }
        else if (event.type === 'dismissed'){
            setShowPicker(false)
        }
    }

    const formatDate = (date)=>{
        return date.toLocaleDateString('fr-Fr',{
            year:'numeric',
            month:'numeric',
            day:'numeric'
        })
    }
    
    return (
    <View style={styles.container}>
        <View style={styles.textInput}>
            <Text>Meeting Title</Text>
            <TextInput
                value={meetingTitle}
                onChangeText={setMeetingTitle}
                placeholder='Enter meeting Title'
            />
        </View>
        <View style={styles.textInput}>
            <Text>Date</Text>
            <Pressable
                onPress={()=>setShowPicker(true)}
            >
                <TextInput
                    value={formatDate(meetingDate)}
                    onChangeText={setMeetingDate}
                    editable={false} 
                />
            </Pressable>

        { showPicker === true &&(<DateTimePicker
            mode='date'
            display={Platform.OS === 'android' ? 'default' : 'spinner'}
            value={meetingDate}
            onChange={onDatePickerChange}
            minimumDate={new Date('2025-1-1')}
            maximumDate={new Date('2025-06-13')}
        />)}
        </View>
    </View>
  )
}

export default MeetingSchedule

const styles = StyleSheet.create({
    container:{
        width:'95%',
        margin:16
    },
    textInput:{
        marginBottom:20
    }
})