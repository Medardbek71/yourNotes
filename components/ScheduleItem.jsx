import Colors from "@/constants/Colors";
import { Image } from "expo-image";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ScheduleItem = ({ id, openBottomSheet, setEditMode, setEditItem }) => {
  const [loading, setLoading] = useState(true); // Commencer avec loading à true
  const [schedule, setSchedule] = useState(null); // Initialiser comme null
  const database = useSQLiteContext();

  // Déplacer la logique des icônes dans une fonction
  const getIcon = (type) => {
    switch (type) {
      case "appointment":
        return require("../assets/images/calendar-grey.svg");
      case "deadline":
        return require("../assets/images/deadline.svg");
      case "event":
        return require("../assets/images/event.svg");
      case "tracker":
        return require("../assets/images/bullet-grey.svg");
      case "Meeting":
        return require("../assets/images/meeting.svg");
      default:
        return require("../assets/images/pencil.svg");
    }
  };

  useEffect(() => {
    const chargerDonnees = async () => {
      try {
        setLoading(true);
        const resultatRequete = await database.getFirstAsync(
          `SELECT * FROM schedule WHERE id = ?`,
          [id]
        );
        setSchedule(resultatRequete);
        console.log("voici les données", resultatRequete); // Logger le résultat réel
      } catch (error) {
        console.log("Erreur lors du chargement du planning:", error);
        setSchedule(null);
      } finally {
        setLoading(false);
      }
    };

    if (id && database) {
      chargerDonnees();
    }
  }, [id, database]); // Supprimer 'loading' des dépendances pour éviter la boucle infinie

  // Afficher l'indicateur de chargement pendant le chargement
  if (loading) {
    return <ActivityIndicator />;
  }

  // Afficher l'état d'erreur/vide si aucun planning trouvé
  if (!schedule) {
    return (
      <View>
        <Text>Aucun planning trouvé</Text>
      </View>
    );
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => (openBottomSheet(), setEditMode(true), setEditItem(id))}
        style={{
          display: "flex",
          width: "90%",
          height: 90,
          margin: 2,
          justifyContent: "center",
          alignItem: "center",
          marginLeft: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              height: "100%",
            }}
          >
            <View
              style={{
                elevation: 1,
                backgroundColor: "white",
                borderRadius: 25,
              }}
            >
              <Image
                source={getIcon(schedule.type)}
                style={{ height: 40, width: 40 }}
              />
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "baseline",
              width: "90%",
              height: "110%",
              marginLeft: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                marginVertical: 5,
                padding: 4,
                width: "75%",
              }}
            >
              <Text style={{ fontFamily: "Inter-Regular" }}>
                {schedule.date}
              </Text>
              <Text style={{ fontFamily: "Inter-Regular" }}>
                {schedule.title}
              </Text>
            </View>
            {schedule.type === "Meeting" && schedule.link !== "" && (
              <View
                style={{
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 8,
                  width: "75%",
                  elevation: 1,
                  borderRadius: 25,
                  fontFamily: "Inter-regular",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    width: "100%",
                  }}
                >
                  <Image
                    source={
                      schedule.type === "Meeting"
                        ? require("../assets/images/link.svg")
                        : require("../assets/images/pin.svg")
                    }
                    style={{ width: 20, height: 20 }}
                  />
                  <Text>{schedule.link}</Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={{
          borderBottomWidth: 0.2,
          backgroundColor: Colors.background.tertiary,
          marginLeft: 50,
          width: "75%",
        }}
      ></View>
    </View>
  );
};

export default ScheduleItem;

const styles = StyleSheet.create({});
