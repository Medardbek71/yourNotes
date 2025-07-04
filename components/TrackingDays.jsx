import Colors from "@/constants/Colors";
import { Checkbox } from "expo-checkbox";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const TrackingDays = ({ setTrackedDay, trackedDay }) => {
  const handleDaySelected = (dayName) => {
    setTrackedDay((prevState) => ({
      ...prevState,
      [dayName]: !prevState[dayName],
    }));
  };

  const days = [
    { key: "monday", label: "M" },
    { key: "tuesday", label: "T" },
    { key: "wednesday", label: "W" },
    { key: "thursday", label: "T" },
    { key: "friday", label: "F" },
    { key: "saturday", label: "S" },
    { key: "sunday", label: "S" },
  ];

  return (
    <View style={styles.container}>
      {days.map((day) => (
        <View key={day.key} style={styles.dayContainer}>
          <Checkbox
            value={trackedDay[day.key]}
            onValueChange={() => handleDaySelected(day.key)}
            style={styles.checkbox}
            color={Colors.background.secondary}
          />
          <Text style={styles.dayLabel}>{day.label}</Text>
        </View>
      ))}
    </View>
  );
};

export default TrackingDays;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  dayContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
  },
  checkbox: {
    marginBottom: 5,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
});
