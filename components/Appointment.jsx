import DateTimePicker from "@react-native-community/datetimepicker";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
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
import ScheduleHeader from "./ScheduleHeader";

const Appointment = ({
  bottomSheetRef,
  bottomSheetType,
  editMode,
  setEditMode,
  scheduleIdForEditing,
}) => {
  const database = useSQLiteContext();
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState(null);

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

  // Mise à jour des états quand les données d'édition sont chargées
  useEffect(() => {
    console.log(editMode, editData);
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
  const [description, setDescription] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [attachedNotesVisibility, setAttachedNotesVisibility] = useState(false);

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

  const updateAppointment = async () => {
    if (editData && editData) {
      try {
        await database.runAsync(
          "UPDATE schedule SET title = ?, description = ?, time = ?, date = ? WHERE id = ?",
          [
            title,
            description,
            time.toLocaleTimeString(),
            date.toLocaleDateString(),
            scheduleIdForEditing,
          ]
        );
        console.log("modification reussite dans la db");
        resetAll();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const saveAppointment = () => {
    try {
      database.runAsync(
        `INSERT INTO schedule (title , description , date , time ) VALUES (?,?,?,?)`,
        [
          title,
          description,
          date.toLocaleDateString(),
          time.toLocaleTimeString(),
        ]
      );
      resetAll();
      console.log("appointment is register in the db");
    } catch (error) {
      console.log(error);
    }
  };

  const resetAll = () => {
    setTitle("");
    setDate(new Date());
    setTime(new Date());
    setDescription("");
    bottomSheetRef.current.close();
  };

  return (
    <ScrollView style={styles.container}>
      <ScheduleHeader
        firstAction={() => (editMode ? updateAppointment() : saveAppointment())}
        resetAll={resetAll}
        bottomSheetType={bottomSheetType}
        editMode={editMode}
      />
      <View>
        <Text style={styles.label}>Enter meeting title</Text>
        <TextInput
          value={title}
          onChangeText={(Text) => setTitle(Text)}
          placeholder="Enter meeting name"
          style={styles.input}
        />
      </View>
      <View>
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
      <View>
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
      </View>
      <View>
        <Text style={styles.label}>Description</Text>
        <TextInput
          value={description}
          onChangeText={(Text) => setDescription(Text)}
          numberOfLines={5}
          style={styles.input}
        />
      </View>
      <View>
        <Pressable
          onPress={() => setAttachedNotesVisibility(!attachedNotesVisibility)}
          style={styles.label}
        >
          <Text style={styles.label}> Attach note</Text>
        </Pressable>
        {attachedNotesVisibility && <CardForSchedule />}
      </View>
    </ScrollView>
  );
};

export default Appointment;

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
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
});
