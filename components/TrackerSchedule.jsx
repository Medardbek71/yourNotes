import TrackingDays from "@/components/TrackingDays";
import Colors from "@/constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";

import CardForSchedule from "@/components/CardForSchedule";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ToggleSwitch from "toggle-switch-react-native";

const TrackerSchedule = () => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(new Date());
  const [repeat, setRepeat] = useState(false);
  const [description, setDescription] = useState("");
  const [attachedNotesVisibility, setAttachedNotesVisibility] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [trackedDay, setTrackedDay] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const toggleNoteVisibility = () => {
    const attachedNotesVisibilityCopy = !attachedNotesVisibility;
    setAttachedNotesVisibility(attachedNotesVisibilityCopy);
  };
  const formatTime = (date) => {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
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
  return (
    <View style={styles.container}>
      <View style={styles.textInput}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          value={title}
          onChangeText={(Text) => setTitle(Text)}
          style={styles.input}
        />
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
        {showTimePicker && (
          <DateTimePicker
            mode="time"
            display={Platform.OS === "android" ? "default" : "spinner"}
            value={time}
            onChange={onTimePickerChange}
          />
        )}

        <Pressable
          onPress={() => setRepeat(!repeat)}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 20,
          }}
        >
          <Text style={styles.label}>Repeat</Text>
          <ToggleSwitch
            isOn={repeat}
            offColor={Colors.background.primary}
            onColor={Colors.background.secondary}
            size="medium"
            onToggle={() => setRepeat(!repeat)}
          />
        </Pressable>

        {repeat && <TrackingDays setTrackedDay={setTrackedDay} />}

        <View style={styles.textInput}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            value={description}
            onChangeText={(Text) => setDescription(Text)}
            style={styles.input}
          />
        </View>
        <Pressable onPress={() => toggleNoteVisibility()}>
          <Text style={styles.label}>Attach note</Text>
        </Pressable>
        {attachedNotesVisibility && <CardForSchedule />}
      </View>
    </View>
  );
};

export default TrackerSchedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
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
