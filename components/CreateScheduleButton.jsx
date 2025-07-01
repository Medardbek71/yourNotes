import Colors from "@/constants/Colors";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const CreateScheduleButton = ({
  isOpen,
  onPress,
  setBottomSheetType,
  openBottomSheet,
}) => {
  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      bottom: 70,
      right: 55,
      zIndex: 2,
    },
    contentContainer: {
      backgroundColor:
        isOpen === true
          ? Colors.background.primary
          : Colors.background.tertiary,
      width: 70,
      height: 70,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
      marginTop: 16,
    },
    bubble: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      backgroundColor: Colors.background.primary,
      borderRadius: 4,
      height: 46,
      width: "auto",
      marginTop: 16,
    },
    icon: {
      width: 25,
      height: 25,
    },
    bubbleIcon: {
      width: 23,
      height: 23,
    },
    bubbleText: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 14,
    },
    bubbleImage: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: 1,
    },
  });

  return (
    <View style={styles.container}>
      <View style={{ display: isOpen === true ? "flex" : "none" }}>
        <Pressable
          style={styles.bubble}
          onPress={() => (setBottomSheetType("Meeting"), openBottomSheet())}
        >
          <View style={styles.bubbleText}>
            <Text style={{ fontFamily: "Inter-Regular" }}>Meeting</Text>
          </View>
          <View style={styles.bubbleImage}>
            <Image
              source={require("../assets/images/meeting.png")}
              style={styles.bubbleIcon}
            />
          </View>
        </Pressable>
        <Pressable
          style={styles.bubble}
          onPress={() => (setBottomSheetType("Appointment"), openBottomSheet())}
        >
          <View style={styles.bubbleText}>
            <Text style={{ fontFamily: "Inter-Regular" }}>Appointment</Text>
          </View>
          <View style={styles.bubbleImage}>
            <Image
              source={require("../assets/images/appointment.png")}
              style={styles.bubbleIcon}
            />
          </View>
        </Pressable>
        <Pressable
          style={styles.bubble}
          onPress={() => (setBottomSheetType("Event"), openBottomSheet())}
        >
          <View style={styles.bubbleText}>
            <Text style={{ fontFamily: "Inter-Regular" }}>Event</Text>
          </View>
          <View style={styles.bubbleImage}>
            <Image
              source={require("../assets/images/event.png")}
              style={styles.bubbleIcon}
            />
          </View>
        </Pressable>
        <Pressable
          style={styles.bubble}
          onPress={() => (setBottomSheetType("Tracker"), openBottomSheet())}
        >
          <View style={styles.bubbleText}>
            <Text style={{ fontFamily: "Inter-Regular" }}>Tracker</Text>
          </View>
          <View style={styles.bubbleImage}>
            <Image
              source={require("../assets/images/tracker.png")}
              style={styles.bubbleIcon}
            />
          </View>
        </Pressable>
        <Pressable
          style={styles.bubble}
          onPress={() => (setBottomSheetType("Deadline"), openBottomSheet())}
        >
          <View style={styles.bubbleText}>
            <Text style={{ fontFamily: "Inter-Regular" }}>Deadline</Text>
          </View>
          <View style={styles.bubbleImage}>
            <Image
              source={require("../assets/images/deadline.png")}
              style={styles.bubbleIcon}
            />
          </View>
        </Pressable>
        <Pressable
          style={styles.bubble}
          onPress={() => (setBottomSheetType("Costum"), openBottomSheet())}
        >
          <View style={styles.bubbleText}>
            <Text style={{ fontFamily: "Inter-Regular" }}>Costum</Text>
          </View>
          <View style={styles.bubbleImage}>
            <Image
              source={require("../assets/images/fab2.png")}
              style={styles.bubbleIcon}
            />
          </View>
        </Pressable>
      </View>
      <Pressable
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
        onPress={onPress}
      >
        <View style={styles.contentContainer}>
          <Image
            source={
              isOpen === true
                ? require("../assets/images/cross.png")
                : require("../assets/images/pencil.png")
            }
            style={styles.icon}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default CreateScheduleButton;
