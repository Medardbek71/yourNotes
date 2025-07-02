import { Checkbox } from "expo-checkbox";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const TrackingDays = (setTrackedDay) => {
  const handleDaySelected = (dayName) => {
    setTrackedDay((prevState) => ({
      ...prevState,
      [dayName]: !prevState[dayName],
    }));
  };

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
        <Checkbox
          value={() => handleDaySelected("monday")}
          onValueChange={handleDaySelected("monday")}
        />
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
        <Checkbox
          value={() => handleDaySelected("tuesday")}
          onValueChange={handleDaySelected("tuesday")}
        />
        <Text>T</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Checkbox
          value={() => handleDaySelected("wednesday")}
          onValueChange={handleDaySelected("wednesday")}
        />
        <Text>W</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Checkbox
          value={() => handleDaySelected("thursday")}
          onValueChange={handleDaySelected("thursday")}
        />
        <Text>T</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Checkbox
          value={() => handleDaySelected("friday")}
          onValueChange={handleDaySelected("friday")}
        />
        <Text>F</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Checkbox
          value={() => handleDaySelected("saturday")}
          onValueChange={handleDaySelected("saturday")}
        />
        <Text>S</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Checkbox
          value={() => handleDaySelected("sunday")}
          onValueChange={handleDaySelected("sunday")}
        />
        <Text>S</Text>
      </View>
    </View>
  );
};

export default TrackingDays;

const styles = StyleSheet.create({});
