import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const ScheduleHeader = ({ bottomSheetType }) => {
  let icon;
  console.log(bottomSheetType);
  switch (bottomSheetType) {
    case "Appointment":
      icon = require("../assets/images/calendar.svg");
      break;
    case "Deadline":
      icon = require("../assets/images/deadline.svg");
      break;
    case "Event":
      icon = require("../assets/images/event.svg");
      break;
    case "Tracker":
      icon = require("../assets/images/tracker.svg");
      break;
    case "Meeting":
      icon = require("../assets/images/meeting.svg");
      break;
    default:
      icon = require("../assets/images/pencil.svg");
      break;
  }
  return (
    <View
      style={{
        width: "95%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={styles.container}>
        <Pressable onPress={() => alert("Canceled")}>
          <Text style={{ fontFamily: "Inter-Regular" }}> Cancel</Text>
        </Pressable>
        <View style={styles.centerImage}>
          <Image
            source={icon}
            style={{ width: 35, height: 35, marginHorizontal: 8 }}
          />
          <Text style={{ fontFamily: "Inter-Regular" }}>{bottomSheetType}</Text>
        </View>
        <Pressable onPress={() => alert("saved")}>
          <Text style={{ fontFamily: "Inter-Regular" }}>Save</Text>
        </Pressable>
      </View>
      <View style={styles.separator}></View>
    </View>
  );
};

export default ScheduleHeader;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    margin: 16,
  },
  centerImage: {
    display: "flex",
    flexDirection: "row",
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    backgroundColor: "grey",
    width: "90%",
    height: 1,
  },
});
