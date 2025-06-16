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
    const [contacts, setContacts] = useState([])
    const [collaboratorList, setCollaboratorList] = useState([])
    const [contactsAreSelected, setContactsSelected] = useState(false)
    const [selectedContacts, setSelectedContacts] = useState({})
    const [parentScrollEnabled, setParentScrollEnabled] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const { status } = await Contacts.requestPermissionsAsync()
                if (status === 'granted') {
                    const { data } = await Contacts.getContactsAsync({
                        fields: [Contacts.Fields.FirstName, Contacts.Fields.LastName, Contacts.Fields.ID]
                    })
                    
                    if (data.length > 0) {
                        setContacts(data)
                        // Initialiser les états des checkboxes
                        const initialSelected = {}
                        data.forEach(contact => {
                            initialSelected[contact.id] = false
                        })
                        setSelectedContacts(initialSelected)
                    } else {
                        setError('No contact found')
                    }
                } else {
                    setError('Access denied')
                }
            } catch (error) {
                setError(error.message || 'Une erreur est survenue')
            }
        })()
    }, [])

    const toggleContactSelection = (contactId, contactName) => {
        // Déterminer la nouvelle valeur AVANT de mettre à jour l'état
        const isCurrentlySelected = selectedContacts[contactId] || false
        const newSelectedValue = !isCurrentlySelected
        
        // Mettre à jour l'état des checkboxes
        setSelectedContacts(prev => ({
            ...prev,
            [contactId]: newSelectedValue
        }))
        
        // Gérer la liste des collaborateurs basé sur la NOUVELLE valeur
        if (newSelectedValue) {
            // Contact sélectionné : ajouter à la liste
            setCollaboratorList(prev => {
                // Vérifier si déjà présent pour éviter les doublons
                const exists = prev.some(collab => collab.id === contactId)
                if (!exists) {
                    return [...prev, { id: contactId, name: contactName }]
                }
                return prev
            })
        } else {
            // Contact désélectionné : retirer de la liste
            setCollaboratorList(prev => prev.filter(collab => collab.id !== contactId))
        }
    }

    const onDatePickerChange = (event, selectedDate) => {
        if (event.type === 'set') {
            const currentDate = selectedDate || meetingDate
            setMeetingDate(currentDate)
            if (Platform.OS === 'android') {
                setShowDatePicker(false)
            }
        } else if (event.type === 'dismissed') {
            setShowDatePicker(false)
        }
    }

    const onTimePickerChange = (event, selectedTime) => {
        if (event.type === 'set') {
            const currentTime = selectedTime || meetingTime
            setMeetingTime(currentTime)
            if (Platform.OS === 'android') {
                setShowTimePicker(false)
            }
        } else if (event.type === 'dismissed') {
            setShowTimePicker(false)
        }
    }
