import DateTimePicker from "@react-native-community/datetimepicker";
import { useSQLiteContext } from "expo-sqlite";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CardForSchedule from "./CardForSchedule";
import CollaboratorList from "./CollaboratorList";
import ScheduleHeader from "./ScheduleHeader";

const EventSchedule = ({
  bottomSheetRef,
  bottomSheetType,
  editMode,
  setEditMode,
  scheduleIdForEditing,
}) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [collaboratorList, setCollaboratorList] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [attachedNotesVisibility, setAttachedNotesVisibility] = useState(false);

  const database = useSQLiteContext();

  const onDatePickerChange = (event, selectedDate) => {
    if (event.type === "set") {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      if (Platform.OS === "android") {
        setShowDatePicker(false);
      }
    } else if (event.type === "dismissed") {
      setShowDatePicker(false);
    }
  };

  const onTimePickerChange = (event, selectedTime) => {
    if (event.type === "set") {
      const currentTime = selectedTime || time;
      setTime(currentTime);
      if (Platform.OS === "android") {
        setShowTimePicker(false);
      }
    } else if (event.type === "dismissed") {
      setShowTimePicker(false);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleNoteVisibility = () => {
    const attachedNotesVisibilityCopy = !attachedNotesVisibility;
    setAttachedNotesVisibility(attachedNotesVisibilityCopy);
  };

  const saveEvent = () => {
    try {
      database.runAsync(
        `INSERT INTO schedule ( title , date ,time , collaboratorList , type) VALUES (?,?,?,?,?)`,
        [
          title,
          date.toLocaleString(),
          time.toLocaleTimeString(),
          collaboratorList,
          "event",
        ]
      );

      console.log("register is successfull");
      resetAll();
    } catch (error) {
      console.log(error);
    }
  };

  const resetAll = () => {
    setTitle("");
    setDate(new Date());
    setTime(new Date());
    setCollaboratorList([]);
    bottomSheetRef.current.close();
  };

  return (
    <ScrollView style={styles.container}>
      <ScheduleHeader
        saveSchedule={saveEvent}
        resetAll={resetAll}
        bottomSheetType={bottomSheetType}
        editMode={editMode}
      />
      <View style={styles.textInput}>
        <Text style={styles.label}>Event title</Text>
        <TextInput
          value={title}
          onChangeText={(Text) => setTitle(Text)}
          style={styles.input}
        />
      </View>
      <View style={styles.textInput}>
        <Text style={styles.label}>Date</Text>
        <Pressable onPress={() => setShowDatePicker(true)}>
          <TextInput
            value={formatDate(date)}
            editable={false}
            style={styles.input}
          />
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            mode="date"
            display={Platform.OS === "android" ? "default" : "spinner"}
            value={date}
            onChange={onDatePickerChange}
          />
        )}
      </View>
      <View style={styles.textInput}>
        <Text style={styles.label}>Time</Text>
        <Pressable onPress={() => setShowTimePicker(true)}>
          <TextInput
            value={formatTime(time)}
            editable={false}
            style={styles.input}
          />
        </Pressable>
      </View>
      {showTimePicker && (
        <DateTimePicker
          mode="time"
          display={Platform.OS === "android" ? "default" : "spinner"}
          value={time}
          onChange={onTimePickerChange}
        />
      )}
      <CollaboratorList
        collaboratorList={collaboratorList}
        setCollaboratorList={setCollaboratorList}
      />
      <Pressable onPress={() => toggleNoteVisibility()}>
        <Text style={styles.label}>Attach note</Text>
      </Pressable>
      {attachedNotesVisibility && <CardForSchedule />}
    </ScrollView>
  );
};

export default EventSchedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 7,
  },
  textInput: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
});
