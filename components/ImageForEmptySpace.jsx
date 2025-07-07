import { Image } from "expo-image";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function ImageForEmptySpace() {
  const [isLoading, setIsLoading] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const database = useSQLiteContext();

  useEffect(() => {
    const loadData = () => {
      try {
        setIsLoading(true);
        const data = database.runAsync(`SELECT * FROM schedule`);
        setSchedule(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, [database]);
  const style = StyleSheet.create({
    image: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 40,
    },
  });
  return (
    <View style={style.image}>
      <Image
        source={require("../assets/images/emptyState.svg")}
        style={{ width: 325, height: 325 }}
      />
    </View>
  );
}
