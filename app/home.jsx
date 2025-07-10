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
import { Pressable, ScrollView, Text, View } from "react-native";
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
  const [editItem, setEditItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editType, setEditType] = useState(null);

  const database = useSQLiteContext();

  const bottomSheetRef = useRef(null);

  const snapPoints = ["90%", "65%"];

  const setBottomSheetSnapPoint = () => {};
  setBottomSheetSnapPoint();

  const openBottomSheet = () => {
    setBottomSheetLevel(0);
    setFloatingActionButtonState(false);
    setFloatingButtonVisibility(false);
  };

  const closeBottomSheet = () => {
    setBottomSheetLevel(-1);
    setFloatingButtonVisibility(true);
  };
  useEffect(() => {
    try {
      const loadTypeForEditing = async (editItem) => {
        setLoading(true);
        const editedType = await database.getFirstAsync(
          `SELECT * FROM schedule WHERE id = ? `,
          [editItem]
        );
        setLoading(false);
        console.log("voici le type editer", editType);
        console.log("voici le", editedType);
        setEditType(editedType);
      };
      loadTypeForEditing();
    } catch (error) {
      console.log(error.message);
    }
  }, [database, loading]);
  console.log(editType);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        style={{ backgroundColor: Colors.background.light, flex: 1 }}
        edges={["top", "left", "right"]}
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
            Agenda du jour
          </Text>
          <ScheduleWrapper
            setEditMode={setEditMode}
            openBottomSheet={openBottomSheet}
            setEditItem={setEditItem}
          />
        </ScrollView>

        {(floatingActionButtonIsOpen || bottomSheetLevel === 0) && (
          <Pressable
            onPress={() => setFloatingActionButtonState(false)}
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

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={
            bottomSheetType === "Meeting" ? [snapPoints[0]] : [snapPoints[1]]
          }
          index={bottomSheetLevel}
          enablePanDownToClose={true}
          onClose={() => closeBottomSheet()}
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
          {editMode ? (
            <View>{!loading && <Text>{editItem}</Text>}</View>
          ) : (
            bottomSheetType === "Meeting" && (
              <MeetingSchedule
                bottomSheetRef={bottomSheetRef}
                bottomSheetType={bottomSheetType}
                editMode={editMode}
                setEditMode={setEditMode}
              />
            )
          )}
          {bottomSheetType === "Appointment" && (
            <AppointmentSchedule
              bottomSheetRef={bottomSheetRef}
              bottomSheetType={bottomSheetType}
              editMode={editMode}
              setEditMode={setEditMode}
            />
          )}
          {bottomSheetType === "Event" && (
            <EventSchedule
              bottomSheetRef={bottomSheetRef}
              bottomSheetType={bottomSheetType}
              editMode={editMode}
              setEditMode={setEditMode}
            />
          )}
          {bottomSheetType === "Tracker" && (
            <TrackerSchedule
              bottomSheetRef={bottomSheetRef}
              bottomSheetType={bottomSheetType}
              editMode={editMode}
              setEditMode={setEditMode}
            />
          )}
          {bottomSheetType === "Deadline" && (
            <DeadLineSchedule
              bottomSheetRef={bottomSheetRef}
              bottomSheetType={bottomSheetType}
              editMode={editMode}
              setEditMode={setEditMode}
            />
          )}
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
