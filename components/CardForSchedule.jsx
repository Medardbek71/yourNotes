import Colors from "@/constants/Colors";
import { typography } from "@/constants/typography";
import { Checkbox } from "expo-checkbox";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

const CardForSchedule = () => {
  const database = useSQLiteContext();
  const [noteIsLoading, setNoteIsLoading] = useState(true);
  const [itemsIsLoading, setItemsIsLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [items, setItems] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const notes = await database.getAllAsync(
          "SELECT * FROM notes ORDER BY id DESC"
        );
        const noteCopy = [...notes];
        for (const note of noteCopy) {
          note.checked = false;
        }
        setNotes(noteCopy);
      } catch (error) {
        console.error(error);
      } finally {
        setNoteIsLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const loadItems = async () => {
      try {
        setItemsIsLoading(true);
        const itemMap = {};
        for (const note of notes) {
          const noteItems = await database.getAllAsync(
            "SELECT * FROM items WHERE note_id = ?",
            [note.id]
          );
          itemMap[note.id] = noteItems;
        }
        setItems(itemMap);
      } catch (error) {
        console.log(error);
      } finally {
        setItemsIsLoading(false);
      }
    };

    if (notes.length > 0 && !noteIsLoading) {
      loadItems();
    }
  }, [notes, noteIsLoading]);

  const handleChecked = (id) => {
    setNotes((prevState) =>
      prevState.map((note) =>
        note.id === id ? { ...note, checked: !note.checked } : note
      )
    );
  };

  const renderItem = ({ item: note }) => {
    if (note.type === "normal") {
      return (
        <Pressable
          onPress={() =>
            alert("vous venez de selectionner element numero " + note.id)
          }
          style={[
            styles.container,
            { backgroundColor: Colors.background.blue_light },
          ]}
        >
          <Text style={styles.title}>{note.title}</Text>
          <Text style={[styles.content, { color: Colors.text.primary }]}>
            {note.content}
          </Text>
        </Pressable>
      );
    } else if (note.type === "checklist") {
      return (
        <Pressable
          style={[
            styles.container,
            { backgroundColor: Colors.background.tertiary },
          ]}
          onPress={() =>
            alert("vous venez de selectionner element numero " + note.id)
          }
        >
          <Text style={[styles.title, { color: Colors.background.light }]}>
            {note.title}
          </Text>
          <Checkbox
            value={note.checked}
            onValueChange={() => handleChecked(note.id)}
          />
          {!itemsIsLoading && items[note.id] ? (
            <View>
              <View>
                {items[note.id].slice(0, 3).map((item, index) => (
                  <View key={`${note.id}-${index}`} style={styles.items}>
                    <Checkbox
                      value={item.is_checked}
                      color={Colors.background.secondary}
                    />
                    <Text style={[styles.text, { color: "white" }]}>
                      {item.name}
                    </Text>
                  </View>
                ))}
              </View>
              {items[note.id].length > 3 && (
                <View style={styles.moreItems}>
                  <Text style={styles.moreItemsText}>
                    {items[note.id].length - 3} autre(s)
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color={"white"} />
            </View>
          )}
        </Pressable>
      );
    }
    return null;
  };

  if (noteIsLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.background.secondary} />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <FlatList
        horizontal={true}
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        style={styles.listStyle}
        nestedScrollEnabled={true}
        scrollEventThrottle={16}
        initialNumToRender={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 220,
    width: "100%",
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  listStyle: {
    flexGrow: 0,
  },
  title: {
    fontSize: typography.header.fontSize,
    fontFamily: "Inter-Regular",
    fontWeight: "normal",
    padding: 5,
  },
  content: {
    fontSize: typography.text.lg.fontSize,
    fontFamily: "Inter-Regular",
    lineHeight: typography.text.lg.lineHeight,
    padding: 5,
  },
  container: {
    width: 171,
    height: 200,
    marginRight: 8,
    padding: 8,
    borderRadius: 6,
  },
  items: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
  },
  text: {
    fontSize: typography.text.lg.fontSize,
    fontFamily: "Inter-Regular",
    lineHeight: typography.text.lg.lineHeight,
    marginVertical: 2,
    marginHorizontal: 10,
    padding: 3,
  },
  moreItems: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  moreItemsText: {
    fontFamily: "Inter-Regular",
    color: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CardForSchedule;
