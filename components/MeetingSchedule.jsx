import Colors from "@/constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CardForSchedule from "./CardForSchedule";
import CollaboratorList from "./CollaboratorList";
import ScheduleHeader from "./ScheduleHeader";

const MeetingSchedule = ({
  bottomSheetRef,
  editMode,
  setEditMode,
  scheduleIdForEditing,
}) => {
  const database = useSQLiteContext();
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState(null);

  // États initialisés avec des valeurs par défaut
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDate, setMeetingDate] = useState(new Date());
  const [meetingTime, setMeetingTime] = useState(new Date());
  const [meetingDescription, setMeetingDescription] = useState("");
  const [meetingPlace, setMeetingPlace] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [collaboratorList, setCollaboratorList] = useState([]);



  // Mise à jour des états quand les données d'édition sont chargées
  useEffect(() => {
    console.log(editMode, editData);
    if (editData && editMode) {
      setMeetingTitle(editData.title || "");
      setMeetingDescription(editData.description || "");
      setMeetingPlace(editData.place || "");
      setMeetingLink(editData.link || "");

      // Gestion des dates et heures
      if (editData.date) {
        // Convertir la date stockée en objet Date
        const dateParts = editData.date.split("/");
        if (dateParts.length === 3) {
          const [day, month, year] = dateParts;
          setMeetingDate(new Date(year, month - 1, day));
        }
      }

      if (editData.time) {
        // Convertir l'heure stockée en objet Date
        const timeParts = editData.time.split(":");
        if (timeParts.length >= 2) {
          const [hours, minutes] = timeParts;
          const timeDate = new Date();
          timeDate.setHours(parseInt(hours), parseInt(minutes));
          setMeetingTime(timeDate);
        }
      }

      // Gestion de la liste des collaborateurs
      if (editData.collaboratorList) {
        // Si c'est stocké en JSON string, le parser
        try {
          const collaborators =
            typeof editData.collaboratorList === "string"
              ? JSON.parse(editData.collaboratorList)
              : editData.collaboratorList;
          setCollaboratorList(collaborators || []);
        } catch (error) {
          console.log("Erreur lors du parsing des collaborateurs:", error);
          setCollaboratorList([]);
        }
      }
    }
  }, [editData, editMode, database, loading]);

  const handlePress = (meetingPlace) => {
    setMeetingPlace(meetingPlace);
  };

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

  const formatTime = (time) => {
    return time.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const resetAll = () => {
    setMeetingTitle("");
    setMeetingDescription("");
    setMeetingTime(new Date());
    setMeetingDate(new Date());
    setMeetingLink("");
    setCollaboratorList([]);
    setMeetingPlace("");
    setEditData(null);
    setEditMode(false);
    bottomSheetRef.current.close();
  };
  const saveMeeting = async () => {
    try {
      const collaboratorListString = JSON.stringify(collaboratorList);

      if (editMode && editData) {
        // Mode édition - mise à jour
        await database.runAsync(
          `UPDATE schedule SET title = ?, description = ?, time = ?, date = ?, link = ?, place = ?, collaboratorList = ? WHERE id = ?`,
          [
            meetingTitle,
            meetingDescription,
            meetingTime.toLocaleTimeString(),
            meetingDate.toLocaleDateString(),
            meetingLink,
            meetingPlace,
            collaboratorListString,
            editData.id,
          ]
        );
        console.log("Mise à jour de la réunion réussie");
      } else {
        // Mode création - insertion
        await database.runAsync(
          `INSERT INTO schedule (title, description, time, date, link, place, collaboratorList, type) VALUES (?,?,?,?,?,?,?,?)`,
          [
            meetingTitle,
            meetingDescription,
            meetingTime.toLocaleTimeString(),
            meetingDate.toLocaleDateString(),
            meetingLink,
            meetingPlace,
            collaboratorListString,
            "Meeting",
          ]
        );
        console.log("Enregistrement de la réunion réussi");
      }

      resetAll();
    } catch (error) {
      console.log("Erreur lors de la sauvegarde:", error);
    }
  };

  const updateMeeting = async () => {
    if (editData && editData) {
      try {
        await database.runAsync(
          "UPDATE schedule SET title = ?, description = ?, time = ?, date = ?, link = ?, place = ?, collaboratorList = ?, type = ?  WHERE id = ?",
          [
            meetingTitle,
            meetingDescription,
            meetingTime.toLocaleTimeString(),
            meetingDate.toLocaleDateString(),
            meetingLink,
            meetingPlace,
            collaboratorList,
            "Meeting",
            editData.id,
          ]
        );
        console.log("modification reussite dans la db");
        resetAll();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteMeeting = async () => {
    if (editMode && editData) {
      try {
        await database.runAsync("DELETE FROM schedule WHERE id = ?", [
          editData.id,
        ]);
        console.log("Suppression de la réunion réussie");
        resetAll();
      } catch (error) {
        console.log("Erreur lors de la suppression:", error);
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <ScheduleHeader
        bottomSheetType={"Meeting"}
        firstAction={() => (editMode ? updateMeeting() : saveMeeting())}
        resetAll={resetAll}
        editMode={editMode}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "android" ? "padding" : "height"}
      >
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

        <CollaboratorList
          collaboratorList={collaboratorList}
          setCollaboratorList={setCollaboratorList}
        />

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
            value={meetingDescription}
            onChangeText={setMeetingDescription}
            placeholder="write something"
            multiline={true}
            numberOfLines={3}
          />
        </View>

        <View style={styles.textInput}>
          <Text style={styles.label}>Meeting type</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: "50%",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => handlePress("online")}
              style={[
                styles.meetingTypeStyle,
                {
                  backgroundColor:
                    meetingPlace === "online"
                      ? Colors.background.secondary
                      : "white",
                },
              ]}
            >
              <Text
                style={{ color: meetingPlace === "online" ? "white" : "black" }}
              >
                Online
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => handlePress("office")}
              style={[
                styles.meetingTypeStyle,
                {
                  backgroundColor:
                    meetingPlace === "office"
                      ? Colors.background.secondary
                      : "white",
                },
              ]}
            >
              <Text
                style={{ color: meetingPlace === "office" ? "white" : "black" }}
              >
                Office
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style={styles.label}>Attach note</Text>
          <CardForSchedule />
        </View>

        <View>
          <Text style={styles.label}>Link</Text>
          <TextInput
            style={styles.input}
            value={meetingLink}
            onChangeText={setMeetingLink}
            placeholder="Paste de meeting Link"
          />
        </View>

        <View>
          {editMode && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={deleteMeeting}
            >
              <Text style={styles.deleteButtonText}>Supprimer</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default MeetingSchedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 70,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  checkbox: {
    marginLeft: 10,
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
  meetingTypeStyle: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors?.background?.secondary || "#007AFF",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
