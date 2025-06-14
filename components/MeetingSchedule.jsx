import Colors from '@/constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';
import * as Contacts from 'expo-contacts';
import React, { useEffect, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const MeetingSchedule = () => {
    const [meetingTitle, setMeetingTitle] = useState('')
    const [meetingDate, setMeetingDate] = useState(new Date())
    const [meetingTime, setMeetingTime] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [error, setError] = useState(undefined)
    const [contacts, setContacts] = useState(undefined)
    const [contactsAreSelected , setContactsSelected] = useState(false)

    useEffect(()=>{
        (async()=>{
            try {
                const {status} = await Contacts.requestPermissionsAsync()
                if(status === 'granted'){
                    const {data} = await Contacts.getContactsAsync({
                        field: [Contacts.Fields.FirstName]
                    })
                    
                    if(data.length > 0){
                        console.log(data)
                        setContacts(data)
                    }else{
                        setError('No contact found')
                    }
                }else{
                    setError('Access denied')
                }
            } catch (error) {
                setError(error)
            }
        })()
    },[])

    const onDatePickerChange = (event, selectedDate) => {
        if (event.type === 'set') {
            const currentDate = selectedDate || meetingDate
            if (Platform.OS === 'android') {
                setMeetingDate(currentDate)
                setShowDatePicker(false)
            }
        }
        else if (event.type === 'dismissed') {
            setShowDatePicker(false)
        }
    }

    const onTimePickerChange = (event, selectedTime) => {
        if (event.type === 'set') {
            const currentTime = selectedTime || meetingTime
            if (Platform.OS === 'android') {
                setMeetingTime(currentTime)
                setShowTimePicker(false)
            }
        } else if (event.type === 'dismissed') {
            setShowTimePicker(false)
        }
    }

    const formatDate = (date) => {
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        })
    }

    const formatTime = (date) => {
        return date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
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
                <Pressable onPress={() => setShowDatePicker(true)}>
                    <TextInput
                        value={formatDate(meetingDate)}
                        onChangeText={setMeetingDate}
                        editable={false}
                    />
                </Pressable>

                {showDatePicker === true && (
                    <DateTimePicker
                        mode='date'
                        display={Platform.OS === 'android' ? 'default' : 'spinner'}
                        value={meetingDate}
                        onChange={onDatePickerChange}
                        minimumDate={new Date('2025-1-1')}
                        maximumDate={new Date('2025-06-13')}
                    />
                )}
            </View>

            <View style={styles.textInput}>
                <Text>Time</Text>
                <Pressable onPress={() => setShowTimePicker(true)}>
                    <TextInput
                        value={formatTime(meetingTime)}
                        onChangeText={setMeetingTime}
                        editable={false}
                    />
                </Pressable>

                {showTimePicker === true && (
                    <DateTimePicker
                        mode='time'
                        display={Platform.OS === 'android' ? 'default' : 'spinner'}
                        value={meetingTime}
                        onChange={onTimePickerChange}
                    />
                )}
            </View>

            <View>
                <Text>Collaborators</Text>
                <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'95%'}}>
                    <View style={{display:'flex',flexDirection:'row'}}>
                        <View style={{width:48,height:48,borderRadius:30,backgroundColor:Colors.background.blue_light,margin:6}}></View>
                        <View style={{width:48,height:48,borderRadius:30,backgroundColor:Colors.background.blue_light,margin:6}}></View>
                        <View style={{width:48,height:48,borderRadius:30,backgroundColor:Colors.background.blue_light,margin:6}}></View>
                        <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center', width:48,height:48,margin:6,borderRadius:30,backgroundColor:Colors.background.secondary}}><Text style={{color:'white'}}>3+</Text></View>
                    </View>
                    <TouchableOpacity onPress={()=>setContactsSelected(!contactsAreSelected)} style={{ display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center', padding:10 , borderRadius:20 , borderWidth:1 , width:90}}>
                       { contactsAreSelected ? <Text>Add</Text> : <Text>Contacts</Text> }
                    </TouchableOpacity>
                </View>
                {error && <Text style={{ color: 'red' }}>{error}</Text>}
                { contactsAreSelected === true &&
                contacts &&  (
                    <ScrollView style={{width:'98%',marginTop:20}}>
                    {contacts.map((contact, index) => (
                        <View key={index} style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginVertical:10}}>
                            <Text>{contact.name}</Text>
                            <View style={{paddingHorizontal:20}}>
                            <Checkbox
                                value={false}
                            />
                            </View>
                        </View>
                    ))}
                    </ScrollView>
                )}
            
            </View>
        </View>
    )
}

export default MeetingSchedule

const styles = StyleSheet.create({
    container: {
        width: '95%',
        margin: 16
    },
    textInput: {
        marginBottom: 20
    }
})