console.log(parentScrollEnabled)
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

    const getContactDisplayName = (contact) => {
        if (contact.firstName && contact.lastName) {
            return `${contact.firstName} ${contact.lastName}`
        } else if (contact.firstName) {
            return contact.firstName
        } else if (contact.name) {
            return contact.name
        } else {
            return 'Contact sans nom'
        }
    }

    return (
        <ScrollView 
            style={styles.container}
            scrollEnabled={false}
            keyboardShouldPersistTaps="handled"
            onScroll={()=>console.log('Mouf')}
        >
            <View style={styles.textInput}>
                <Text style={styles.label}>Meeting Title</Text>
                <TextInput
                    style={styles.input}
                    value={meetingTitle}
                    onChangeText={setMeetingTitle}
                    placeholder='Enter meeting Title'
                />
            </View>
            
            <View style={styles.textInput}>
                <Text style={styles.label}>Date</Text>
                <Pressable onPress={() => setShowDatePicker(true)}>
                    <TextInput
                        style={styles.input}
                        value={formatDate(meetingDate)}
                        editable={false}
                    />
                </Pressable>

                {showDatePicker && (
                    <DateTimePicker
                        mode='date'
                        display={Platform.OS === 'android' ? 'default' : 'spinner'}
                        value={meetingDate}
                        onChange={onDatePickerChange}
                        minimumDate={new Date()}
                        maximumDate={new Date('2025-12-31')}
                    />
                )}
            </View>

            <View style={styles.textInput}>
                <Text style={styles.label}>Time</Text>
                <Pressable onPress={() => setShowTimePicker(true)}>
                    <TextInput
                        style={styles.input}
                        value={formatTime(meetingTime)}
                        editable={false}
                    />
                </Pressable>

                {showTimePicker && (
                    <DateTimePicker
                        mode='time'
                        display={Platform.OS === 'android' ? 'default' : 'spinner'}
                        value={meetingTime}
                        onChange={onTimePickerChange}
                    />
                )}
            </View>

            <View style={styles.collaboratorSection}>
                <Text style={styles.label}>Collaborators ({collaboratorList.length})</Text>
                <View style={styles.collaborator}>
                    <View style={styles.avatarContainer}>
                        {collaboratorList.slice(0, 3).map((collab, index) => (
                            <View key={index} style={styles.avatar}>
                                <Text style={styles.avatarText}>
                                    {collab.name.charAt(0).toUpperCase()}
                                </Text>
                            </View>
                        ))}
                        {collaboratorList.length > 3 && (
                            <View style={styles.moreButton}>
                                <Text style={styles.moreButtonText}>{collaboratorList.length - 3}+</Text>
                            </View>
                        )}
                    </View>
                    <TouchableOpacity 
                        onPress={() => setContactsSelected(!contactsAreSelected)} 
                        style={styles.addContact}
                    >
                        <Text style={styles.addContactText}>
                            {contactsAreSelected ? 'Fermer' : 'Contacts'}
                        </Text>
                    </TouchableOpacity>
                </View>
                
                {error && <Text style={styles.errorText}>{error}</Text>}
                
                {contactsAreSelected && contacts && contacts.length > 0 && (
                    <View style={styles.collaboratorList} scrollTo={true}>
                        <ScrollView 
                            scrollEnabled={true}
                            showsVerticalScrollIndicator={true}
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={styles.scrollViewContent}
                            bounces={false}
                            overScrollMode="never"
                            directionalLockEnabled={true}
                            onScrollBeginDrag={() => {
                                // Désactiver le scroll du parent quand on commence à scroller la liste
                                setParentScrollEnabled(false);
                                alert('Mouf')
                            }}
                            onScrollEndDrag={() => {
                                // Réactiver le scroll du parent quand on arrête de scroller la liste
                                setParentScrollEnabled(true);
                                console.log('Muf')
                            }}
                            onMomentumScrollEnd={() => {
                                // Réactiver le scroll du parent après l'inertie
                                setParentScrollEnabled(true);
                                console.log('Le taxi')
                            }}
                        >
                            {contacts.map((contact, index) => (
                                <TouchableOpacity
                                    key={contact.id || index}
                                    style={styles.contactView}
                                    onPress={() => toggleContactSelection(contact.id, getContactDisplayName(contact))}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.contactName}>
                                        {getContactDisplayName(contact)}
                                    </Text>
                                    <Checkbox
                                        value={selectedContacts[contact.id] || false}
                                        onValueChange={() => toggleContactSelection(contact.id, getContactDisplayName(contact))}
                                        style={styles.checkbox}
                                        color={Colors?.background?.tertiary || '#007AFF'}
                                    />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}
            </View>
                        <View style={styles.textInput}>
                <Text style={styles.label}>Date</Text>
                <Pressable onPress={() => setShowDatePicker(true)}>
                    <TextInput
                        style={styles.input}
                        value={formatDate(meetingDate)}
                        editable={false}
                    />
                </Pressable>

                {showDatePicker && (
                    <DateTimePicker
                        mode='date'
                        display={Platform.OS === 'android' ? 'default' : 'spinner'}
                        value={meetingDate}
                        onChange={onDatePickerChange}
                        minimumDate={new Date()}
                        maximumDate={new Date('2025-12-31')}
                    />
                )}
            </View>
                        <View style={styles.textInput}>
                <Text style={styles.label}>Date</Text>
                <Pressable onPress={() => setShowDatePicker(true)}>
                    <TextInput
                        style={styles.input}
                        value={formatDate(meetingDate)}
                        editable={false}
                    />
                </Pressable>

                {showDatePicker && (
                    <DateTimePicker
                        mode='date'
                        display={Platform.OS === 'android' ? 'default' : 'spinner'}
                        value={meetingDate}
                        onChange={onDatePickerChange}
                        minimumDate={new Date()}
                        maximumDate={new Date('2025-12-31')}
                    />
                )}
            </View>
                        <View style={styles.textInput}>
                <Text style={styles.label}>Date</Text>
                <Pressable onPress={() => setShowDatePicker(true)}>
                    <TextInput
                        style={styles.input}
                        value={formatDate(meetingDate)}
                        editable={false}
                    />
                </Pressable>

                {showDatePicker && (
                    <DateTimePicker
                        mode='date'
                        display={Platform.OS === 'android' ? 'default' : 'spinner'}
                        value={meetingDate}
                        onChange={onDatePickerChange}
                        minimumDate={new Date()}
                        maximumDate={new Date('2025-12-31')}
                    />
                )}
            </View>
        </ScrollView>
    )
}

export default MeetingSchedule

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },
    textInput: {
        marginBottom: 20
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: '#fff'
    },
    collaboratorSection: {
        marginBottom: 20
    },
    collaborator: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    collaboratorList: {
        marginTop: 15,
        backgroundColor: '#f9f9f9',
        height: 300,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    scrollViewContent: {
        paddingBottom: 20,
        backgroundColor:'red'
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors?.background?.blue_light || '#007AFF',
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    moreButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors?.background?.secondary || '#666',
        justifyContent: 'center',
        alignItems: 'center'
    },
    moreButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },
    addContact: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors?.background?.tertiary || '#007AFF',
        backgroundColor: 'transparent'
    },
    addContactText: {
        color: Colors?.background?.tertiary || '#007AFF',
        fontSize: 14,
        fontWeight: '600'
    },
    contactView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    contactName: {
        fontSize: 16,
        color: '#333',
        flex: 1
    },
    checkbox: {
        marginLeft: 10
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 14,
        marginTop: 5,
        textAlign: 'center'
    }
})