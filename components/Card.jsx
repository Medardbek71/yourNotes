import Colors from "@/constants/Colors";
import { typography } from "@/constants/typography";
import { Checkbox } from "expo-checkbox";
import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Card({ note }) {
  const database = useSQLiteContext();
  const [noteData, setNoteData] = useState(note);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (note.type === "checklist") {
          setIsLoading(true);
          const items = await database.getAllAsync(
            "SELECT * FROM items WHERE note_id = ? ORDER BY id ASC",
            [note.id]
          );

          setNoteData({
            ...note, // Préserver toutes les propriétés de la note originale
            items: items.map((item) => ({
              id: item.id,
              name: item.name,
              checked: item.is_checked,
            })),
          });
        } else {
          // Pour les autres types, utiliser directement la note
          setNoteData(note);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        setNoteData(note); // Fallback vers la note originale
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [note.id, note.type]);

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length >= maxLength) {
      return text.substring(0, maxLength - 3) + "...";
    }
    return text;
  };

  const renderChecklist = () => {
    return (
      <Pressable
        style={[styles.container, styles.checklistContainer]}
        onPress={() => router.push(`/Note?id=${note.id}`)}
      >
        <Text style={[styles.title, styles.checklistTitle]}>{note.title}</Text>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="white" size="small" />
          </View>
        ) : (
          <>
            {noteData.items
              ? noteData.items.slice(0, 3).map((item) => (
                  <View style={styles.checkboxCard} key={item.id}>
                    <View style={styles.items}>
                      <Checkbox
                        value={item.checked}
                        color={Colors.background.secondary}
                      />
                      <Text style={[styles.text, styles.checklistText]}>
                        {truncateText(item.name, 25)}
                      </Text>
                    </View>
                  </View>
                ))
              : null}

            {noteData.items
              ? noteData.items.length > 3 && (
                  <View style={styles.moreItemsContainer}>
                    <Text style={styles.moreItemsText}>
                      +{noteData.items.length - 3} autre(s)
                    </Text>
                  </View>
                )
              : null}
          </>
        )}
      </Pressable>
    );
  };

  const renderNormalList = () => {
    return (
      <Pressable
        style={[styles.container, styles.normalContainer]}
        onPress={() => router.push(`/Note?id=${note.id}`)}
      >
        <Text style={[styles.title, styles.normalTitle]}>{note.title}</Text>
        <Text style={[styles.content, styles.normalContent]}>
          {truncateText(note.content, 87)}
        </Text>
      </Pressable>
    );
  };

  const renderRecipeList = () => {
    // Vérification que note.content est un tableau pour les recettes
    // const recipeItems = Array.isArray(note.content) ? note.content : []

    return (
      // <Pressable
      //     style={[styles.container, styles.recipeContainer]}
      //     onPress={() => router.push(`/Note?id=${note.id}`)}
      // >
      //     <Text style={[styles.title, styles.recipeTitle]}>{note.title}</Text>

      //     {recipeItems.slice(0, 3).map((item, index) => (
      //         <View key={item.id || index} style={styles.recipeItem}>
      //             <Text style={[styles.text, styles.recipeText]}>
      //                 • {truncateText(item.name || item, 30)}
      //             </Text>
      //         </View>
      //     ))}

      //     {recipeItems.length > 3 && (
      //         <View style={styles.moreItemsContainer}>
      //             <Text style={styles.moreItemsText}>
      //                 +{recipeItems.length - 3} autre(s)
      //             </Text>
      //         </View>
      //     )}
      // </Pressable>
      ""
    );
  };

  const styles = StyleSheet.create({
    container: {
      width: 171,
      height: 200,
      marginRight: 8,
      padding: 8,
      borderRadius: 6,
      fontFamily: "Inter-Regular",
    },
    normalContainer: {
      backgroundColor: Colors.background.blue_light,
    },
    checklistContainer: {
      backgroundColor: Colors.background.tertiary,
    },
    recipeContainer: {
      backgroundColor: Colors.background.secondary,
    },
    title: {
      fontSize: typography.header.fontSize,
      fontFamily: "Inter-Regular",
      fontWeight: "normal",
      padding: 5,
    },
    normalTitle: {
      color: Colors.text.primary,
    },
    checklistTitle: {
      color: Colors.text.tertiary,
    },
    recipeTitle: {
      color: Colors.text.tertiary,
    },
    content: {
      fontSize: typography.text.lg.fontSize,
      fontFamily: "Inter-Regular",
      lineHeight: typography.text.lg.lineHeight,
      padding: 5,
    },
    normalContent: {
      color: Colors.text.primary,
    },
    checkboxCard: {
      flexDirection: "row",
      marginVertical: 2,
    },
    items: {
      flexDirection: "row",
      alignItems: "center",
      marginLeft: 5,
      flex: 1,
    },
    recipeItem: {
      marginVertical: 1,
      marginLeft: 5,
    },
    text: {
      fontSize: typography.text.lg.fontSize,
      fontFamily: "Inter-Regular",
      lineHeight: typography.text.lg.lineHeight,
      marginHorizontal: 10,
      padding: 3,
      flex: 1,
    },
    checklistText: {
      color: Colors.text.tertiary,
    },
    recipeText: {
      color: Colors.text.tertiary,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    moreItemsContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginTop: 5,
      marginLeft: 5,
    },
    moreItemsText: {
      fontFamily: "Inter-Regular",
      color: "white",
      fontSize: 12,
    },
  });

  // Rendu conditionnel basé sur le type de note
  if (!isLoading) {
    switch (note.type) {
      case "normal":
        return renderNormalList();
      case "checklist":
        return renderChecklist();
      case "recipe":
        return renderRecipeList();
      default:
        return renderNormalList(); // Fallback
    }
  }
}
