import DynamicCheckbox from "@/components/DynamicCheckbox";
import NoteHeader from "@/components/NoteHeader";
import TopModal from "@/components/TopModal";
import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddNote = () => {
  const [isOpen, toggleModal] = useState(false);
  const [noteIsEmpty, setNoteIsEmpty] = useState(true);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteType, setNoteType] = useState("normal");
  const [items, setItems] = useState([
    { id: Date.now(), text: "", checked: false },
  ]);

  const database = useSQLiteContext();

  const saveInDb = async (title, content, type) => {
    try {
      switch (type) {
        case "normal":
          await database.runAsync(
            "INSERT INTO notes (title , type , content) VALUES (?,?,?);",
            [title, type, content]
          );
          break;
        default:
          try {
            const queryResult = await database.runAsync(
              "INSERT INTO notes ( title , type ) VALUES (?,?);",
              [title, type]
            );
            console.log(
              "enregistrement des données reussi dans la table notes"
            );
            content.map(async (item) => {
              try {
                const note_id = queryResult.lastInsertRowId;
                await database.runAsync(
                  "INSERT INTO items ( note_id , name ,is_checked ) VALUES (?,?,?);",
                  [note_id, item.text, item.checked]
                );
                console.log(
                  "enregistrement des données reussi dans la table items"
                );
              } catch (error) {
                console.error(error);
              }
            });
          } catch (error) {
            console.error(error);
          }
          break;
      }
      setNoteContent("");
      setNoteTitle("");
    } catch (error) {
      console.error(error);
    }
  };

  function saveNote() {
    const title = noteTitle.trim() !== "" ? noteTitle : "untitled";
    const content = noteContent;
    if (noteType === "normal") {
      const type = noteType;
      saveInDb(title, content, type);
      alert("la note a été ajouté");
      router.push("/home");
    } else {
      alert("enregistrement en db");
      const type = "checklist";
      const content = items.map((item) => ({
        text: item.text,
        checked: item.checked,
      }));
      saveInDb(title, content, type);
      router.push("/home");
    }
  }

  useEffect(() => {
    if (noteType === "normal") {
      if (noteContent.trim() !== "") {
        setNoteIsEmpty(false);
      } else {
        setNoteIsEmpty(true);
      }
    } else {
      if (items.length !== 0) {
        setNoteIsEmpty(false);
      } else {
        setNoteIsEmpty(true);
      }
    }
  }, [noteContent, noteType, items]); // Ajout de items dans les dépendances

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ width: "90%" }}>
        <NoteHeader
          isOpen={isOpen}
          noteIsEmpty={noteIsEmpty}
          setIsOpen={toggleModal}
          saveNote={() => saveNote()}
          noteTitle={noteTitle}
          setNoteTitle={setNoteTitle}
        />

        {isOpen === true && <TopModal setNoteType={setNoteType} />}

        {noteType === "normal" ? (
          <View style={styles.normalNoteContainer}>
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder="Écrivez votre note ici"
              style={styles.noteInput}
              onChangeText={setNoteContent}
              value={noteContent}
            />
          </View>
        ) : (
          <DynamicCheckbox items={items} setItems={setItems} />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  normalNoteContainer: {
    flex: 1,
    width: "90%",
    justifyContent: "flex-start",
  },
  formContainer: {
    width: "100%",
    paddingVertical: 20,
  },
  inputRow: {
    flexDirection: "column",
    gap: 15,
  },
  inputGroup: {
    flexDirection: "column",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  saveButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  noteInput: {
    fontFamily: "Inter-Regular",
    height: 200,
    textAlignVertical: "top",
    fontSize: 16,
    marginTop: 20,
    width: "95%",
  },
});

export default AddNote;
