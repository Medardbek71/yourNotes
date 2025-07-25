import CardForSchedule from "@/components/CardForSchedule";
import TrackingDays from "@/components/TrackingDays";
import Colors from "@/constants/Colors";
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
import ToggleSwitch from "toggle-switch-react-native";
import ScheduleHeader from "./ScheduleHeader";

const TrackerSchedule = ({
  bottomSheetRef,
  bottomSheetType,
  editMode,
  setEditMode,
  scheduleIdForEditing,
}) => {
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState(null);

  // Chargement des données en mode édition
  useEffect(() => {
    if (editMode && scheduleIdForEditing) {
      console.log(scheduleIdForEditing);
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
      const editTrackedDay = JSON.parse(editData.trackedDay);
      setRepeat(editTrackedDay.repeat);
      setTrackedDay(editTrackedDay.daysSelected);

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

  const database = useSQLiteContext();

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

  const updateTracker = async () => {
    try {
      await database.runAsync(
        "UPDATE schedule SET title = ?, time = ?, description = ? , trackedDay = ? WHERE id = ?",
        [
          title,
          time.toLocaleTimeString(),
          description,
          storedDays,
          scheduleIdForEditing,
        ]
      );
      console.log("modification reussite dans la db");
      resetAll();
    } catch (error) {
      console.log(error);
    }
  };

  const selectedDays = {
    repeat: repeat,
    daysSelected: trackedDay,
  };
  const storedDays = JSON.stringify(selectedDays);
  const saveTracker = async () => {
    try {
      await database.runAsync(
        `INSERT INTO schedule (title, description, time, trackedDay, type) VALUES (?,?,?,?,?)`,
        [title, description, time.toLocaleTimeString(), storedDays, "tracker"]
      );
      console.log("données dans la db");
      alert("données dans la db");
      resetAll();
    } catch (error) {
      console.log("Erreur lors de l'insertion:", error);
      alert("Erreur: " + error.message);
    }
  };

  const resetAll = () => {
    setTitle("");
    setTime(new Date());
    setRepeat(false);
    setDescription("");
    bottomSheetRef.current.close();
  };

  return (
    <ScrollView style={styles.container}>
      <ScheduleHeader
        firstAction={() => (editMode ? updateTracker() : saveTracker())}
        resetAll={resetAll}
        bottomSheetType={bottomSheetType}
        editMode={editMode}
      />
      <View style={styles.textInput}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          value={title}
          onChangeText={(text) => setTitle(text)}
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
      </View>

      <Pressable
        onPress={() => setRepeat(!repeat)}
        style={styles.repeatContainer}
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
      <Text style={{ fontFamily: "Inter-Regular" }}>Which days to track ?</Text>

      <TrackingDays setTrackedDay={setTrackedDay} trackedDay={trackedDay} />

      <View style={styles.textInput}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={styles.input}
        />
      </View>

      <Pressable onPress={() => toggleNoteVisibility()}>
        <Text style={styles.label}>Attach note</Text>
      </Pressable>
      {attachedNotesVisibility && <CardForSchedule />}
    </ScrollView>
  );
};

export default TrackerSchedule;

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
  repeatContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
});
