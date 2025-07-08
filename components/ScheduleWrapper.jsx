import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ImageForEmptySpace from "./ImageForEmptySpace";
import ScheduleItem from "./ScheduleItem";

const ScheduleWrapper = () => {
  const [loading, setLoading] = useState(false);
  const [scheduleData, setScheduleData] = useState([] || null);
  const database = useSQLiteContext();
  useEffect(() => {
    async function loadData() {
      try {
        const data = await database.getAllAsync(`SELECT * FROM schedule `);
        console.log("voici les data en question", data);
        setLoading(false);
        setScheduleData(data);
        console.log(scheduleData);
      } catch (error) {
        console.log(error);
      }
    }
    loadData();
  }, [database]);

  return scheduleData.length === 0 ? (
    <ImageForEmptySpace />
  ) : (
    scheduleData.map((schedule) => (
      <View key={schedule.id}>
        <ScheduleItem id={schedule.id} />
      </View>
    ))
  );
};

export default ScheduleWrapper;

const styles = StyleSheet.create({});
