import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import CardForSchedule from "./CardForSchedule";

const DeadLineSchedule = () => {
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDate, setMeetingDate] = useState(new Date());
  const [meetingTime, setMeetingTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [description, setDescription] = useState("");

  const onDatePickerChange = (event, selectedDate) => {
    if (event.type === "set") {
      const currentDate = selectedDate || meetingDate;
      setMeetingDate(currentDate);
      if (Platform.OS === "android") {
        setShowDatePicker(false);
      }
    } else if (event.type === "dismissed") {
      setShowDatePicker(false);
    }
  };

  const onTimePickerChange = (event, selectedTime) => {
    if (event.type === "set") {
      const currentTime = selectedTime || meetingTime;
      setMeetingTime(currentTime);
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
  return (
    <ScrollView style={styles.container}>
      <View style={styles.textInput}>
        <Text style={styles.label}>Meeting Title</Text>
        <TextInput
          style={styles.input}
          value={meetingTitle}
          onChangeText={setMeetingTitle}
          placeholder="Enter meeting Title"
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
            mode="date"
            display={Platform.OS === "android" ? "default" : "spinner"}
            value={meetingDate}
            onChange={onDatePickerChange}
            minimumDate={new Date()}
            maximumDate={new Date("2025-12-31")}
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
            mode="time"
            display={Platform.OS === "android" ? "default" : "spinner"}
            value={meetingTime}
            onChange={onTimePickerChange}
          />
        )}
      </View>
      <View style={styles.textInput}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="write something"
          multiline={true}
          numberOfLines={3}
        />
      </View>
      <View>
        <Text style={styles.label}>Attach note</Text>
        <CardForSchedule />
      </View>
    </ScrollView>
  );
};

export default DeadLineSchedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 70,
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
});
