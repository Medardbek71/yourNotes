import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import DateTimePicker, { useDefaultStyles } from 'react-native-ui-datepicker';

const MeetingSchedule = () => {
    const [ meetingTitle , setMeetingTitle ] = useState('')
    const [ meetingDate , setMeetingDate ] = useState('')
    const defaultStyles = useDefaultStyles();
    const [selected, setSelected] = useState();

  return (
    <View style={styles.container}>
        <View style={styles.textInput}>
            <Text>Meeting Time</Text>
            <TextInput
                value={meetingTitle}
                onChangeText={setMeetingTitle}
                placeholder='Enter meeting Title'
            />
        </View>
        <View style={styles.textInput}>
            <Text>Date</Text>
            <TextInput
                value={meetingDate}
                onChangeText={setMeetingDate}
                placeholder='Select date'
                keyboardType='date'
            />
            <DateTimePicker
            mode="single"
            date={selected}
            onChange={({ date }) =>  setSelected(date)}
            styles={defaultStyles}
            />
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