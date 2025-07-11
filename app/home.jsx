import AppointmentSchedule from "@/components/Appointment";
import CardWrapper from "@/components/CardWrapper";
import CreateScheduleButton from "@/components/CreateScheduleButton";
import DeadLineSchedule from "@/components/DeadLineSchedule";
import EventSchedule from "@/components/EventSchedule";
import Header from "@/components/Header";
import MeetingSchedule from "@/components/MeetingSchedule";
import ScheduleWrapper from "@/components/ScheduleWrapper";
import TrackerSchedule from "@/components/TrackerSchedule";
import Colors from "@/constants/Colors";
import BottomSheet from "@gorhom/bottom-sheet";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [floatingActionButtonIsOpen, setFloatingActionButtonState] =
    useState(false);
  const [bottomSheetLevel, setBottomSheetLevel] = useState(-1);
  const [bottomSheetType, setBottomSheetType] = useState("null");
  const [floatingButtonVisibility, setFloatingButtonVisibility] =
    useState(true);
  const [editMode, setEditMode] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editType, setEditType] = useState("");

  const database = useSQLiteContext();
  const bottomSheetRef = useRef(null);
  const snapPoints = ["90%", "65%"];

  // Fonction pour ouvrir le bottom sheet
  const openBottomSheet = () => {
    setBottomSheetLevel(0);
    setFloatingActionButtonState(false);
    setFloatingButtonVisibility(false);
  };

  // Fonction pour fermer le bottom sheet et réinitialiser les états
  const closeBottomSheet = () => {
    setBottomSheetLevel(-1);
    setFloatingButtonVisibility(true);
    setEditMode(false);
    setItemId(null);
    setBottomSheetType("null");
    setEditType("");
  };

  // Effect pour récupérer le type d'élément lors de l'édition
  useEffect(() => {
    const getTypeForEditing = async (itemId) => {
      if (!itemId || !editMode) return;

      try {
        setLoading(true);
        const queryResult = await database.getFirstAsync(
          `SELECT type FROM schedule WHERE id = ?`,
          [itemId]
        );

        if (queryResult) {
          setEditType(queryResult.type);
        }
      } catch (error) {
        console.log("Erreur lors de la récupération du type:", error);
      } finally {
        setLoading(false);
      }
    };

    getTypeForEditing(itemId);
  }, [database, itemId, editMode]);

  // Fonction pour rendre le contenu du bottom sheet
  const renderBottomSheetContent = () => {
    if (editMode && !loading) {
      // Mode édition
      switch (editType) {
        case "Meeting":
          return (
            <MeetingSchedule
              bottomSheetRef={bottomSheetRef}
              editMode={editMode}
              setEditMode={setEditMode}
              scheduleIdForEditing={itemId}
              bottomSheetType={"Meeting"}
            />
          );
        case "appointment":
          return (
            <AppointmentSchedule
              bottomSheetRef={bottomSheetRef}
              editMode={editMode}
              setEditMode={setEditMode}
              scheduleIdForEditing={itemId}
              bottomSheetType={"Appointment"}
            />
          );
        case "event":
          return (
            <EventSchedule
              bottomSheetRef={bottomSheetRef}
              bottomSheetType={"Event"}
              editMode={editMode}
              setEditMode={setEditMode}
              scheduleIdForEditing={itemId}
            />
          );
        case "tracker":
          return (
            <TrackerSchedule
              bottomSheetRef={bottomSheetRef}
              bottomSheetType={"Tracker"}
              editMode={editMode}
              setEditMode={setEditMode}
              scheduleIdForEditing={itemId}
            />
          );
        case "deadline":
          return (
            <DeadLineSchedule
              bottomSheetRef={bottomSheetRef}
              bottomSheetType={"Dealine"}
              editMode={editMode}
              setEditMode={setEditMode}
              scheduleIdForEditing={itemId}
            />
          );
        default:
          return (
            <View style={{ padding: 20 }}>
              <Text>Type élément non reconnu: {editType}</Text>
            </View>
          );
      }
    }

    if (editMode && loading) {
      return (
        <View style={{ padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    // Mode création
    switch (bottomSheetType) {
      case "Meeting":
        return (
          <MeetingSchedule
            bottomSheetRef={bottomSheetRef}
            editMode={false}
            setEditMode={setEditMode}
            scheduleIdForEditing={itemId}
          />
        );
      case "Appointment":
        return (
          <AppointmentSchedule
            bottomSheetRef={bottomSheetRef}
            bottomSheetType={bottomSheetType}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        );
      case "Event":
        return (
          <EventSchedule
            bottomSheetRef={bottomSheetRef}
            bottomSheetType={bottomSheetType}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        );
      case "Tracker":
        return (
          <TrackerSchedule
            bottomSheetRef={bottomSheetRef}
            bottomSheetType={bottomSheetType}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        );
      case "Deadline":
        return (
          <DeadLineSchedule
            bottomSheetRef={bottomSheetRef}
            bottomSheetType={bottomSheetType}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        );
      default:
        return null;
    }
  };

  // console.log("États actuels:", {
  //   editMode,
  //   editType,
  //   loading,
  //   bottomSheetType,
  //   itemId,
  // });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        style={{ backgroundColor: Colors.background.light, flex: 1 }}
        edges={["top", "left", "right", "bottom"]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          <Header />
          <CardWrapper />
          <Text
            style={{
              fontFamily: "Inter-Regular",
              marginVertical: 10,
              fontSize: 18,
              marginLeft: 20,
            }}
          >
            Agenda
          </Text>
          <ScheduleWrapper
            setEditMode={setEditMode}
            openBottomSheet={openBottomSheet}
            setEditItem={setItemId}
          />
        </ScrollView>

        {/* Overlay pour le floating button et bottom sheet */}
        {(floatingActionButtonIsOpen || bottomSheetLevel === 0) && (
          <Pressable
            onPress={() => {
              setFloatingActionButtonState(false);
              if (bottomSheetLevel === 0) {
                closeBottomSheet();
              }
            }}
            style={{
              zIndex: 0,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "black",
              opacity: 0.6,
            }}
          />
        )}

        {/* Floating Action Button */}
        {floatingButtonVisibility && (
          <CreateScheduleButton
            isOpen={floatingActionButtonIsOpen}
            onPress={() =>
              setFloatingActionButtonState(!floatingActionButtonIsOpen)
            }
            setBottomSheetType={setBottomSheetType}
            openBottomSheet={openBottomSheet}
          />
        )}

        {/* Bottom Sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={
            (editMode && editType === "Meeting") ||
            bottomSheetType === "Meeting"
              ? [snapPoints[0]]
              : [snapPoints[1]]
          }
          index={bottomSheetLevel}
          enablePanDownToClose={true}
          onClose={closeBottomSheet}
          backgroundStyle={{ backgroundColor: "white" }}
          enableDynamicSizing={false}
          style={{ zIndex: 2 }}
          handleIndicatorStyle={{
            backgroundColor: Colors.background.disabled,
            width: 120,
            height: 3,
          }}
          nestedScrollEnabled={true}
        >
          {renderBottomSheetContent()}
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
