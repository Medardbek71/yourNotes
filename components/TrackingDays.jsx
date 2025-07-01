import { Checkbox } from "expo-checkbox";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const TrackingDays = () => {
  const [attachedNotes, setAttachedNote] = useState([]);
  const [trackedDay, setTrackedDay] = useState([]);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Checkbox />
        <Text>M</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Checkbox />
        <Text>T</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Checkbox />
        <Text>W</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Checkbox />
        <Text>T</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Checkbox />
        <Text>F</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Checkbox />
        <Text>S</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Checkbox />
        <Text>S</Text>
      </View>
    </View>
  );
};

export default TrackingDays;

const styles = StyleSheet.create({});
