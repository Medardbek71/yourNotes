import DateTimePicker from "@react-native-community/datetimepicker";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
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
import ScheduleHeader from "./ScheduleHeader";

const DeadLineSchedule = ({
  bottomSheetRef,
  bottomSheetType,
  editMode,
  setEditMode,
  scheduleIdForEditing,
}) => {
  const database = useSQLiteContext();
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState(null);

  console.log(editMode, editData);
  console.log(scheduleIdForEditing);

  // Chargement des données en mode édition
  useEffect(() => {
    if (editMode && scheduleIdForEditing) {
      const loadData = async () => {
        try {
          setLoading(true);
          const queryResults = await database.getAllAsync(
            "SELECT * FROM schedule WHERE id = ?",
            [scheduleIdForEditing]
          );

          if (queryResults.length > 0) {
            setEditData(queryResults[0]); // Prendre le premier résultat
          }
        } catch (error) {
          console.log("Erreur lors du chargement des données:", error);
        } finally {
          setLoading(false);
        }
      };
      loadData();
    }
  }, [editMode, scheduleIdForEditing, database]);

  useEffect(() => {
    if (editData && editMode) {
      setTitle(editData.title || "");
      setDescription(editData.description || "");

      // Gestion des dates et heures
      if (editData.date) {
        // Convertir la date stockée en objet Date
        const dateParts = editData.date.split("/");
        if (dateParts.length === 3) {
          const [day, month, year] = dateParts;
          setDate(new Date(year, month - 1, day));
        }
      }

      if (editData.time) {
        // Convertir l'heure stockée en objet Date
        const timeParts = editData.time.split(":");
        if (timeParts.length >= 2) {
          const [hours, minutes] = timeParts;
          const timeDate = new Date();
          timeDate.setHours(parseInt(hours), parseInt(minutes));
          setTime(timeDate);
        }
      }
    }
  }, [editData, editMode, database, loading]);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [description, setDescription] = useState("");

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

  const saveDeadline = () => {
    try {
      database.runAsync(
        `INSERT INTO schedule (title,description ,date, time ,type) VALUES (?,?,?,?,?)`,
        [
          title,
          description,
          date.toLocaleDateString(),
          time.toLocaleTimeString(),
          "deadline",
        ]
      );
      resetAll();
      alert("deadline registered successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const resetAll = () => {
    setTitle("");
    setDate("");
    setTime(new Date());
    setDate(new Date());
    setDescription("");
    bottomSheetRef.current.close();
  };

  const updateDeadline = async () => {
    try {
      await database.runAsync(
        "UPDATE schedule SET title = ? ,date = ?,time = ? WHERE id = ?",
        [
          title,
          date.toLocaleDateString(),
          time.toLocaleTimeString(),
          editData.id,
        ]
      );
      console.log("modification reussite dans la db");
      resetAll();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ScheduleHeader
        resetAll={() => resetAll()}
        firstAction={() => (editMode ? updateDeadline() : saveDeadline())}
        bottomSheetType={bottomSheetType}
        editMode={editMode}
      />
      <View style={styles.textInput}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setTitle(text)}
          placeholder="Title"
          value={title}
        />
      </View>
      <View style={styles.textInput}>
        <Text style={styles.label}>Date</Text>
        <Pressable onPress={() => setShowDatePicker(true)}>
          <TextInput
            style={styles.input}
            value={formatDate(date)}
            editable={false}
          />
        </Pressable>

        {showDatePicker && (
          <DateTimePicker
            mode="date"
            display={Platform.OS === "android" ? "default" : "spinner"}
            value={date}
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
            value={formatTime(time)}
            editable={false}
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
      </View>
      <View style={styles.textInput}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={(text) => setDescription(text)}
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
