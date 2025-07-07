import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const ScheduleItem = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState([] || null);
  const database = useSQLiteContext();

  useEffect(() => {
    try {
      const loadData = () => {
        setLoading(true);
        const queryResult = database.getFirstAsync(
          `SELECT * FROM schedule WHERE id = ?`,
          [id]
        );
        setSchedule(queryResult);
        setLoading(false);
      };
      loadData();
    } catch (error) {
      console.log(error);
    }
  }, [database]);

  return (
    <View>
      <View>
        <Text>Image</Text>
      </View>
      <View>
        <View>
          <Text>{schedule.time}</Text>
          <Text>{schedule.title}</Text>
        </View>
        <View>
          <Text>{schedule.link}</Text>
        </View>
      </View>
    </View>
  );
};

export default ScheduleItem;

const styles = StyleSheet.create({});
