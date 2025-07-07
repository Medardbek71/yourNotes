import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
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

  const renderScheduleItems = () => {
    scheduleData.map((schedule) => {
      switch (schedule.type) {
        case "meeting":
          return <ScheduleItem id={schedule.id} />;
        case "appointment":
          return <ScheduleItem id={schedule.id} />;
        case "tracker":
          return <ScheduleItem id={schedule.id} />;
        case "event":
          return <ScheduleItem id={schedule.id} />;
        default:
          return <ScheduleItem id={schedule.id} />;
      }
    });
  };
  return scheduleData.length === 0 ? (
    <ImageForEmptySpace />
  ) : (
    renderScheduleItems()
  );
};

export default ScheduleWrapper;

const styles = StyleSheet.create({});
